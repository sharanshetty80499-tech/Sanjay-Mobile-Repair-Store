import { Phone, MessageSquare, Shield, Clock, Award, Hammer } from 'lucide-react';
import { STORE_CONTACT } from '../data/mockData';

interface HeroProps {
  onNavigateToTab: (tab: string) => void;
}

export default function Hero({ onNavigateToTab }: HeroProps) {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${STORE_CONTACT.whatsapp}?text=Hello%20Sanjay%20Mobile%20Store%2C%20I%20have%20an%20inquiry%20regarding%20mobile%20repair.`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${STORE_CONTACT.phone.replace(/\s+/g, '')}`);
  };

  return (
    <div className="relative overflow-hidden bg-[#0d0d1e] text-white pt-24 pb-20 lg:pt-28 lg:pb-24">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-[#151538]/60 via-[#0d0d1e] to-[#0d0d1e]" />
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-6">
          
          {/* Hero Main Copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Trusted Since 2012 • Andheri East, Mumbai
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Shattered Screen? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500">
                Fixed in 45 Mins
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl font-light">
              Don’t let a broken display halt your day. We replace screens, diagnose motherboards, and fix batteries with premium parts right near <strong className="text-white font-medium">Andheri East Metro Station</strong> & <strong className="text-white font-medium">Sahar Road</strong>. Live diagnostic transparency.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigateToTab('services')}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold shadow-lg shadow-blue-950/40 text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 border border-blue-500/20"
              >
                <Hammer className="w-4 h-4 text-amber-450" />
                Book Repair Appointment
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-md text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 border border-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                WhatsApp Sanjay Now
              </button>

              <button
                onClick={handleCall}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl font-medium text-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                Call 09819383725
              </button>
            </div>

            {/* USP Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-orange-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-200">6-Mo Warranty</span>
                </div>
                <p className="text-[11px] text-slate-400">Guaranteed quality backing</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-200">Express Fitting</span>
                </div>
                <p className="text-[11px] text-slate-400">90% display replacements &lt; 1hr</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-200">Expert Team</span>
                </div>
                <p className="text-[11px] text-slate-400">Micro-soldering certified</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

