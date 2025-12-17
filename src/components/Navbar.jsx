import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, MessageCircle, Globe } from "lucide-react";
import { WHATSAPP_NUMBER, navLinks } from "../constants";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Rahti</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('nav.home')}
            </Link>
            <a href="/#products" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('nav.products')}
            </a>
            <a href="/#about" className="text-gray-700 hover:text-blue-600 font-medium">
              {t('nav.about')}
            </a>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
            >
              <Globe className="w-5 h-5" />
              <span>{i18n.language === "en" ? "AR" : "EN"}</span>
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            <div className="flex flex-col space-y-2 mt-2">
              <Link
                to="/"
                className="block px-2 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <a
                href="/#products"
                className="block px-2 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.products')}
              </a>
              <a
                href="/#about"
                className="block px-2 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>

              {/* 👇 ADDED THIS SECTION FOR MOBILE WHATSAPP 👇 */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-2 py-2 text-green-600 font-bold hover:bg-green-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;