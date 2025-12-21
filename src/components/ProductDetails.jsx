import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle, ShoppingBag, ChevronRight, MessageCircle, X, ChevronLeft } from "lucide-react";
import { products, WHATSAPP_NUMBER } from "../constants";
import CheckoutModal from "./CheckoutModal";
import Footer from "../components/Footer"; // 👈 Imported your Footer

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const product = products.find((p) => p.id === parseInt(id));

  if (!product)
    return <div className="text-center py-20">Product Not Found</div>;

  // WhatsApp Message Logic
  const whatsappMessage = encodeURIComponent(
    `Salam! I am interested in the ${isArabic ? product.nameAr : product.name} (Price: ${product.price} DZD). Is it available?`
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content Area: flex-grow pushes the Footer down */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full py-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <ChevronRight className={`w-5 h-5 ${isArabic ? "" : "rotate-180"}`} /> {t("productDetails.backToProducts")}
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <div
                className="overflow-hidden rounded-lg mb-4 cursor-pointer relative group"
                onClick={() => setIsImageOpen(true)}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={isArabic ? product.nameAr : product.name}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === idx
                      ? "border-blue-600 scale-95"
                      : "border-gray-200 hover:border-blue-300"
                      }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Side */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isArabic ? product.nameAr : product.name}
              </h1>
              <p className="text-4xl font-bold text-blue-600 mb-6">
                {product.price} {t("productDetails.price")}
              </p>
              <p className="text-gray-600 mb-6">{isArabic ? product.descriptionAr : product.description}</p>

              <div className="flex items-center gap-2 text-green-600 mb-6">
                <CheckCircle className="w-5 h-5" />{" "}
                <span className="text-sm">
                  {t("productDetails.inStock")}
                  {/* ({product.stock} {t("productDetails.available")}) */}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" /> {t("productDetails.buyNow")}
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> {t("productDetails.orderWhatsApp")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />

      {/* Image Lightbox Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageOpen(false);
            }}
          >
            <X className="w-10 h-10" />
          </button>
          {/* Previous Image Button */}
          <button
            className="absolute left-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={product.images[selectedImage]}
            alt={isArabic ? product.nameAr : product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200 mx-4"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Image Button */}
          <button
            className="absolute right-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* 👈 Replaced hardcoded footer with your Component */}
      <Footer />
    </div>
  );
};

export default ProductDetails;