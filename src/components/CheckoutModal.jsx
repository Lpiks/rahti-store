import React, { useState } from "react";
import { ShoppingBag, X, CheckCircle, Loader2 } from "lucide-react";
import { GOOGLE_SCRIPT_URL } from "../constants";
import { Wilayas } from "../constants/wilayas";
import { WILAYA_NAMES_AR } from "../constants/wilaya_labels";
import { COMMUNE_NAMES_AR } from "../constants/commune_labels";
import { useTranslation } from "react-i18next";

const CheckoutModal = ({ isOpen, onClose, product }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    wilayaCode: "", // Store code like '01'
    commune: "",
    address: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper to get Wilaya name based on current language
  const getWilayaName = (code, enName) => {
    return i18n.language === "ar" ? WILAYA_NAMES_AR[code] || enName : enName;
  };

  // Helper to get Commune name based on current language
  const getCommuneName = (name) => {
    return i18n.language === "ar" ? COMMUNE_NAMES_AR[name] || name : name;
  };

  // Derived state: Get current wilaya object based on selected code
  const selectedWilayaData = Wilayas.find(w => w.wilayaCode === formData.wilayaCode);

  const totalPrice = product
    ? (product.price * formData.quantity).toFixed(2)
    : 0;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('checkout.errors.full_name');

    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t('checkout.errors.phone_required');
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('checkout.errors.phone_invalid');
    }

    if (!formData.wilayaCode) newErrors.wilaya = t('checkout.errors.wilaya');
    if (!formData.commune) newErrors.commune = t('checkout.errors.commune');
    if (!formData.address.trim()) newErrors.address = t('checkout.errors.address');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWilayaChange = (e) => {
    const code = e.target.value;
    setFormData(prev => ({
      ...prev,
      wilayaCode: code,
      commune: "" // Reset commune when wilaya changes
    }));
    if (errors.wilaya) setErrors(prev => ({ ...prev, wilaya: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedWilayaName = selectedWilayaData ? selectedWilayaData.wilayaName : "";

      const payload = {
        date: new Date().toLocaleString(),
        productName: product.name,
        totalPrice: totalPrice + " DZD",
        customerName: formData.fullName,
        phone: formData.phone,
        // Send readable names. You could send "01 - Adrar" if you prefer.
        wilaya: `${formData.wilayaCode} - ${selectedWilayaName}`,
        commune: formData.commune,
        address: formData.address,
        quantity: formData.quantity,
      };

      console.log("Sending payload:", payload);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        wilayaCode: "",
        commune: "",
        address: "",
        quantity: 1,
      });

      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> {t('checkout.title')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-10 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">{t('checkout.success_title')}</h3>
            <p className="text-gray-500 mt-2">{t('checkout.success_msg', { phone: formData.phone })}</p>
          </div>
        ) : (
          /* Form View */
          <div className="p-6 space-y-4">

            {/* Product Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-800 font-semibold">{product?.name}</p>
                <p className="text-xs text-blue-600">{t('checkout.product_summary', { qty: formData.quantity })}</p>
              </div>
              <p className="text-lg font-bold text-blue-700">{totalPrice} DZD</p>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.full_name')}</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full border p-2 rounded-lg ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Karim Benali"
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.phone')}</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-2 rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                placeholder="0550..."
                dir="ltr" // Phone numbers stay LTR usually
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            {/* WILAYA & COMMUNE ROW */}
            <div className="grid grid-cols-2 gap-4">
              {/* Wilaya Select */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.wilaya')}</label>
                <select
                  name="wilayaCode"
                  value={formData.wilayaCode}
                  onChange={handleWilayaChange}
                  className={`w-full border p-2 rounded-lg bg-white ${errors.wilaya ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">{t('checkout.select_wilaya')}</option>
                  {Wilayas.map((w) => (
                    <option key={w.wilayaCode} value={w.wilayaCode}>
                      {w.wilayaCode} - {getWilayaName(w.wilayaCode, w.wilayaName)}
                    </option>
                  ))}
                </select>
                {errors.wilaya && <p className="text-red-500 text-xs">{errors.wilaya}</p>}
              </div>

              {/* Commune Select */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.commune')}</label>
                <select
                  name="commune"
                  value={formData.commune}
                  onChange={handleChange}
                  disabled={!formData.wilayaCode}
                  className={`w-full border p-2 rounded-lg bg-white ${errors.commune ? "border-red-500" : "border-gray-300"} ${!formData.wilayaCode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">{t('checkout.select_commune')}</option>
                  {selectedWilayaData?.communes.map((c) => (
                    <option key={c} value={c}>{getCommuneName(c)}</option>
                  ))}
                </select>
                {errors.commune && <p className="text-red-500 text-xs">{errors.commune}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.qty')}</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">{t('checkout.address')}</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full border p-2 rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
                rows="2"
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold flex justify-center items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : t('checkout.confirm_btn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;