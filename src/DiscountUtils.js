// Calculate total cart price
export function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Calculate discount amount
export function calculateDiscount(total, discountPercent) {
  return (total * discountPercent) / 100;
}

// Apply discount and return final price
export function applyDiscount(total, discountPercent) {
  const discountAmount = calculateDiscount(total, discountPercent);
  return total - discountAmount;
}
export function getCouponDiscount(coupon, total) {
  let discountPercent = 0;

  switch (coupon) {
    case "DEEPTHI10":
      discountPercent = 10;
      break;
    case "DEEPTHI20":
      discountPercent = 20;
      break;
    case "DEEPTHI30":
      discountPercent = 30;
      break;
    default:
      discountPercent = 0;
  }

  const discountAmount = (total * discountPercent) / 100;

  return {
    isValid: discountPercent > 0,
    discountPercent,
    discountAmount,
  };
}
