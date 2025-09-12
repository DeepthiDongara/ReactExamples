import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "./store"; // ✅ import from store.js
import "./signin.css"; // Use the same styling as signup page

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // ✅ Redirect when login is successful
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <div className="subtitle">Log in to your account</div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
         <div className="form-group">
  <label>Username</label>
  <input
    name="username"
    type="text"
    value={formData.username}
    onChange={handleChange}
    placeholder="Enter your username"
    required
  />
</div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>

        <div className="login-link">
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
