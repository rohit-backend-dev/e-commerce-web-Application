// src/utils/Coupon.js

/**
 * Predefined coupon list with realistic discounts (flat/percent)
 * Value tuned to feel like genuine e-commerce offers.
 */
export const predefinedCoupons = {
  SAVE5: { type: "percent", value: 5 },         // 5% off
  SAVE10: { type: "percent", value: 10 },       // 10% off
  SAVE15: { type: "percent", value: 15 },       // 15% off
  FLAT25: { type: "flat", value: 25 },          // ₹25 off
  FLAT50: { type: "flat", value: 50 },          // ₹50 off
  CASH30: { type: "flat", value: 30 },          // ₹30 cashback
  SHIPFREE: { type: "flat", value: 40 },        // free/discounted shipping
  BONUS20: { type: "flat", value: 20 },         // ₹20 extra discount
  EXCL20: { type: "percent", value: 20 },       // 20% exclusive off
  FRIEND10: { type: "percent", value: 10 },     // 10% friend referral
  NEWUSER: { type: "flat", value: 50 },         // ₹50 off for new users
  FESTIVE15: { type: "percent", value: 15 },    // 15% festive offer
};

/**
 * Pick a random coupon from predefined list.
 * Used in Spin & Win and Lucky Draw.
 */
export const getRandomCoupon = () => {
  const keys = Object.keys(predefinedCoupons);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { code: randomKey, ...predefinedCoupons[randomKey] };
};

/**
 * Save a coupon to localStorage (used for Spin & Win rewards)
 */
export const saveCouponToLocalStorage = (coupon) => {
  if (!coupon?.code) return;
  try {
    const existing = JSON.parse(localStorage.getItem("savedCoupons") || "[]");
    if (!existing.some((c) => c.code === coupon.code)) {
      existing.push(coupon);
      localStorage.setItem("savedCoupons", JSON.stringify(existing));
    }
  } catch (err) {
    console.error("Error saving coupon:", err);
  }
};
