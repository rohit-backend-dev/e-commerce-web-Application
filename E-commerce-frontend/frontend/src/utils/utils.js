// utils.js or inside PlaceOrder.jsx
export const generateOrderId = () => {
  const random = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  const timestamp = Date.now().toString().slice(-4); // last 4 digits of timestamp
  return `ORD-${timestamp}-${random}`;
};
