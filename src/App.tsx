import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:category" element={<ProductDetail />} />

        <Route path="/services" element={<Services />} />

        <Route path="/how-it-works" element={<HowItWorks />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
