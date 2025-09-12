import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Bevarages from "./Bevarages";
import Desserts from "./Desserts";
import Cart from "./Cart";
import Orders from "./Orders";
import About from "./About";
import Contact from "./Contact";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import SearchResults from "./SearchResults";

// ✅ Create a wrapper so we can use useLocation inside BrowserRouter
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signup" || location.pathname === "/signin"; 
  // hide navbar on signup & signin

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/beverages" element={<Bevarages />} />
        <Route path="/desserts" element={<Desserts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
