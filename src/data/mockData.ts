import { Product, RepairBooking, Review, FAQItem } from '../types';

export const SEEDED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'iPhone 15 Pro Max (256GB - Blue Titanium)',
    category: 'smartphones',
    brand: 'Apple',
    price: 139900,
    originalPrice: 159900,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    stock: 5,
    specs: [
      '6.7-inch Super Retina XDR display featuring ProMotion',
      'Titanium with textured matte glass back',
      'A17 Pro chip with 6-core GPU',
      'Pro camera system: 48MP Main | Ultra Wide | Telephoto',
      'USB-C support for USB 3'
    ],
    description: 'The ultimate iPhone model featuring a lightweight titanium design, advanced 5x Telephoto camera, and the blazing fast A17 Pro chip.',
    isPopular: true
  },
  {
    id: 'prod-2',
    name: 'OnePlus 12 (16GB RAM + 512GB - Silky Black)',
    category: 'smartphones',
    brand: 'OnePlus',
    price: 64999,
    originalPrice: 69999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400',
    stock: 8,
    specs: [
      '6.82-inch 2K Oriental AMOLED display',
      'Snapdragon 8 Gen 3 Mobile Platform',
      '50MP Sony LYT-808 main camera with Hasselblad calibration',
      '5400 mAh battery with 100W SUPERVOOC charging'
    ],
    description: 'Equipped with the top-tier Snapdragon 8 Gen 3, Hasselblad mobile camera, and groundbreaking ultra-fast charging.',
    isPopular: true
  },
  {
    id: 'prod-3',
    name: 'Samsung Galaxy S24 Ultra (5G, 12GB+256GB)',
    category: 'smartphones',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 134999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    stock: 4,
    specs: [
      '6.8-inch Dynamic AMOLED 2X display with embedded S Pen',
      'Snapdragon 8 Gen 3 for Galaxy',
      '200MP Quad Telephoto camera with 100x Space Zoom',
      'Galaxy AI features: Live Translate, Circle to Search'
    ],
    description: 'Unleash new levels of creativity and productivity with Galaxy AI tools alongside a titanium frame and amazing 100x zoom.',
    isPopular: true
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy A35 5G (8GB+128GB - Awesome Lilac)',
    category: 'smartphones',
    brand: 'Samsung',
    price: 27999,
    originalPrice: 30999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
    stock: 12,
    specs: [
      '6.6-inch FHD+ Super AMOLED 120Hz',
      'Exynos 1380 processor',
      '50MP OIS Triple camera',
      'IP67 Dust and Water Resistant'
    ],
    description: 'High-value smartphone with premium design, glass back, Knox Security, and outstanding water resistance.',
    isPopular: false
  },
  {
    id: 'prod-5',
    name: 'Spigen Tough Armor Case (for iPhone 15 Pro Max)',
    category: 'accessories',
    brand: 'Spigen',
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400',
    stock: 25,
    specs: [
      'Dual-layer protection made of flexible TPU and rigid PC',
      'Air Cushion Technology for shock absorption',
      'Built-in kickstand for hands-free viewing'
    ],
    description: 'Sleek yet durable case providing top-tier military-grade protection for your expensive iPhone.',
    isPopular: true
  },
  {
    id: 'prod-6',
    name: 'Apple 20W USB-C Power Adapter (Original)',
    category: 'accessories',
    brand: 'Apple',
    price: 1699,
    originalPrice: 1900,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400',
    stock: 50,
    specs: [
      'Fast charging support for compatible iPhone models',
      'Recommended for charging iPad Pro and iPad Air',
      'Pairs with USB-C to Lightning / USB-C cables'
    ],
    description: 'Original Apple 20W power adapter for safe, fast, and highly reliable charging of Apple ecosystem products.',
    isPopular: true
  },
  {
    id: 'prod-7',
    name: 'Anker PowerCore 10,000mAh PD Power Bank',
    category: 'accessories',
    brand: 'Anker',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=400',
    stock: 15,
    specs: [
      'Slim and lightweight design',
      '20W Power Delivery output via USB-C port',
      'Overcharging and short circuit protection'
    ],
    description: 'Pocket-sized powerhouse with high-speed charging capabilities to keep your devices charged all day on the go.',
    isPopular: true
  },
  {
    id: 'prod-8',
    name: 'OnePlus Buds Pro 2 (Obsidian Black)',
    category: 'accessories',
    brand: 'OnePlus',
    price: 9999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    stock: 10,
    specs: [
      'Smart Adaptive Noise Cancellation (up to 48dB)',
      'Hi-Res Audio with dual drivers co-created with Dynaudio',
      'Up to 39 hours of battery life with charging case'
    ],
    description: 'Hi-Fi quality audio experience with personalized anti-noise profiles, perfect companion for any flagship phone.',
    isPopular: false
  },
  {
    id: 'prod-9',
    name: 'Skay Premium 9H Tempered Glass Screen Guard',
    category: 'accessories',
    brand: 'Generic',
    price: 299,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&q=80&w=400',
    stock: 200,
    specs: [
      '9H surface hardness scratch resistant',
      'HD clarity with 99.9% transparency',
      'Hydrophobic and oleophobic screen coating'
    ],
    description: 'High protection case-friendly tempered glass screen guard. Walk-in customers get free professional mounting!',
    isPopular: true
  }
];

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Abhishek Pandey',
    rating: 5,
    comment: 'Realme 11 x display acche bhav mein yahan per milta Hai ekadam kam Dam mein aap bhi aaiae aapke Parivar ka bhi kuchh bhi mobile related work rahega to yahi per aana Sanjay mobile store.',
    deviceWorkedOn: 'Realme 11x Display Replacement',
    isVerifiedPurchase: true,
    replyFromOwner: 'Shukriya Abhishek ji! Aapke parivar ka koi bhi kaam ho, hum hamesha saste aur ache daam mein original display bitaenge.',
    createdAt: '2026-06-19T10:30:00Z'
  },
  {
    id: 'rev-2',
    customerName: 'Rohit sandil',
    rating: 5,
    comment: 'Realme 12 x display yahan se repair Kiya acche rate mein good condition wah bhi airport DGCA office ke saamne hi hai.',
    deviceWorkedOn: 'Realme 12x Display Repair',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thank you Rohit! Yes, our shop is directly opposite the DGCA office on Sahar Road, extremely easy to find.',
    createdAt: '2026-06-17T15:20:00Z'
  },
  {
    id: 'rev-3',
    customerName: 'Dhananjay Singh',
    rating: 5,
    comment: 'Vivo y200 original display folder yaha se repair karwaya affordable rate me',
    deviceWorkedOn: 'Vivo Y200 Original Folder',
    isVerifiedPurchase: true,
    replyFromOwner: 'Dhananjay ji, bahuta dhanyawad! Hum 100% genuine folder fittings hi dete hain taki organic resolution bani rahe.',
    createdAt: '2026-06-15T11:45:00Z'
  },
  {
    id: 'rev-4',
    customerName: 'Prasad More',
    rating: 5,
    comment: 'Realme 8 display achcha quality ka milta Hai yahan per acche rate mein aap bhi yah shop ek bar TRY kijiye.',
    deviceWorkedOn: 'Realme 8 Display Quality Fitting',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thank you Prasad bhai! Hamesha try karne ke liye aate rahiye, standard rates hi milenge hamesha.',
    createdAt: '2026-06-13T18:15:00Z'
  },
  {
    id: 'rev-5',
    customerName: 'Sweeta Chaurasiya',
    rating: 5,
    comment: 'Power bank yaha se liya 12000mah ka rs 999 me',
    deviceWorkedOn: '12000mAh Power Bank Purchase',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thanks Sweeta! 12000mAh original backup power bank high grade output ke saath dukan par humesha live milta hai.',
    createdAt: '2026-06-11T14:10:00Z'
  }
];

export const REPAIR_ESTIMATES = [
  { issue: 'Screen Replacement', icon: 'smartphone', min: 1499, max: 12999 },
  { issue: 'Battery Replacement', icon: 'battery', min: 999, max: 4999 },
  { issue: 'Charging Port Repair', icon: 'zap', min: 499, max: 1999 },
  { issue: 'Water Damage Restoration', icon: 'droplet', min: 799, max: 3499 },
  { issue: 'Software Flashing / Unlock', icon: 'cpu', min: 399, max: 1499 },
  { issue: 'Speaker / Mic Replacement', icon: 'volume2', min: 499, max: 1499 }
];

export const FAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'repair',
    question: 'How long does a mobile screen replacement take?',
    answer: 'Typical screen replacements take only 30 to 60 minutes. We have a sit-and-wait lounge at our Andheri East shop. For rare models, parts procurement can take up to 24 hours.'
  },
  {
    id: 'faq-2',
    category: 'warranty',
    question: 'Do you offer a warranty on mobile repairs?',
    answer: 'Yes! We provide an assured 3-month to 6-month warranty on screen and battery replacements, which covers any manufacturing defects (except physical/water damage).'
  },
  {
    id: 'faq-3',
    category: 'location',
    question: 'Where is Sanjay Mobile Store located exactly?',
    answer: 'We are situated in Andheri East, Mumbai, near the Andheri Metro Station and Railway Station. It is highly accessible from Western Express Highway and Kurla-Andheri road.'
  },
  {
    id: 'faq-4',
    category: 'payment',
    question: 'Which modes of payment do you accept?',
    answer: 'We accept GPay, PhonePe, Paytm, BHIM UPI payments, credit/debit cards, and cash. You can also pay via simulated secure UPI directly in our booking engine.'
  },
  {
    id: 'faq-5',
    category: 'data',
    question: 'Will my phone data remain safe during repairs?',
    answer: 'We prioritize your data security and never request passwords unless critical for testing. We recommend backup of sensitive data, but 99% of simple repairs (screen, battery, port) do not affect device storage.'
  }
];

export const STORE_CONTACT = {
  address: '1, Sahar Rd, opp. Dgca Wr Office, Shiv Adarsh Society, Chakala, Andheri East, Mumbai, Maharashtra 400099',
  phone: '09819383725',
  whatsapp: '919819383725',
  hours: [
    { day: 'Saturday', time: '10:30 am – 11:00 pm' },
    { day: 'Sunday', time: '10:30 am – 11:00 pm' },
    { day: 'Monday', time: '10:30 am – 11:00 pm' },
    { day: 'Tuesday', time: '10:30 am – 11:00 pm' },
    { day: 'Wednesday', time: '10:30 am – 11:00 pm' },
    { day: 'Thursday', time: '10:30 am – 11:00 pm' },
    { day: 'Friday', time: '10:30 am – 11:00 pm' }
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0734567280875!2d72.8530188758832!3d19.115383550211158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d2d0c24c2d%3A0xe21262d1ea3ca4ef!2sAndheri%20Station%20(E)!5e0!3m2!1sen!2sin!4v1718870000000!5m2!1sen!2sin'
};

export const REPAIR_WORK_PHOTOS = [
  {
    id: 'photo-1',
    title: 'Precise Motherboard Repairing',
    category: 'Repairs',
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=500',
    description: 'Micro-soldering on a high-end iPhone motherboard for face ID restore.'
  },
  {
    id: 'photo-2',
    title: 'Expert Screen Fitting',
    category: 'Restoration',
    url: '/src/assets/images/expert_screen_fitting_1781943615800.jpg',
    description: 'Replacing a shattered OnePlus screen with a fresh OLED display.'
  },
  {
    id: 'photo-3',
    title: 'Premium Accessories Section',
    category: 'Inventory',
    url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
    description: 'Our physical shelf stocked with genuine Spigen, Apple, and Anker accessories.'
  },
  {
    id: 'photo-4',
    title: 'Water Damage De-humidification',
    category: 'Repairs',
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=500',
    description: 'Safely restoring a device from ocean fluid logging using ultrasonic cleaner.'
  }
];
