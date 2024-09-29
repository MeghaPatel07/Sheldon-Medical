import React from "react";
import "./App.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/fontawesome.css";
import "./assets/css/flaticon.css";
import "./assets/css/pbminfotech-base-icons.css";
import "./assets/css/themify-icons.css";
import "./assets/css/swiper.min.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/aos.css";
import "./assets/css/shortcode.css";
import "./assets/css/base.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import TheTeam from "./Pages/TheTeam";
import Specialty from "./Pages/Specialty";
import Service from "./Pages/Services";
import KnowledgeBase from "./Pages/KnowledgeBase";
import Contact from "./Pages/ContactUs";
import MakeanAppoinment from "./Pages/MakeanAppoinment";
import ScrollToTop from "./Components/ScrollTop";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<TheTeam />} />
        <Route path="/specialty" element={<Specialty />} />
        <Route path="/services" element={<Service />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookanAppoinment" element={<MakeanAppoinment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
