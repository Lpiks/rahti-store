import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductDetails from "./components/ProductDetails";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import { products } from "./constants";
import AboutSection from "./components/AboutSection";

// Simple Home Component
const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <div
        id="products"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {t('home.our_collection')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          About Rahti
        </h2>
        <div class="flex flex-col md:flex-row gap-4">

          <div class="bg-gray-200 p-4 flex-1">
            
          </div>
          <div class="bg-gray-200 p-4 flex-1">03</div>
        </div>


      </div> */}
      <AboutSection />
      {/* <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="text-center">
          <p>© 2025 Rahti. Made in Algeria.</p>
        </div>
      </footer> */}
      <Footer />
    </>
  );
};

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
