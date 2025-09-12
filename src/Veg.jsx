import React from "react";    
import { useDispatch, useSelector } from "react-redux";
import "./veg.css"; 
import { addToCart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Veg() {
  const vegItems = useSelector((state) => state.products.Veg);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5 fw-bold text-success">🥦 Veg Products</h1>

      {/* Cards Grid */}
      <div className="veg-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="card h-100 shadow-lg border-0 rounded-3 veg-card">
            <img
              src={item.imageUrl}
              className="card-img-top veg-image"
              alt={item.name}
            />
            <div className="card-body text-center d-flex flex-column veg-card-body">
              <h5 className="card-title fw-bold veg-name">{item.name}</h5>
              <p className="card-text text-muted small mb-2 veg-desc">{item.description}</p>
              <p className="fw-bold text-danger fs-5 mb-3 veg-price">₹{item.price} / kg</p>
              <button
                className="btn btn-success btn-sm w-100 mt-auto veg-add-btn"
                onClick={() => handleAddToCart(item)}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* Empty placeholders to keep 4-column layout */}
        {currentItems.length < 4 &&
          Array.from({ length: 4 - currentItems.length }).map((_, i) => (
            <div key={`empty-${i}`} className="empty-card"></div>
          ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2 pagination-wrapper">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Veg;
