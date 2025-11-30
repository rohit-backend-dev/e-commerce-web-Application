package com.e_commerce.controller.order;

import com.e_commerce.model.order.Order;
import com.e_commerce.model.order.OrderItem;
import com.e_commerce.repository.order.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostMapping("/place-order")
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody Map<String, Object> orderRequest) throws StripeException {

        String paymentMethod = (String) orderRequest.get("paymentMethod");
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderRequest.get("items");
        Map<String, String> shippingInfo = (Map<String, String>) orderRequest.get("shippingInfo");

        String orderId = "ORD-" + System.currentTimeMillis();

        // Convert items to OrderItem entities
        List<OrderItem> orderItems = items.stream().map(item -> {
            OrderItem oi = new OrderItem();
            oi.setName((String) item.get("name"));
            oi.setPrice(Double.parseDouble(item.get("price").toString()));
            oi.setQuantity(Integer.parseInt(item.get("quantity").toString()));
            return oi;
        }).collect(Collectors.toList());

        // Create Order entity
        Order order = new Order();
        order.setOrderId(orderId);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(paymentMethod.equalsIgnoreCase("cod") ? "Pending" : "Payment Pending");

        order.setFirstName(shippingInfo.get("firstName"));
        order.setLastName(shippingInfo.get("lastName"));
        order.setEmail(shippingInfo.get("email"));
        order.setPhone(shippingInfo.get("phone"));
        order.setAddress(shippingInfo.get("address"));
        order.setCity(shippingInfo.get("city"));
        order.setState(shippingInfo.get("state"));
        order.setZip(shippingInfo.get("zip"));
        order.setItems(orderItems);

        // Save to DB
        orderRepository.save(order);

        // Response
        Map<String, Object> response = Map.of(
                "orderId", orderId,
                "status", paymentMethod.equalsIgnoreCase("cod") ? "COD" : "stripe"
        );

        if (paymentMethod.equalsIgnoreCase("stripe")) {
            Stripe.apiKey = stripeSecretKey;

            SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/order-success")
                    .setCancelUrl("http://localhost:5173/cancel");

            for (OrderItem item : orderItems) {
                paramsBuilder.addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity((long) item.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount((long) (item.getPrice() * 100))
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(item.getName())
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                );
            }

            Session session = Session.create(paramsBuilder.build());
            response = Map.of(
                    "orderId", orderId,
                    "status", "stripe",
                    "sessionUrl", session.getUrl()
            );
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }
}
