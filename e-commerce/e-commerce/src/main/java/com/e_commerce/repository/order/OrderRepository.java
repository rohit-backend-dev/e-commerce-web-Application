package com.e_commerce.repository.order;

import com.e_commerce.model.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderId(String orderId);
}
