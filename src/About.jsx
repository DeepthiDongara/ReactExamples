import React from "react";
import { useNavigate } from "react-router-dom";
import "./about.css";
import { useEffect } from "react";

function About() {
  const navigate = useNavigate();
// Intersection Observer for About Me card animation
  useEffect(() => {
  const aboutCard = document.querySelector(".about-me-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutCard.classList.add("visible");
        } else {
          aboutCard.classList.remove("visible"); // optional
        }
      });
    },
    { threshold: 0.3 } // trigger when 30% visible
  );

  if (aboutCard) observer.observe(aboutCard);

  return () => observer.disconnect();
}, []);

// Intersection Observer for Values cards animation


useEffect(() => {
  const cards = document.querySelectorAll(".value-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // optional: remove when out of view
        }
      });
    },
    { threshold: 0.3 } // triggers when 30% of the card is visible
  );

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, []);


  return (
    <div className="about-container">

      {/* Hero Section */}
      <section className="about-hero">
  <div className="hero-content">
    {/* Left side: description */}
    <div className="hero-text">
      <h1>About FreshGo 🍴</h1>
      <p>
        At FreshGo, our mission is to bring fresh, high-quality food right to your doorstep.
        We believe in making healthy eating convenient, delicious, and enjoyable for everyone.
      </p>
      <button className="explore-btn" onClick={() => navigate("/veg")}>
        Explore Products
      </button>
    </div>

    {/* Right side: image */}
    <div className="hero-image">
      <img
        src="https://images.pexels.com/photos/3184193/pexels-photo-3184193.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="Fresh food delivery"
      />
    </div>
  </div>
</section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <div className="story-underline"></div>
          <p>
            Founded in 2023, FreshGo began with a simple goal: to make fresh, organic, and delicious food
            accessible to everyone. From farm to table, we prioritize quality, freshness, and sustainability,
            ensuring every bite is healthy and delightful.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <h2>Why Choose Us?</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Fresh & Organic</h3>
            <p>We source the freshest ingredients from trusted farms.</p>
          </div>
          <div className="value-card">
            <h3>Fast Delivery</h3>
            <p>Get your favorite products delivered quickly and safely.</p>
          </div>
          <div className="value-card">
            <h3>Customer Focused</h3>
            <p>Your satisfaction is our top priority with every order.</p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="about-me-section">
        <div className="about-me-container">
          <h2>About Me</h2>
          <div className="about-me-card">
            <img src="images/IMG_20250831_142349.jpg" alt="Deepthi - CEO" />
            <h4>Deepthi</h4>
            <div className="accent-line"></div>
            <p>
              Founder & CEO passionate about creating innovative solutions that make a difference. 
              With a vision to empower people through technology, I lead our team with creativity, 
              dedication, and a drive to achieve excellence.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
