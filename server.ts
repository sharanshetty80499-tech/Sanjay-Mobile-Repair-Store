import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini API initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize Gemini Client:', err);
  }
} else {
  console.log('No GEMINI_API_KEY found, running AI features in standard diagnostic mode.');
}

// In-memory / persistent file database path
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Preseeded data references (to avoid circular dependency on client file imports, let's define them here)
const INITIAL_PRODUCTS = [
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
  }
];

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    customerName: 'Abhishek Pandey',
    rating: 5,
    comment: 'Realme 11 x display acche bhav mein yahan per milta Hai ekadam kam Dam mein aap bhi aaiae aapke Parivar ka bhi kuchh bhi mobile related work rahega to yahi per aana Sanjay mobile store.',
    deviceWorkedOn: 'Realme 11x Display Replacement',
    isVerifiedPurchase: true,
    replyFromOwner: 'Shukriya Abhishek ji! Aapke parivar ka koi bhi kaam ho, hum hamesha saste aur ache daam mein original display bitaenge.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-2',
    customerName: 'Rohit sandil',
    rating: 5,
    comment: 'Realme 12 x display yahan se repair Kiya acche rate mein good condition wah bhi airport DGCA office ke saamne hi hai.',
    deviceWorkedOn: 'Realme 12x Display Repair',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thank you Rohit! Yes, our shop is directly opposite the DGCA office on Sahar Road, extremely easy to find.',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-3',
    customerName: 'Dhananjay Singh',
    rating: 5,
    comment: 'Vivo y200 original display folder yaha se repair karwaya affordable rate me',
    deviceWorkedOn: 'Vivo Y200 Original Folder',
    isVerifiedPurchase: true,
    replyFromOwner: 'Dhananjay ji, bahuta dhanyawad! Hum 100% genuine folder fittings hi dete hain taki organic resolution bani rahe.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-4',
    customerName: 'Prasad More',
    rating: 5,
    comment: 'Realme 8 display achcha quality ka milta Hai yahan per acche rate mein aap bhi yah shop ek bar TRY kijiye.',
    deviceWorkedOn: 'Realme 8 Display Quality Fitting',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thank you Prasad bhai! Hamesha try karne ke liye aate rahiye, standard rates hi milenge hamesha.',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'rev-5',
    customerName: 'Sweeta Chaurasiya',
    rating: 5,
    comment: 'Power bank yaha se liya 12000mah ka rs 999 me',
    deviceWorkedOn: '12000mAh Power Bank Purchase',
    isVerifiedPurchase: true,
    replyFromOwner: 'Thanks Sweeta! 12000mAh original backup power bank high grade output ke saath dukan par humesha live milta hai.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'SJB-10024',
    userId: 'cust-demo',
    customerName: 'Rajesh Kulkarni',
    customerPhone: '+91 99300 12345',
    customerEmail: 'rajesh.k@gmail.com',
    deviceBrand: 'OnePlus',
    deviceModel: '11R 5G',
    issueType: 'screen',
    issueDescription: 'Cracked the screen while getting off the local train at Andheri station.',
    estimatedCost: 6500,
    status: 'diagnosing',
    scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    scheduledSlot: '12:00 PM - 02:00 PM',
    timeline: [
      { status: 'booked', notes: 'Repair booking placed via website.', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
      { status: 'assigned', notes: 'Assigned to senior hardware technician Anil.', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
      { status: 'diagnosing', notes: 'Inspecting frame damage and connector cables.', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() }
    ],
    notes: 'Prioritized urgent repair.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'SJB-10025',
    userId: 'cust-demo',
    customerName: 'Aishwarya Nair',
    customerPhone: '+91 98199 87654',
    customerEmail: 'aishwarya.n@yahoo.com',
    deviceBrand: 'Apple',
    deviceModel: 'iPhone 13',
    issueType: 'battery',
    issueDescription: 'Battery health drops to 74% and drains complete charge in 3 hours.',
    estimatedCost: 3200,
    status: 'ready',
    scheduledDate: new Date(Date.now()).toISOString().split('T')[0],
    scheduledSlot: '10:00 AM - 12:00 PM',
    timeline: [
      { status: 'booked', notes: 'Booking initialized.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
      { status: 'assigned', notes: 'Assigned to repair bay 3.', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
      { status: 'diagnosing', notes: 'Confirming high battery resistance cycles.', timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString() },
      { status: 'ready', notes: 'Original Apple layout high capacity battery installed. All tests passed. Device ready for pickup.', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
    ],
    notes: 'Keep transparent guard intact.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  }
];

const INITIAL_ORDERS = [
  {
    id: 'SJO-50012',
    userId: 'cust-demo',
    customerName: 'Deepak Sawant',
    customerPhone: '+91 97690 11223',
    items: [
      { productId: 'prod-6', name: 'Apple 20W USB-C Power Adapter (Original)', price: 1699, quantity: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400' }
    ],
    totalAmount: 1699,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Flat 202, Gokul Heights, Sahar Road, Andheri East, Mumbai 400069',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper to load/save offline datastore
function loadDb() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const dbBase = {
        products: INITIAL_PRODUCTS,
        reviews: INITIAL_REVIEWS,
        bookings: INITIAL_BOOKINGS,
        orders: INITIAL_ORDERS,
        payments: [],
        notifications: [
          {
            id: 'notif-1',
            title: 'Welcome to Sanjay Mobile Store',
            body: 'Your high-fidelity local repair partner in Andheri East, Mumbai. Book screen, battery, or software repairs now.',
            type: 'general',
            isRead: false,
            createdAt: new Date().toISOString()
          }
        ]
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(dbBase, null, 2));
      return dbBase;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error operations on database file, using runtime fallback:', error);
    return {
      products: INITIAL_PRODUCTS,
      reviews: INITIAL_REVIEWS,
      bookings: INITIAL_BOOKINGS,
      orders: INITIAL_ORDERS,
      payments: [],
      notifications: []
    };
  }
}

function saveDb(data: any) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

// REST endpoints for data sync
app.get('/api/db', (req, res) => {
  const db = loadDb();
  res.json(db);
});

// Create Repair Booking
app.post('/api/bookings', (req, res) => {
  const db = loadDb();
  const {
    userId,
    customerName,
    customerPhone,
    customerEmail,
    deviceBrand,
    deviceModel,
    issueType,
    issueDescription,
    estimatedCost,
    scheduledDate,
    scheduledSlot,
    aiDiagnosis
  } = req.body;

  const bookingId = `SJB-${Math.floor(10000 + Math.random() * 90000)}`;
  const nowStr = new Date().toISOString();

  const newBooking = {
    id: bookingId,
    userId: userId || 'cust-demo',
    customerName,
    customerPhone,
    customerEmail,
    deviceBrand,
    deviceModel,
    issueType,
    issueDescription,
    estimatedCost: estimatedCost || 1200,
    status: 'booked',
    scheduledDate,
    scheduledSlot,
    timeline: [
      { status: 'booked', notes: 'Booking requested successfully near Andheri station.', timestamp: nowStr }
    ],
    aiDiagnosis: aiDiagnosis || '',
    createdAt: nowStr,
    updatedAt: nowStr
  };

  db.bookings.unshift(newBooking);

  // Trigger push notification mockup
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Repair Booking Confirmed! 📱',
    body: `Repair ID ${bookingId} has been successfully registered for your ${deviceBrand} ${deviceModel}.`,
    type: 'booking',
    targetId: bookingId,
    isRead: false,
    createdAt: nowStr
  });

  saveDb(db);
  res.status(201).json(newBooking);
});

// Update Repair Booking (Admin / Workflow status updates)
app.patch('/api/bookings/:id', (req, res) => {
  const db = loadDb();
  const { id } = req.params;
  const { status, notes, actualCost } = req.body;

  const bookingIdx = db.bookings.findIndex((b: any) => b.id === id);
  if (bookingIdx === -1) {
    return res.status(404).json({ error: 'Repair booking not found.' });
  }

  const booking = db.bookings[bookingIdx];
  const nowStr = new Date().toISOString();

  if (status) {
    booking.status = status;
    booking.timeline.push({
      status,
      notes: notes || `Status updated to ${status}.`,
      timestamp: nowStr
    });
  }

  if (actualCost !== undefined) {
    booking.actualCost = actualCost;
  }

  booking.updatedAt = nowStr;
  db.bookings[bookingIdx] = booking;

  // Add push notifications for customer update
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Repair Status Updated! 🛠️',
    body: `Your repair ${id} is now in status: ${status.toUpperCase()}.`,
    type: 'booking',
    targetId: id,
    isRead: false,
    createdAt: nowStr
  });

  saveDb(db);
  res.json(booking);
});

// Register product order
app.post('/api/orders', (req, res) => {
  const db = loadDb();
  const {
    userId,
    customerName,
    customerPhone,
    items,
    totalAmount,
    paymentMethod,
    shippingAddress
  } = req.body;

  const orderId = `SJO-${Math.floor(50000 + Math.random() * 49000)}`;
  const nowStr = new Date().toISOString();

  const newOrder = {
    id: orderId,
    userId: userId || 'cust-demo',
    customerName,
    customerPhone,
    items,
    totalAmount,
    status: 'pending',
    paymentStatus: paymentMethod === 'UPI' ? 'paid' : 'pending',
    paymentMethod,
    shippingAddress,
    createdAt: nowStr,
    updatedAt: nowStr
  };

  db.orders.unshift(newOrder);

  // Update inventory stocks
  items.forEach((item: any) => {
    const prod = db.products.find((p: any) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  });

  // Create notifications
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Order Placed! 🎁',
    body: `Order ${orderId} has been successfully placed. Stock is verified.`,
    type: 'order',
    targetId: orderId,
    isRead: false,
    createdAt: nowStr
  });

  saveDb(db);
  res.status(201).json(newOrder);
});

// Update order status (Admin)
app.patch('/api/orders/:id', (req, res) => {
  const db = loadDb();
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const orderIdx = db.orders.findIndex((o: any) => o.id === id);
  if (orderIdx === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const order = db.orders[orderIdx];
  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  order.updatedAt = new Date().toISOString();

  db.orders[orderIdx] = order;
  saveDb(db);
  res.json(order);
});

// POST custom review
app.post('/api/reviews', (req, res) => {
  const db = loadDb();
  const { customerName, rating, comment, deviceWorkedOn } = req.body;

  const newReview = {
    id: `rev-${Date.now()}`,
    userId: 'cust-demo',
    customerName: customerName || 'Valued Customer',
    rating: Number(rating) || 5,
    comment,
    deviceWorkedOn,
    isVerifiedPurchase: true,
    createdAt: new Date().toISOString()
  };

  db.reviews.unshift(newReview);
  saveDb(db);
  res.status(201).json(newReview);
});

// POST manual reply to review (Admin)
app.post('/api/reviews/:id/reply', (req, res) => {
  const db = loadDb();
  const { id } = req.params;
  const { replyText } = req.body;

  const reviewIdx = db.reviews.findIndex((r: any) => r.id === id);
  if (reviewIdx === -1) {
    return res.status(404).json({ error: 'Review not found.' });
  }

  db.reviews[reviewIdx].replyFromOwner = replyText;
  saveDb(db);
  res.json(db.reviews[reviewIdx]);
});

// Edit Product Inventory
app.post('/api/products', (req, res) => {
  const db = loadDb();
  const { name, category, brand, price, stock, specs, description, image } = req.body;

  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category,
    brand,
    price: Number(price),
    originalPrice: Number(price) * 1.15,
    stock: Number(stock),
    specs: specs || [],
    description,
    image: image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
    isPopular: false
  };

  db.products.push(newProduct);
  saveDb(db);
  res.status(201).json(newProduct);
});

// Mark notifications as read
app.post('/api/notifications/read-all', (req, res) => {
  const db = loadDb();
  db.notifications.forEach((n: any) => { n.isRead = true; });
  saveDb(db);
  res.json({ success: true });
});

// Gemini-powered Mobile Repair Symptom Analyzer / Quote Engine
app.post('/api/ai/diagnose', async (req, res) => {
  const { brand, model, issueType, description } = req.body;

  if (!brand || !model || !issueType || !description) {
    return res.status(400).json({ error: 'All fields (brand, model, issueType, description) are required.' });
  }

  // Pre-configured rule-based fallback diagnoses if GEMINI_API_KEY is not configured
  const fallbackDiagnose = {
    likelyCause: `Probable damage to target ${issueType} circuitry of the ${brand} ${model}. Requires direct visual motherboard inspection.`,
    timeEstimate: issueType === 'screen' ? '45 minutes' : issueType === 'battery' ? '30 minutes' : '2 hours',
    priceEstimate: issueType === 'screen' ? '₹2,500 - ₹9,500' : issueType === 'battery' ? '₹1,200 - ₹3,500' : '₹1,500 - ₹4,000',
    remedyAction: [
      'Stop using or charging the device immediately to prevent terminal short circuits.',
      'Visit Sanjay Mobile Store near Andheri Station for an instant dry-brush and clean inspection.',
      'Keep backup of crucial apps or files if display panel starts bleeding ink.'
    ],
    localSEOPhrase: 'Walk straight out of Andheri East Station (Sahar Road exit) to Shop No. 4 Sai Krupa. Get certified repairs in 45 minutes!'
  };

  if (!ai) {
    return res.json({
      aiOutput: fallbackDiagnose,
      note: 'Using High-Fidelity Rule-Based Diagnosis (AI Offline mode).'
    });
  }

  try {
    const prompt = `You are Sanjay, the legendary Lead Hardware Diagnostic Expert from 'Sanjay Mobile Store' in Andheri East, Mumbai.
You speak with professional competence, ultimate trust, and friendly Mumbai-English warmth.
Analyze this user incident:
Brand: ${brand}
Model: ${model}
Issue Type: ${issueType}
Description of symptom: ${description}

Respond strictly with valid JSON conforming to this schema (do NOT repeat these instructions or wrap in other text, output pure JSON):
{
  "likelyCause": "Explain the specific electrical or mechanical root cause clearly based on this device. E.g., for swelling it is lithium gas buildup. Speak in a helpful tone.",
  "timeEstimate": "Estimate repair time clearly, e.g., '40 minutes', '3 hours', 'Next-Day delivery'",
  "priceEstimate": "Provide cost estimate range in Indian Rupees (INR), e.g., '₹1,800 - ₹3,000'",
  "remedyAction": [
    "First concrete warning or action, e.g., do not compress swelling battery",
    "Second concrete warning or storage advice",
    "Third advice related to backing up or safety"
  ],
  "localSEOPhrase": "Provide a warm invitation referencing your shop's prime Andheri East location near Andheri Station and Metro."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const outputText = response.text?.trim() || '';
    let parsedResult;
    try {
      parsedResult = JSON.parse(outputText);
    } catch (parseErr) {
      console.log('Gemini model output is not raw JSON, parsing codeblock:', outputText);
      const cleaned = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    return res.json({
      aiOutput: parsedResult,
      note: 'Analyzed dynamically by Gemini 3.5 AI Engine.'
    });
  } catch (error: any) {
    console.error('Gemini diagnostic call failed:', error);
    return res.json({
      aiOutput: fallbackDiagnose,
      note: 'Fell back to Expert Rule-Based Diagnosis (API limits or keys).'
    });
  }
});

// Configure Vite or Serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite routing active in developer middleware mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production server mode active. Static bundle target: dist/');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sanjay Mobile Store server is live on http://localhost:${PORT}`);
  });
}

startServer();
