import React from "react";
import { Truck, ShieldCheck, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t('about.title')} <span className="text-blue-600">{t('about.title_highlight')}</span>
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1: Delivery focus */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Truck className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.features.delivery.title')}</h3>
                        <p className="text-gray-600 text-sm">
                            {t('about.features.delivery.description')}
                        </p>
                    </div>

                    {/* Card 2: Trust focus (Cash on Delivery) */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Banknote className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.features.payment.title')}</h3>
                        <p className="text-gray-600 text-sm">
                            {t('about.features.payment.description')}
                        </p>
                    </div>

                    {/* Card 3: Product Focus */}
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.features.quality.title')}</h3>
                        <p className="text-gray-600 text-sm">
                            {t('about.features.quality.description')}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;