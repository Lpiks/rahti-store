import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="text-center">
                <p>©{new Date().getFullYear()} Abdelhadi | Hammaz. All rights reserved. Made in Algeria.</p>
            </div>
        </footer>
    )
}

export default Footer