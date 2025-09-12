import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./home.css";

const testimonials = [
  { id: 1, text: "Fresh food and super quick delivery! Highly recommend FoodMart.", author: "Priya S." },
  { id: 2, text: "Loved the desserts 🍰, they were just perfect.", author: "Rahul M." },
  { id: 3, text: "The best place to order both veg and non-veg food. Great quality!", author: "Sneha K." },
  { id: 4, text: "Quick delivery and amazing quality. Always satisfied!", author: "Anita R." },
];

const carouselItems = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Fresh Vegetables",
    description: "Get the best quality organic veggies delivered fresh.",
    link: "/veg",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Delicious Non-Veg",
    description: "Premium meat & seafood for your perfect meal.",
    link: "/nonveg",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/3026806/pexels-photo-3026806.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Sweet Desserts",
    description: "Indulge in cakes, pastries, and desserts.",
    link: "/desserts",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Refreshing Beverages",
    description: "Quench your thirst with juices, shakes, and cool drinks.",
    link: "/beverages",
  },
];

const products = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Organic Vegetables",
    description: "Freshly harvested, farm-to-table organic veggies.",
    link: "/veg",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Fresh Meat",
    description: "High-quality meat, chicken & seafood.",
    link: "/nonveg",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Delicious Desserts",
    description: "Cakes, pastries, ice-creams, and more.",
    link: "/desserts",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/4113664/pexels-photo-4113664.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Cool Beverages",
    description: "Shakes, juices, and refreshing drinks.",
    link: "/beverages",
  },
];

const stats = [
  { id: 1, label: "Happy Customers", value: "5000+" },
  { id: 2, label: "Products", value: "200+" },
  { id: 3, label: "24/7 Delivery", value: "Yes" },
];

function Home() {

const [current, setCurrent] = useState(0);

  // Determine how many testimonials to show per slide
  const [perSlide, setPerSlide] = useState(window.innerWidth > 768 ? 2 : 1);

// Update perSlide on window resize
  useEffect(() => {
    const handleResize = () => {
      setPerSlide(window.innerWidth > 768 ? 2 : 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

// Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + perSlide) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [perSlide]);

  const totalSlides = Math.ceil(testimonials.length / perSlide);


/// Animate product cards on scroll
useEffect(() => {
  const cards = document.querySelectorAll(".product-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150); // 150ms stagger per card
        } else {
          entry.target.classList.remove("visible"); // optional: hide on scroll up
        }
      });
    },
    { threshold: 0.2 } // trigger when 20% visible
  );

  cards.forEach((card) => observer.observe(card));

  return () => observer.disconnect();
}, []);


  

  



  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

// Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const initialTimers = [
    { id: 1, label: "Desserts", time: 120 },  // 2min
    { id: 2, label: "Veggies", time: 7200 },   // 2 hours
    { id: 3, label: "Beverages", time: 2700 }, // 45 min
  ];

  const [timers, setTimers] = useState(initialTimers);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => ({
          ...t,
          time: t.time > 0 ? t.time - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // helper to format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="home-container">

      

     <section className="hero-section">
  {/* Left side: description */}
  <div className="hero-text">
    <h1>Welcome to FreshGo 🍴</h1>
    <p>
      Your one-stop destination for delicious food, snacks, and desserts.
      Order online and get your favorites delivered right to your door 🚀.
    </p>
    <button
      className="explore-btn"
      onClick={() => {
        const section = document.querySelector(".products-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Explore Menu
    </button>
  </div>

  {/* Right side: image */}
  <div className="hero-image">
    <img
      src="https://images.unsplash.com/photo-1659353741250-cbd3b81e40ac?q=80&w=1170&auto=format&fit=crop"
      alt="Food Banner"
    />
  </div>
</section>

      {/* Carousel */}
      <section className="carousel-section">
        <div className="carousel-container">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-card ${index === currentIndex ? "active" : "inactive"}`}
              onClick={() => navigate(item.link)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.title} className="carousel-image" />
              <div className="carousel-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? "dot active" : "dot"}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <h2 className="section-title">Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <button className="product-btn" onClick={() => navigate(product.link)}>
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
     <section className="offers-section">
      <h2 className="section-title">🔥 Special Offers</h2>
      <div className="offers-grid">
        <div className="offer-card">
          <div className={`offer-timer ${timers[0].time <= 100 ? "urgent" : ""}`}
          >{formatTime(timers[0].time)}</div>
          <img
            src="https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Dessert Offer"
          />
          <div className="offer-overlay">
            <h3>20% OFF Desserts</h3>
            <p>Sweet treats at sweet prices!</p>
            <button className="offer-btn">Order Now</button>
          </div>
        </div>

        <div className="offer-card">
          <div className={`offer-timer ${timers[1].time <= 300 ? "urgent" : ""}`}
>{formatTime(timers[1].time)}</div>
          <img
            src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Veggies Offer"
          />
          <div className="offer-overlay">
            <h3>Buy 1 Get 1 Free</h3>
            <p>Fresh organic veggies today!</p>
            <button className="offer-btn">Shop Now</button>
          </div>
        </div>

        <div className="offer-card">
          <div className={`offer-timer ${timers[2].time <= 300 ? "urgent" : ""}`}
>{formatTime(timers[2].time)}</div>
          <img
            src="https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Beverages Offer"
          />
          <div className="offer-overlay">
            <h3>Flat 15% OFF</h3>
            <p>On all refreshing beverages 🍹</p>
            <button className="offer-btn">Grab Deal</button>
          </div>
        </div>
      </div>
    </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
      <h2 className="section-title">What Our Customers Say ❤️</h2>
      <div className="testimonials-carousel">
        {Array.from({ length: totalSlides }).map((_, slideIndex) => {
          const start = slideIndex * perSlide;
          const currentTestimonials = testimonials.slice(start, start + perSlide);
          return (
            <div
              key={slideIndex}
              className={`testimonial-slide ${slideIndex === Math.floor(current / perSlide) ? "active" : "inactive"}`}
            >
              {currentTestimonials.map((t) => (
                <div key={t.id} className="testimonial-card">
                  <p>"{t.text}"</p>
                  <h4>- {t.author}</h4>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={index === Math.floor(current / perSlide) ? "dot active" : "dot"}
            onClick={() => setCurrent(index * perSlide)}
          ></span>
        ))}
      </div>
    </section>

      {/* Download App */}
      <section className="download-section">
        <h2>Download Our App 📱</h2>
        <p>Order your favorite food anytime, anywhere.</p>
        <div className="app-badges">
          <button className="app-btn">Play Store</button>
          <button className="app-btn">App Store</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
                    <div className="footer-brand">
            <h2>FreshGo 🍴</h2>
            <p>Delicious food delivered fresh to your door.</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/veg")}>Vegetables</li>
              <li onClick={() => navigate("/nonveg")}>Non-Veg</li>
              <li onClick={() => navigate("/desserts")}>Desserts</li>
              <li onClick={() => navigate("/beverages")}>Beverages</li>
            </ul>
          </div>
          <div className="footer-support">
            <h3>Customer Service</h3>
            <ul>
              <li onClick={() => navigate("/contact")}>Contact Us</li>
              <li onClick={() => navigate("/faq")}>FAQ</li>
              <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FoodMart. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
