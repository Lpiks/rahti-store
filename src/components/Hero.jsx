import React from "react";
import heroCover from "../assets/heroCover.jpg";
import { ShoppingBag } from "lucide-react";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center text-white overflow-hidden">

      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          // 👇 OPTION 1: The "General Shopping" Vibe (Best for General Store)
          src={heroCover}
          alt="Online Shopping"
          className="w-full h-full object-cover"
        />

        {/* 2. DARK OVERLAY */}
        {/* Kept dark so white text is easy to read */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 3. CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Find Your Next <span className="text-blue-400"> Product</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover the latest trending items. Best quality, unbeatable prices, and fast delivery to your door.
        </p>
        <button
          onClick={scrollToProducts}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 opacity-90"
        >
          <ShoppingBag className="w-5 h-5" /> Shop Trending Now
        </button>
      </div>
    </div>
  );
};

export default Hero;