import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  addOrder,
} from "./store";
import {
  calculateTotal,
  calculateDiscount,
  applyDiscount,
  getCouponDiscount,
} from "./DiscountUtils";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth.currentUser); // 🔑 check login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState({
    isValid: false,
    discountPercent: 0,
    discountAmount: 0,
  });
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [emailError, setEmailError] = useState(false);

  if (cartItems.length === 0) {
    return (
      <h2 className="text-center text-muted mt-5">Your cart is empty 🛒</h2>
    );
  }

  const total = calculateTotal(cartItems);
  const discount = calculateDiscount(total, discountPercent);
  const finalPrice = applyDiscount(total, discountPercent);
  const couponDiscount = couponResult.isValid ? couponResult.discountAmount : 0;
  const taxAmount = finalPrice * 0.18;

  const templateParams = {
    order_id: Math.floor(100000 + Math.random() * 900000),
    orders: cartItems.map((item) => ({
      name: item.name,
      price: (item.price * item.quantity).toFixed(2),
      units: item.quantity,
    })),
    cost: {
      shipping: 50,
      tax: taxAmount.toFixed(2),
      total: finalPrice.toFixed(2),
      discount: discount.toFixed(2),
      couponDiscount: couponDiscount.toFixed(2),
    },
    email: customerEmail,
  };

  function handleApplyCoupon() {
    const result = getCouponDiscount(couponCode, total);
    setCouponResult(result);

    if (result.isValid) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      Swal.fire({
        icon: "success",
        title: "🎉 Coupon Applied!",
        text: `You got ${result.discountPercent}% off`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (couponCode) {
      Swal.fire({
        icon: "error",
        title: "❌ Invalid Coupon",
        text: "Please enter a valid coupon code.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }

  const handleCompletePurchase = () => {
    // 🔒 Require login first
    if (!currentUser) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to complete your purchase.",
        timer: 2000,
        showConfirmButton: false,
      });
     navigate("/signin", { state: { from: "/cart" } });// ✅ redirect back to Cart after login
      return;
    }

    // 📧 Require email
    if (!customerEmail) {
      setEmailError(true);
      Swal.fire({
        icon: "warning",
        title: "⚠️ Email Required",
        text: "Please enter your email to complete the purchase.",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    setEmailError(false);

    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalAmount: finalPrice,
      discount: discount,
      couponDiscount: couponDiscount,
      tax: taxAmount,
    };

    // Send confirmation email
    emailjs
      .send(
        "service_jfyufra",
        "template_vwu6qmi",
        templateParams,
        "D-A0GwB9OLDYUX_rb"
      )
      .then(() => {
        console.log("✅ Email sent successfully");
      })
      .catch(() => {
        console.warn("⚠️ Email sending failed, but purchase continues");
      });

    dispatch(addOrder(purchaseDetails));
    dispatch(clearCart());

    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    Swal.fire({
      icon: "success",
      title: "🛒 Purchase Completed!",
      text: "Your purchase was successful.",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="cart-page container-fluid">
      <h1 className="text-center text-success mb-4">🛒 Shopping Cart</h1>
      <div className="cart-row">
        {/* Left Section - Cart Items */}
        <div className="col-md-8 cart-items-section">
          <div className="row g-3">
            {cartItems.map((item) => (
              <div key={item.id} className="col-12">
                <div className="cart-card shadow-sm">
                  <div className="cart-image-wrapper me-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-image"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="cart-details flex-grow-1">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="mb-1">Price: ₹{item.price}</p>
                    <p className="mb-2">
                      Total: ₹{item.price * item.quantity}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => dispatch(decrementQuantity(item))}
                      >
                        ➖
                      </button>
                      <span className="px-2 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => dispatch(incrementQuantity(item))}
                      >
                        ➕
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-3"
                        onClick={() => dispatch(removeItem(item))}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Sticky Summary Card */}
        <div className="col-md-4 d-flex flex-column">
          <div className="sticky-wrapper">
            <div className="summary-card shadow">
              {/* Price Summary */}
              <h4 className="fw-bold mb-3 text-center">Price Summary</h4>
              <ul className="list-unstyled mb-3 text-center">
                <li>
                  Total Price: <span className="fw-bold">₹{total}</span>
                </li>
                {discountPercent > 0 && (
                  <li className="text-danger">
                    Discount ({discountPercent}%): -₹{discount}
                  </li>
                )}
                {couponResult.isValid && (
                  <li className="text-primary">
                    Coupon Discount: -₹{couponResult.discountAmount.toFixed(2)}
                  </li>
                )}
                <li className="fw-bold text-success">
                  Final Price: ₹{(finalPrice - couponDiscount).toFixed(2)}
                </li>
              </ul>

              {/* Discount Buttons */}
              <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setDiscountPercent(10)}
                >
                  10%
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setDiscountPercent(20)}
                >
                  20%
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setDiscountPercent(30)}
                >
                  30%
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setDiscountPercent(0)}
                >
                  Reset
                </button>
              </div>

              {/* Coupon */}
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="form-control mb-2"
              />
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </button>
              {couponResult.isValid && (
                <p className="text-success text-center">
                  🎉🥳 Coupon applied! {couponResult.discountPercent}% off
                </p>
              )}
              {!couponResult.isValid && couponCode && (
                <p className="text-danger text-center">Invalid coupon code.</p>
              )}

              {/* Email Input */}
              <div className="email-card text-center mb-3">
                <label className="fw-bold mb-2 d-block">
                  Enter Your Gmail To Receive Order Confirmation
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className={`form-control ${
                    emailError ? "error-border" : ""
                  }`}
                />
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCompletePurchase}
                className="btn btn-warning w-100"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="payment-method shadow p-4 mt-4 text-center">
        <h3 className="fw-bold mb-3">Select Payment Method</h3>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button
            className={`btn ${
              paymentMethod === "qr" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setPaymentMethod("qr")}
          >
            QR Code
          </button>
          <button
            className={`btn ${
              paymentMethod === "card" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            Card
          </button>
        </div>

        {paymentMethod === "qr" && (
          <div className="qr-code-section mt-3">
            <h4 className="mb-3">📲 Scan to Pay</h4>
            <QRCode
              value={`upi://pay?pa=9492428590@ptyes&pn=DeepthiStore&am=${(
                finalPrice - couponDiscount
              ).toFixed(2)}&cu=INR&tn=ShoppingatMyStore`}
              size={180}
            />
            <p className="mt-2 fw-bold">UPI ID: 9492428590@ptyes</p>
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="card-payment-section mt-3">
            <h4 className="mb-3">💳 Card Payment</h4>
            <p>Card payment integration coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
