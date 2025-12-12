import React from "react";
import { Truck, ShieldCheck, Banknote } from "lucide-react";

const AboutSection = () => {
    return (
        <section id="about" className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Why Shop at <span className="text-blue-600">Rahti?</span>
                    </h2>
                    <p className="text-gray-500 mt-2">
                        We bring you the best quality leather boots with a service you can trust.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1: Delivery focus */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Truck className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Delivery</h3>
                        <p className="text-gray-600 text-sm">
                            We deliver quickly to 58 Wilayas. Get your boots right to your doorstep.
                        </p>
                    </div>

                    {/* Card 2: Trust focus (Cash on Delivery) */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Banknote className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Payment on Delivery</h3>
                        <p className="text-gray-600 text-sm">
                            Inspect your product first, then pay. Shop with 100% confidence.
                        </p>
                    </div>

                    {/* Card 3: Product Focus */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Quality</h3>
                        <p className="text-gray-600 text-sm">
                            We hand-pick every pair to ensure you get the best premium leather.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;