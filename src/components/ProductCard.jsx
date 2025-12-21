import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      // 1. MOVED onClick here: Making the whole card clickable is better UX
      onClick={() => navigate(`/product/${product.id}`)}
      // 2. CONTAINER STYLES: Added transform, hover:-translate-y-2, and hover:shadow-2xl
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                 transform transition-all duration-300 ease-in-out 
                 hover:-translate-y-2 hover:shadow-2xl group border border-transparent hover:border-blue-50"
    >
      {/* 3. IMAGE WRAPPER: Added 'overflow-hidden' so the zoom doesn't spill out */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={isArabic ? product.nameAr : product.name}
          // 4. IMAGE STYLES: Added scale-110 on group-hover for the slow zoom effect
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Low Stock Badge (Kept from your original) */}
        {product.stock < 5 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-sm z-10">
            Low Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {isArabic ? product.nameAr : product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{isArabic ? product.categoryAr : product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            {product.price} {t("productDetails.price")}
          </span>

          <button
            // Note: Since the parent div now handles the click, this button is visual. 
            // If you prefer the button to be the ONLY click trigger, remove onClick from the top div.
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
          >
            {t("productDetails.viewDetails")} <ChevronRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;