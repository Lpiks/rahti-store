// src/constants/index.js
import main from "../assets/images/main.png";
import main1 from "../assets/images/main1.png";
import main2 from "../assets/images/main2.png";
import main3 from "../assets/images/main3.png";
import main4 from "../assets/images/main4.png";
import main5 from "../assets/images/main5.png";
// ⚠️ KEEP YOUR GOOGLE SCRIPT URL HERE
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylXp_ulb9s59qMa-3THXOXF1V6SOD_9BOCIkyd_JfCHM4ShcdMCFrAmN6vyyKLS1ZRSQ/exec";
// WhatsApp contact
// constants/index.js
export const WHATSAPP_NUMBER = "213555614892";

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/#products' },
  { name: 'About', path: '/#about' }
];

export const WILAYAS = [
  { id: 1, name: "Adrar" }, { id: 2, name: "Chlef" }, { id: 3, name: "Laghouat" },
  { id: 4, name: "Oum El Bouaghi" }, { id: 5, name: "Batna" }, { id: 6, name: "Béjaïa" },
  { id: 7, name: "Biskra" }, { id: 8, name: "Béchar" }, { id: 9, name: "Blida" },
  { id: 10, name: "Bouira" }, { id: 11, name: "Tamanrasset" }, { id: 12, name: "Tébessa" },
  { id: 13, name: "Tlemcen" }, { id: 14, name: "Tiaret" }, { id: 15, name: "Tizi Ouzou" },
  { id: 16, name: "Alger" }, { id: 17, name: "Djelfa" }, { id: 18, name: "Jijel" },
  { id: 19, name: "Sétif" }, { id: 20, name: "Saïda" }, { id: 21, name: "Skikda" },
  { id: 22, name: "Sidi Bel Abbès" }, { id: 23, name: "Annaba" }, { id: 24, name: "Guelma" },
  { id: 25, name: "Constantine" }, { id: 26, name: "Médéa" }, { id: 27, name: "Mostaganem" },
  { id: 28, name: "M'Sila" }, { id: 29, name: "Mascara" }, { id: 30, name: "Ouargla" },
  { id: 31, name: "Oran" }, { id: 32, name: "El Bayadh" }, { id: 33, name: "Illizi" },
  { id: 34, name: "Bordj Bou Arreridj" }, { id: 35, name: "Boumerdès" }, { id: 36, name: "El Tarf" },
  { id: 37, name: "Tindouf" }, { id: 38, name: "Tissemsilt" }, { id: 39, name: "El Oued" },
  { id: 40, name: "Khenchela" }, { id: 41, name: "Souk Ahras" }, { id: 42, name: "Tipaza" },
  { id: 43, name: "Mila" }, { id: 44, name: "Aïn Defla" }, { id: 45, name: "Naâma" },
  { id: 46, name: "Aïn Témouchent" }, { id: 47, name: "Ghardaïa" }, { id: 48, name: "Relizane" },
  { id: 49, name: "Timimoun" }, { id: 50, name: "Bordj Badji Mokhtar" }, { id: 51, name: "Ouled Djellal" },
  { id: 52, name: "Béni Abbès" }, { id: 53, name: "In Salah" }, { id: 54, name: "In Guezzam" },
  { id: 55, name: "Touggourt" }, { id: 56, name: "Djanet" }, { id: 57, name: "El M'Ghair" },
  { id: 58, name: "El Meniaa" }
];

export const products = [
  {
    id: 1,
    name: 'TitanCharge 240W Pro – The Ultimate 2-in-1 Fast Charging Cable & Integrated Folding Phone Stand',
    price: 8500,
    category: 'Accessories',
    categoryAr: 'اكسسوارات',
    stock: 10,
    description: "Elevate your charging experience with the TitanCharge 240W Pro. This isn't just a cable; it’s a revolutionary mobile accessory designed for power users, gamers, and movie lovers. Engineered with a massive 240W power delivery and a unique built-in folding stand, it allows you to charge at lightning speeds while keeping your device at the perfect viewing angle",
    nameAr: "TitanCharge 240W Pro – كابل الشحن السريع 2 في 1 وحامل الهاتف المدمج",
    descriptionAr: "ارتق بتجربة الشحن الخاصة بك مع TitanCharge 240W Pro. هذا ليس مجرد كابل؛ إنه ملحق ثوري للهواتف المحمولة مصمم للمستخدمين المحترفين واللاعبين وعشاق الأفلام. تم تصميمه بقدرة توصيل طاقة هائلة تبلغ 240 واط وحامل مدمج قابل للطي، مما يسمح لك بالشحن بسرعات فائقة مع الحفاظ على جهازك في زاوية المشاهدة المثالية.",
    images: [[main],
    [main1],
    [main2],
    [main3],
    [main4],
    [main5]
    ],
    // reviews: [
    //   { user: 'Ahmed', rating: 5, comment: 'Perfect fit and great quality!' }
    // ]
  },
  // {
  //   id: 2,
  //   name: 'Premium Leather Boots',
  //   price: 12000,
  //   category: 'Shoes',
  //   categoryAr: 'أحذية',
  //   stock: 10,
  //   description: 'Handcrafted leather boots designed for comfort and durability.',
  //   nameAr: "أحذية جلدية فاخرة",
  //   descriptionAr: "أحذية جلدية مصنوعة يدويًا مصممة للراحة والمتانة.",
  //   images: [
  //     'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600'
  //   ],
  //   reviews: []
  // },
  // // Add more products here as needed...
  // {
  //   id: 1,
  //   name: 'Classic Denim Jacket',
  //   price: 8500,
  //   category: 'Jackets',
  //   categoryAr: 'جاكيتات',
  //   stock: 10,
  //   description: 'Timeless denim jacket with a modern fit. Perfect for layering in any season.',
  //   nameAr: "جاكيت جينز كلاسيكي",
  //   descriptionAr: "جاكيت جينز كلاسيكي بقصة عصرية. مثالي للارتداء في أي موسم.",
  //   images: [
  //     'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
  //     'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600'
  //   ],
  //   reviews: [
  //     { user: 'Ahmed', rating: 5, comment: 'Perfect fit and great quality!' }
  //   ]
  // },
  // {
  //   id: 2,
  //   name: 'Premium Leather Boots',
  //   price: 12000,
  //   category: 'Shoes',
  //   categoryAr: 'أحذية',
  //   stock: 10,
  //   description: 'Handcrafted leather boots designed for comfort and durability.',
  //   nameAr: "أحذية جلدية فاخرة",
  //   descriptionAr: "أحذية جلدية مصنوعة يدويًا مصممة للراحة والمتانة.",
  //   images: [
  //     'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600'
  //   ],
  //   reviews: []
  // },
];

// src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"