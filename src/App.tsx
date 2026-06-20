import React, { useState, useEffect } from 'react';
import { Smartphone, BookOpen, MessageSquare, Phone, MapPin, Sparkles, Grid, Hammer, Package, Shield, Star, Menu, X, Award, Play } from 'lucide-react';
import { Product, RepairBooking, Order, Review, AppNotification } from './types';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import GalleryPage from './components/GalleryPage';
import TestimonialsPage from './components/TestimonialsPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/AdminDashboard';
import { STORE_CONTACT } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Real-time server state holders
  const [products, setProducts] = useState<Product[]>([]);
  const [bookings, setBookings] = useState<RepairBooking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  // Master fetch synchronization
  const refreshData = async () => {
    try {
      const [resProd, resBook, resOrd, resRev, resNotif] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/bookings'),
        fetch('/api/orders'),
        fetch('/api/reviews'),
        fetch('/api/notifications')
      ]);

      if (resProd.ok) setProducts(await resProd.json());
      if (resBook.ok) setBookings(await resBook.json());
      if (resOrd.ok) setOrders(await resOrd.json());
      if (resRev.ok) setReviews(await resRev.json());
      if (resNotif.ok) setNotifications(await resNotif.json());
    } catch (err) {
      console.warn('Network error: server API offline or booting up. Safe mock fallingback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Auto sync state every 8 seconds for the real-time simulation experience
    const timer = setInterval(() => {
      refreshData();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleInquireWhatsApp = () => {
    window.open(`https://wa.me/${STORE_CONTACT.whatsapp}?text=Hello%20Sanjay%20Mobile%20Store%2C%20I%20am%25inquiry%25from%25website.`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-between font-sans leading-relaxed text-[#e5dec9]">
      
      {/* LUXURY PRIMARY WEBSITE HEADER NAV BAR */}
      <nav id="website-navigation-container" className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md border-b border-gold-500/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Elegant Golden Logo Group */}
            <div 
              onClick={() => { setActiveTab('home'); }}
              className="flex items-center gap-2.5 cursor-pointer group animate-fade-in"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-400/30 shadow-lg transform group-hover:scale-105 transition-all bg-black shrink-0">
                <img 
                  src="/src/assets/images/sanjay_repair_logo_1781948395254.jpg" 
                  alt="Sanjay Mobile & Repair Store Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="block font-black text-white text-xs sm:text-sm leading-tight tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-400 to-gold-500">
                  Sanjay Mobile
                </span>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  &amp; Repair Store
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-300">
              <button 
                onClick={() => setActiveTab('home')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'home' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('services')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'services' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Repairs
              </button>
              <button 
                onClick={() => setActiveTab('pricing')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'pricing' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Cost Estimations
              </button>
              <button 
                onClick={() => setActiveTab('gallery')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'gallery' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Our Work
              </button>
              <button 
                onClick={() => setActiveTab('testimonials')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'testimonials' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Reviews
              </button>
              <button 
                onClick={() => setActiveTab('about')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'about' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Our Journey
              </button>
              <button 
                onClick={() => setActiveTab('contact')} 
                className={`px-3.5 py-2 rounded-lg hover:text-gold-400 transition-all ${activeTab === 'contact' ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 shadow-[0_0_12px_rgba(212,175,55,0.05)]' : 'border border-transparent'}`}
              >
                Contact
              </button>
            </div>

            {/* Quick Actions & Mobile Companion Toggle */}
            <div className="hidden lg:flex items-center gap-2">
            </div>

            {/* Hamburger Button */}
            <div className="lg:hidden flex gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gold-500 hover:text-gold-400 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-t border-gold-500/10 flex flex-col font-bold uppercase tracking-wider text-xs px-4 py-4 space-y-2 border-b border-gold-500/20">
            {['home', 'services', 'pricing', 'gallery', 'testimonials', 'about', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                className={`py-2 text-left px-2 rounded-lg hover:bg-zinc-900 transition-all ${activeTab === tab ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20 font-bold' : 'text-slate-300'}`}
              >
                {tab === 'services' ? 'Repairs' : tab === 'testimonials' ? 'Reviews' : tab === 'about' ? 'History' : tab}
              </button>
            ))}
            {/* No admin panel button */}
          </div>
        )}
      </nav>      {/* CORE VIEW RENDERING */}
      <main className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-black">
            <span className="w-10 h-10 border-4 border-gold-900 border-t-gold-500 rounded-full animate-spin" />
            <p className="text-gold-500/80 font-medium font-mono text-xs uppercase tracking-widest">Retargeting satellite database nodes...</p>
          </div>
        ) : (
          <div>
            {/* 1. HOMEPAGE TAB */}
            {activeTab === 'home' && (
              <div>
                <Hero 
                  onNavigateToTab={(t) => setActiveTab(t)} 
                />

                {/* Popular Repair services marquee cards */}
                <div className="py-20 bg-[#0c0c0c] text-slate-200 text-left border-t border-b border-gold-500/10 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-gold-500 block mb-1.5 font-bold">Gold Certified benches</span>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Same-Day VIP bench Repairs</h2>
                      </div>
                      <button 
                        onClick={() => setActiveTab('services')}
                        className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5 self-start md:self-auto transition-colors bg-gold-500/5 px-3 py-1.5 rounded-lg border border-gold-500/10 hover:border-gold-500/35"
                      >
                        Explore technical breakdown &rarr;
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="p-6 bg-[#121212] rounded-2xl border border-gold-500/10 space-y-3.5 hover:border-gold-500/30 transition-all duration-300">
                        <div className="text-2xl w-10 h-10 bg-gold-500/5 rounded-xl border border-gold-500/10 flex items-center justify-center text-gold-500">📱</div>
                        <h3 className="font-bold text-white text-sm font-display tracking-tight">Oled & Touch Refitting</h3>
                        <p className="text-[11px] text-slate-450 leading-relaxed font-light">Dustless vacuum lamination and auto UV curing with premium replacement panels.</p>
                      </div>
                      <div className="p-6 bg-[#121212] rounded-2xl border border-gold-500/10 space-y-3.5 hover:border-gold-500/30 transition-all duration-300">
                        <div className="text-2xl w-10 h-10 bg-gold-500/5 rounded-xl border border-gold-500/10 flex items-center justify-center text-gold-400">🔋</div>
                        <h3 className="font-bold text-white text-sm font-display tracking-tight font-bold">Premium Battery cells</h3>
                        <p className="text-[11px] text-slate-455 text-slate-400 leading-relaxed font-light">Zero-cycle titanium grade cells equipped with certified overcharge thermal limiters.</p>
                      </div>
                      <div className="p-6 bg-[#121212] rounded-2xl border border-gold-500/10 space-y-3.5 hover:border-gold-500/30 transition-all duration-300">
                        <div className="text-2xl w-10 h-10 bg-gold-500/5 rounded-xl border border-gold-500/10 flex items-center justify-center text-gold-400">⚡</div>
                        <h3 className="font-bold text-white text-sm font-display tracking-tight">Microscopic Soldering</h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-light">Micro IC pin bridges and step-down capacitor repairs completed under 40x stereo scopes.</p>
                      </div>
                      <div className="p-6 bg-[#121212] rounded-2xl border border-gold-500/10 space-y-3.5 hover:border-gold-500/30 transition-all duration-300">
                        <div className="text-2xl w-10 h-10 bg-gold-500/5 rounded-xl border border-gold-500/10 flex items-center justify-center text-gold-400">💧</div>
                        <h3 className="font-bold text-white text-sm font-display tracking-tight">Ultrasonic Descaling</h3>
                        <p className="text-[11px] text-slate-455 text-slate-400 leading-relaxed font-light">Advanced highfrequency isopropyl scrubbing to arrest logic board moisture decay instantly.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ENHANCED GOLD QUALITY ASSURANCE SHOWCASE (Replaces Products Shelf) */}
                <div className="py-20 bg-black text-left relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 border border-gold-500/30 rounded-full font-bold">
                        Bespoke Workbench Commitments
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                        The 4 Standards of Gold-Grade Repairs
                      </h2>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                      <div className="flex gap-4 p-6 bg-[#1c1917]/20 rounded-2xl border border-gold-500/10 hover:bg-[#121212] transition-all">
                        <div className="text-gold-500 text-2xl shrink-0">🛡️</div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-[#f1ebd9] uppercase font-display tracking-wider">Premium Lifetime Seal Restore</h4>
                          <p className="text-slate-400 text-[11.5px] leading-relaxed">
                            Every single screen and adhesive glass back cover is sealed with tailor-fit factory-strength water resistance layers, keeping device structural integrity intact.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-6 bg-[#1c1917]/20 rounded-2xl border border-gold-500/10 hover:bg-[#121212] transition-all">
                        <div className="text-gold-500 text-2xl shrink-0">🎓</div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-[#f1ebd9] uppercase font-display tracking-wider">Electrostatic ESD-Safe Grounded Mats</h4>
                          <p className="text-slate-400 text-[11.5px] leading-relaxed">
                            Your valuable logic board and state chips are serviced exclusively on professional high-grade copper ground grounding sheets to shield them from invisible static damage.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-6 bg-[#1c1917]/20 rounded-2xl border border-gold-500/10 hover:bg-[#121212] transition-all">
                        <div className="text-gold-500 text-2xl shrink-0">💎</div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-[#f1ebd9] uppercase font-display tracking-wider">Original OEM Certified Parts</h4>
                          <p className="text-slate-400 text-[11.5px] leading-relaxed">
                            We source strictly original spec components directly. You get high brightness, precise touch refresh, and maximum lifetime assurance on all screen swaps.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-6 bg-[#1c1917]/20 rounded-2xl border border-gold-500/10 hover:bg-[#121212] transition-all">
                        <div className="text-gold-500 text-2xl shrink-0">🎖️</div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-[#f1ebd9] uppercase font-display tracking-wider">Pre and Post Bench Calibration tests</h4>
                          <p className="text-slate-400 text-[11.5px] leading-relaxed">
                            Our techs run systematic tests of touch density, charge rate logic, camera autofocus, and signal bands both before beginning and after refitting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geographic embed and Local SEO anchor */}
                <div className="py-20 bg-[#0c0c0c] border-t border-gold-500/10 text-left">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs text-gold-400 font-mono font-bold uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20">
                          Gold Class Boutique coordinates
                        </span>
                        <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">Locating Sanjay Mobile repairs</h2>
                        <p className="text-slate-350 text-sm font-light">
                          Our retail lab and tech workshop is located directly on <strong className="text-gold-400">Sahar Road, Andheri East</strong>. Walk straightforwardly from <strong className="text-gold-200 font-bold">Andheri Metro Station Exit 2</strong> or Sahar Road Auto Stand. We are situated opposite the landmark cooperative bank building.
                        </p>

                        <div className="space-y-3 font-medium text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-gold-500" />
                             <span>{STORE_CONTACT.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Phone className="w-4 h-4 text-gold-500" />
                             <span>Concierge: {STORE_CONTACT.phone}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setActiveTab('contact')}
                          className="px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-800 hover:from-gold-500 hover:to-gold-700 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-gold-500/10 cursor-pointer"
                        >
                          View Store Location & Timings
                        </button>
                      </div>

                      <div className="lg:col-span-6 h-[400px] rounded-3xl overflow-hidden border border-gold-500/15 shadow-2xl">
                        <iframe
                          title="Sanjay Location Embed Frame"
                           src={STORE_CONTACT.mapEmbedUrl}
                           width="100%"
                           height="100%"
                           style={{ border: 0 }}
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. ABOUT US TAB */}
            {activeTab === 'about' && <AboutPage />}

            {/* 3. HARDWARE SERVICES TAB */}
            {activeTab === 'services' && (
              <ServicesPage 
                onBookClick={(issue) => {
                  setActiveTab('contact');
                }} 
              />
            )}

            {/* 5. PRICING ESTIMATION TAB */}
            {activeTab === 'pricing' && <PricingPage />}

            {/* 6. PHYSICAL SHOWCASE TAB */}
            {activeTab === 'gallery' && <GalleryPage />}

            {/* 7. CUSTOMER TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <TestimonialsPage />
            )}

            {/* 8. GEOGRAPHIC CONTACT US TAB */}
            {activeTab === 'contact' && <ContactPage />}

            {/* 9. SECURE ADMINISTRATIVE DASHBOARD */}
            {activeTab === 'admin' && (
              <AdminDashboard 
                products={products}
                bookings={bookings}
                orders={orders}
                reviews={reviews}
                onRefreshData={() => { refreshData(); }}
              />
            )}
          </div>
        )}
      </main>

      {/* FIXED FLOATING WHATSAPP ASSIST CHAT BUBBLE */}
      <button
        onClick={handleInquireWhatsApp}
        className="fixed bottom-6 right-6 z-30 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1 border border-emerald-500/20 group cursor-pointer"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all font-bold text-xs uppercase tracking-wider text-slate-50 ml-0 group-hover:ml-1 leading-none select-none">
          WhatsApp Store
        </span>
      </button>

      {/* FOOTER */}
      <footer className="bg-black border-t border-gold-500/10 text-slate-300 py-16 px-4 text-xs font-light text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded-lg text-black">
                <Smartphone className="w-4 h-4 font-black" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white font-display text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-500">Sanjay Gold Repairs</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-light">
              Mumbai’s premium high-precision mobile screen restoration, logic repairs, and same-day micro-soldering near Andheri station Exit 2.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-200 text-[11px] font-mono">Popular Specialties</h4>
            <div className="space-y-1 text-slate-400">
              <span className="block hover:text-gold-400 cursor-pointer" onClick={() => setActiveTab('services')}>Screen & Touch Refit</span>
              <span className="block hover:text-gold-400 cursor-pointer" onClick={() => setActiveTab('services')}>Original Batteries</span>
              <span className="block hover:text-gold-400 cursor-pointer" onClick={() => setActiveTab('services')}>High Frequency Descaling</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-200 text-[11px] font-mono">Customer Desk</h4>
            <div className="space-y-1 text-slate-400">
              <span className="block hover:text-gold-400 cursor-pointer" onClick={() => setActiveTab('pricing')}>Cost Estimations</span>
              <span className="block hover:text-gold-400 cursor-pointer" onClick={() => setActiveTab('about')}>Our Journey</span>
            </div>
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-200 text-[11px] font-mono">Sahar Road, Mumbai</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {STORE_CONTACT.address}
            </p>
            <span className="block text-slate-500 font-mono mt-3 text-[10px]">© 2026 Sanjay Gold Repairs. Registered Maharashtra • GST IN.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
