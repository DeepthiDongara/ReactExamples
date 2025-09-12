import React, { useState } from "react";
import "./contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact FoodMart 📩</h1>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info card">
          <h2>Contact Info</h2>
          <p><strong>Address:</strong> 123 Food Street, City, Country</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Email:</strong> support@foodmart.com</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form card">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section card">
        <h2>Our Location</h2>
        <iframe
          title="FoodMart Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991464556!2d-74.25987568794027!3d40.69767006369595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b1f2f71245%3A0xf4c9d0d5b4e5b5e5!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sin!4v1683961376592!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Contact;
