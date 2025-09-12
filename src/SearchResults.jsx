// Search.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./signin.css"; // create this file for styling

function Search() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";

  // ✅ Get products from redux store
  const products = useSelector((state) => [
    ...state.products.Veg,
    ...state.products.NonVeg,
    ...state.products.Beverages,
    ...state.products.Desserts,
  ]);

  // ✅ Filter products
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return (
    <div className="search-page">
      <h2>
        Search Results for: <span className="highlight">{query}</span>
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="search-results">
          {filteredProducts.map((item) => (
            <div key={item.id} className="search-card">
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">❌ No products found</p>
      )}
    </div>
  );
}

export default Search;
