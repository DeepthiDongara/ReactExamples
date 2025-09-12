import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">🛍️ Order History</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((purchase, index) => (
            <div
              key={index}
              className={`order-card ${
                expandedIndex === index ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(index)}
            >
              {/* Order Header */}
              <div className="order-header">
                <span className="order-id">Order #{index + 1}</span>
                <span className="order-date">📅 {purchase.date}</span>
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <p>
                  <strong>Total:</strong> ₹{purchase.totalAmount}
                </p>
                <p>
                  <strong>Discount:</strong> -₹{purchase.discount}
                </p>
                <p>
                  <strong>Coupon:</strong> -₹{purchase.couponDiscount}
                </p>
                <p>
                  <strong>Tax:</strong> ₹{purchase.tax.toFixed(2)}
                </p>
              </div>

              {/* Expandable Details */}
              <div className="order-details">
                <h4 className="items-title">Items</h4>
                <div className="items-list">
                  {purchase.items.map((item, i) => (
                    <div key={i} className="item-card">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="item-img"
                      />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p>
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
