import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";
import QuoteBag from "./pages/QuoteBag";

function App() {
  return (
    <BrowserRouter>
      {/* Automatically scrolls to top whenever the route changes */}
      <ScrollToTop />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/quotebag" element={<QuoteBag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
