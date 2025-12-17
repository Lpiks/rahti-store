import React from 'react'

import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="text-center">
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    )
}

export default Footer