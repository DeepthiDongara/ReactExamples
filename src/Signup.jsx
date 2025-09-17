// SignUp.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { register, clearError } from "./store";
import { Link } from "react-router-dom"; 
// ✅ import from store.js

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const {
    register: formRegister, // rename to avoid conflict with auth "register"
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(register(data)); // ✅ use "register" from authSlice
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
      (u) => u.username === data.username || u.email === data.email
    );

    if (!userExists) {
      navigate("/signin");
    }
  };

  const password = watch("password");

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to continue</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input
                {...formRegister("username", { required: "Username is required" })}
              />
              {errors.username && <p className="error">{errors.username.message}</p>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                {...formRegister("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter valid 10-digit phone",
                  },
                })}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Email</label>
            <input
              type="email"
              {...formRegister("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...formRegister("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                {...formRegister("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input {...formRegister("city")} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input {...formRegister("state")} />
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <div className="login-link">
  Already have an account? <Link to="/signin">Log In</Link>
</div>
      </div>
    </div>
  );
}

export default SignUp;
