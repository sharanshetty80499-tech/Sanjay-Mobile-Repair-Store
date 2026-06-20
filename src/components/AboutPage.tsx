import { Store, ShieldCheck } from 'lucide-react';
import workshop1 from '../assets/images/sanjay_workshop_1_1781943633823.jpg';
import workshop2 from '../assets/images/sanjay_workshop_2_1781943651083.jpg';

export default function AboutPage() {
  return (
    <div id="about-page" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Sanjay Mobile Store
          </h2>
          <p className="text-lg text-slate-300 font-light">
            Serving Mumbai with ultimate integrity, fast repairs, and original accessories for over a decade.
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* History Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Journey since 2012</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Founded by master technician Sanjay Nair in 2012, our store started as a tiny 100-sq-ft repair counter near Andheri station. Sanjay’s core policy was simple: <strong className="text-orange-400 font-semibold">"Transparent charges, original parts, and immediate repair delivery."</strong>
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              Today, we are honored to be rated among Andheri East’s top recommended hardware support stores. Over 25,000 satisfied customers have trusted us with premium repairs of iPhones, Samsung flagships, and high-spec motherboards.
            </p>
            
            <div className="p-4 bg-[#112240] border-l-4 border-blue-600 rounded-r-xl border border-slate-700/50">
              <p className="italic text-xs text-slate-300 leading-relaxed">
                "We don't consider repairing just a business; it is about restoring connectivity, your files, memories, and daily peace of mind in this daily hustle of Mumbai."
              </p>
              <span className="block text-xs font-bold text-blue-400 mt-2">— Sanjay Nair, Founder</span>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={workshop1} 
              alt="Sanjay Mobile Store Counter with Gold Accents" 
              className="rounded-2xl shadow-xl border border-slate-700/50 w-full object-cover h-[350px]"
            />
            {/* Overlay Statistics */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-700/80 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-2xl font-extrabold text-orange-400">14+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="block text-2xl font-extrabold text-blue-400">25K+</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center text-white mb-8 tracking-wider uppercase">
            WHY MUMBAIKARS PREFER SANJAY MOBILE STORE
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-[#112240] rounded-2xl border border-slate-700/50 space-y-3 shadow-xl">
              <div className="bg-blue-500/10 text-blue-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold border border-blue-500/10">
                ✓
              </div>
              <h4 className="font-semibold text-white">100% Genuine Spare Parts</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                We procure authentic displays, certified OEM batteries, and premium flex cables. We do not engage in cheating with low-grade counterfeit duplicates.
              </p>
            </div>

            <div className="p-6 bg-[#112240] rounded-2xl border border-slate-700/50 space-y-3 shadow-xl">
              <div className="bg-orange-500/10 text-orange-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold border border-orange-500/10">
                ⏰
              </div>
              <h4 className="font-semibold text-white">Same-Day Express Repair</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Most display or charging socket replacements are processed within 45 minutes on our repair bench while you wait with free Wi-Fi!
              </p>
            </div>

            <div className="p-6 bg-[#112240] rounded-2xl border border-slate-700/50 space-y-3 shadow-xl">
              <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center font-bold border border-emerald-500/10">
                🛡️
              </div>
              <h4 className="font-semibold text-white">No Hide-and-Seek Pricing</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                No hidden diagnostics charges. Estimates are clearly printed and updated dynamically on our screens or in your app reservation.
              </p>
            </div>
          </div>
        </div>

        {/* Store Photos */}
        <div className="bg-[#112240] p-8 rounded-3xl border border-slate-700/50 shadow-xl text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Our physical setup in Andheri East</h3>
              <p className="text-xs text-slate-400">Stop by during business hours for instant consultation</p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              OPEN: 10:30 AM - 11:00 PM DAILY
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="group overflow-hidden rounded-xl bg-slate-850 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400" 
                alt="Store interior repair bench" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3 text-white">
                <span className="block text-xs font-semibold">Authorized Repair Bench</span>
              </div>
            </div>

            <div className="group overflow-hidden rounded-xl bg-slate-850 aspect-video relative">
              <img 
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400" 
                alt="Display of top cases" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3 text-white">
                <span className="block text-xs font-semibold">Premium Accessories Display</span>
              </div>
            </div>

            <div className="group overflow-hidden rounded-xl bg-slate-850 aspect-video relative">
              <img 
                src={workshop2} 
                alt="Hygienic gold dust-free lamination chamber" 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3 text-white">
                <span className="block text-xs font-semibold">Advanced OCA Laminator Setup</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
