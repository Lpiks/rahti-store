import React, { useState } from "react";
import { ShoppingBag, X, CheckCircle, Loader2 } from "lucide-react";
import { GOOGLE_SCRIPT_URL, WILAYAS } from "../constants";

const CheckoutModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    wilaya: "",
    address: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = product
    ? (product.price * formData.quantity).toFixed(2)
    : 0;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Must be a valid Algerian number";
    }

    if (!formData.wilaya) newErrors.wilaya = "Wilaya is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!validate()) {
      console.log("Validation failed", errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Prepare Data
      const payload = {
        date: new Date().toLocaleString(),
        productName: product.name,
        totalPrice: totalPrice + " DZD",
        customerName: formData.fullName,
        phone: formData.phone,
        wilaya: formData.wilaya,
        address: formData.address,
        quantity: formData.quantity,
      };

      console.log("Sending payload:", payload); // 👈 Check console for this

      // 3. Send to Google Sheet
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 4. Success!
      setIsSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        wilaya: "",
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
      alert("Failed to submit order. Check console for details.");
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
            <ShoppingBag className="w-5 h-5" /> Complete Your Order
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-10 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Order Placed!</h3>
            <p className="text-gray-500 mt-2">We will call you at {formData.phone} shortly.</p>
          </div>
        ) : (
          /* Form View */
          <div className="p-6 space-y-4">

            {/* Product Summary */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-800 font-semibold">{product?.name}</p>
                <p className="text-xs text-blue-600">Qty: {formData.quantity}</p>
              </div>
              <p className="text-lg font-bold text-blue-700">{totalPrice} DZD</p>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
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
              <label className="block text-sm font-medium mb-1">Phone (05/06/07)</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-2 rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                placeholder="0550..."
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Wilaya</label>
                <select
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  className={`w-full border p-2 rounded-lg bg-white ${errors.wilaya ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select...</option>
                  {WILAYAS.map((w) => (
                    <option key={w.id} value={`${w.id}-${w.name}`}>{w.id} - {w.name}</option>
                  ))}
                </select>
                {errors.wilaya && <p className="text-red-500 text-xs">{errors.wilaya}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Qty</label>
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
              <label className="block text-sm font-medium mb-1">Address</label>
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold flex justify-center items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;