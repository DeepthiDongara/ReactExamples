import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./store";
import "./navbar.css";

const products = [
  { id: 1, title: "Organic Vegetables", image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/veg" },
  { id: 2, title: "Fresh Meat", image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/nonveg" },
  { id: 3, title: "Delicious Desserts", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/desserts" },
  { id: 4, title: "Cool Beverages", image: "https://images.pexels.com/photos/4113664/pexels-photo-4113664.jpeg?auto=compress&cs=tinysrgb&w=600", link: "/beverages" },
];

function Navbar() {
  const cartItems = useSelector((state) => state.cart || []);
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // ✅ Mobile toggle

  const handleLogout = () => {
    dispatch(logout());
    setShowDrawer(false);
    navigate("/signin");
  };

  return (
    <header>
      {/* Top bar */}
      <div className="topbar">
        <Link className="brand" to="/">🛒 FreshGo</Link>

        {/* Hamburger for mobile */}
        <span className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          &#9776;
        </span>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="search-results">
              {products
                .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((p) => (
                  <div
                    key={p.id}
                    className="search-item"
                    onClick={() => {
                      navigate(p.link);
                      setSearchQuery("");
                    }}
                  >
                    <img src={p.image} alt={p.title} />
                    <span>{p.title}</span>
                  </div>
                ))}
              {products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="no-results">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Top right */}
        <div className="top-right">
          <Link to="/cart" className="cart-link">
            🛒 Cart {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>

          <button className="profile-btn" onClick={() => setShowDrawer(true)}>
            👤 {currentUser ? "Account" : "Sign In"}
          </button>
        </div>
      </div>

      {/* Category menu */}
      <nav className="category-nav">
        <ul className={mobileMenuOpen ? "show" : ""}>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/veg">🥦 Veg</Link></li>
          <li><Link to="/nonveg">🍗 Non-Veg</Link></li>
          <li><Link to="/beverages">🥤 Beverages</Link></li>
          <li><Link to="/desserts">🍰 Desserts</Link></li>
          <li><Link to="/orders">📦 Orders</Link></li>
          <li><Link to="/about">ℹ️ About</Link></li>
          <li><Link to="/contact">📞 Contact</Link></li>
        </ul>
      </nav>

      {/* Drawer */}
      {showDrawer && (
        <>
          <div className="drawer-overlay" onClick={() => setShowDrawer(false)}></div>
          <div className="drawer">
            <button className="close-btn" onClick={() => setShowDrawer(false)}>✖</button>
            {currentUser ? (
              <>
                <h3>👋 Hello, {currentUser.username}</h3>
                <Link to="/orders" className="drawer-item" onClick={() => setShowDrawer(false)}>📦 My Orders</Link>
                <button onClick={handleLogout} className="drawer-item logout-btn">🚪 Logout</button>
              </>
            ) : (
              <>
                <h3>Welcome 👋</h3>
                <Link to="/signin" className="drawer-item highlight" onClick={() => setShowDrawer(false)}>🔑 Log In</Link>
                <Link to="/signup" className="drawer-item" onClick={() => setShowDrawer(false)}>✍️ Sign Up</Link>
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
