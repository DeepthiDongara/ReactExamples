import React from 'react';
import './nonVeg.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NonVeg() {
  const nonVegMeat = useSelector((state) => state.products.NonVeg);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonVegMeat.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(nonVegMeat.length / itemsPerPage);

  // Add to cart with toast
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

  // Fill placeholders to maintain spacing
  const displayItems = [...currentItems];
  while (displayItems.length < itemsPerPage) {
    displayItems.push({ id: `empty-${displayItems.length}`, empty: true });
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5 fw-bold text-primary">🍗 Non-Veg Meat Products</h1>

      {/* Flex container for cards */}
      <div className="d-flex flex-wrap justify-content-start gap-4">
        {displayItems.map((item) => (
          <div
            key={item.id}
            style={{
              flex: '0 0 22%',
              minWidth: '220px',
              display: 'flex',
            }}
          >
            {!item.empty ? (
              <div className="card h-100 shadow-lg border-0 rounded-3 nonveg-card w-100">
                <img
                  src={item.imageUrl}
                  className="card-img-top nonveg-image"
                  alt={item.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem"
                  }}
                />
                <div className="card-body text-center d-flex flex-column nonveg-card-body">
                  <h5 className="card-title fw-bold nonveg-name">{item.name}</h5>
                  <p className="card-text text-muted small mb-2 nonveg-desc">{item.description}</p>
                  <p className="fw-bold text-danger fs-5 mb-3 nonveg-price">₹{item.price}</p>
                  <button
                    className="btn btn-success btn-sm w-100 mt-auto"
                    onClick={() => handleAddToCart(item)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ) : (
              // Invisible placeholder to maintain gaps
              <div style={{ visibility: 'hidden', width: '100%' }}>placeholder</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2 pagination-wrapper">
        <button
          className="btn btn-outline-primary"
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
          className="btn btn-outline-primary"
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

export default NonVeg;
