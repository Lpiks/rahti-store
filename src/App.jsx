import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// Lazy load the ProductDetails page to reduce initial bundle size
const ProductDetails = React.lazy(() => import("./components/ProductDetails"));
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
        <div className={`grid gap-6 mx-auto ${products.length === 1 ? 'grid-cols-1 max-w-md' :
          products.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl' :
            products.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl' :
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <AboutSection />
      <Footer />
    </>
  );
};

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const App = () => {
  const { i18n } = useTranslation();

  // Keep this sync logic for runtime language switches (e.g. user toggles button)
  // The initial state is now handled by index.html for performance
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
