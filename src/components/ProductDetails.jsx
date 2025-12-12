import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, ChevronRight, MessageCircle } from "lucide-react";
import { products, WHATSAPP_NUMBER } from "../constants";
import CheckoutModal from "./CheckoutModal";
import Footer from "../components/Footer"; // 👈 Imported your Footer

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product)
    return <div className="text-center py-20">Product Not Found</div>;

  // WhatsApp Message Logic
  const whatsappMessage = encodeURIComponent(
    `Salam! I am interested in the ${product.name} (Price: ${product.price} DZD). Is it available?`
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content Area: flex-grow pushes the Footer down */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full py-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <ChevronRight className="w-5 h-5 rotate-180" /> Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4 transition-all duration-300"
              />
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
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-blue-600 mb-6">
                {product.price} DZD
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center gap-2 text-green-600 mb-6">
                <CheckCircle className="w-5 h-5" />{" "}
                <span className="text-sm">
                  In Stock ({product.stock} available)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" /> Buy Now
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Order or Ask via WhatsApp
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

      {/* 👈 Replaced hardcoded footer with your Component */}
      <Footer />
    </div>
  );
};

export default ProductDetails;