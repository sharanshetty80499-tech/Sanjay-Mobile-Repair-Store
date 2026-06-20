import { useState } from 'react';
import { Smartphone, Battery, Zap, Droplet, Cpu, Settings2, Plus, CalendarRange, Sparkles, PhoneCall } from 'lucide-react';
import GeminiAssistant from './GeminiAssistant';
import { STORE_CONTACT } from '../data/mockData';

interface ServicesPageProps {
  onBookClick?: (prefilledIssue?: string) => void;
}

export default function ServicesPage({ onBookClick }: ServicesPageProps) {
  const [showAiDiagnostic, setShowAiDiagnostic] = useState(false);

  const servicesList = [
    {
      id: 'screen',
      title: 'Premium Screen Replacement',
      icon: Smartphone,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/10',
      description: 'Shattered front glass, green lines on screen, digitizer failure, or display bleeding. We offer top grade replacement panels.',
      priceRange: '₹1,499 - ₹12,999',
      duration: '30 - 60 Mins',
      warranty: '6 Months Warranty',
      steps: ['OCA vacuum lamination', 'Dust free chamber alignment', 'Frame sealant treatment']
    },
    {
      id: 'battery',
      title: 'Certified Battery Replacement',
      icon: Battery,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/10',
      description: 'Phone heating excessively, power cycling, bloated battery lifting back glass, or battery health < 80%.',
      priceRange: '₹999 - ₹4,999',
      duration: '20 - 40 Mins',
      warranty: '6 Months Warranty',
      steps: ['Zero charge cycle battery', 'Thermal paste refresh', 'Adhesive pull tap replacement']
    },
    {
      id: 'charging',
      title: 'Charging Port & USB-C Repair',
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/10',
      description: 'Cable falls out, slow charging, port moisture errors, headphone jack loose or broken board pins.',
      priceRange: '₹499 - ₹1,999',
      duration: '30 Mins',
      warranty: '3 Months Warranty',
      steps: ['Port dust cleanout', 'Micro soldering flux', 'Amp throughput testing']
    },
    {
      id: 'water',
      title: 'Water Damage Restoration',
      icon: Droplet,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/10',
      description: 'Dropped in pool, toilet, heavy Mumbai rainfall or tea spill. Immediate motherboard dry and ultrasonic cleaning.',
      priceRange: '₹799 - ₹3,499',
      duration: '4 - 12 Hours',
      warranty: 'Diagnosis Guaranteed',
      steps: ['De-shielding shields', 'Ultrasonic isopropyl scrub', 'Corrosion testing checks']
    },
    {
      id: 'software',
      title: 'Software Flashing & Unlock',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/10',
      description: 'Bootlooping brick state, FRP lock, forgot PIN, slow performance, firmware restore or backup solutions.',
      priceRange: '₹399 - ₹1,499',
      duration: '1 - 2 Hours',
      warranty: 'Service assurance',
      steps: ['Stock ROM flashing', 'FRP lock bypass tool', 'EMMC health check']
    },
    {
      id: 'other',
      title: 'Speaker, Mic & Camera Service',
      icon: Settings2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10',
      description: 'Muffled call audio, camera focus issue, glass lens scratch, vibrator fail or buttons unresponsive.',
      priceRange: '₹499 - ₹1,699',
      duration: '30 - 45 Mins',
      warranty: '3 Months Warranty',
      steps: ['Mesh cleaning', 'Coaxial alignment', 'Optical glass renewal']
    }
  ];

  return (
    <div id="services-page" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest bg-orange-400/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Professional Bench Repairs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Mobile Hardware Repair Specialties
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-light">
            We operate fully secure, physical ESD-safe repair bins with state-of-the-art tools. Describe your symptom or choose your repair branch.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Floating AI Callout */}
        <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-blue-950 to-[#112240] p-6 rounded-2xl border border-blue-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="bg-orange-550/20 p-3 rounded-xl border border-orange-550/30 text-orange-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Unsure what’s wrong with your phone?</h4>
              <p className="text-xs text-slate-300">Let our custom Gemini AI system analyze symptoms and suggest pricing.</p>
            </div>
          </div>
          <button
            onClick={() => setShowAiDiagnostic(!showAiDiagnostic)}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-orange-500/10 shrink-0"
          >
            {showAiDiagnostic ? 'Hide AI Assistant' : 'Launch AI Diagnostics'}
          </button>
        </div>

        {/* Embedded AI Assistant */}
        {showAiDiagnostic && (
          <div className="max-w-3xl mx-auto mb-16 animate-slideIn">
            <GeminiAssistant 
              onDiagnosticSuccess={(data) => {
                if (onBookClick) {
                  // Allow quick prefilled redirect if callback exists
                  console.log('Prefilled AI Diagnosis:', data);
                }
              }}
            />
          </div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 text-left">
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-[#112240] rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between hover:border-orange-500/50 transition-all group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${service.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-medium text-slate-350 bg-[#0a192f] px-2 py-1 rounded">
                      {service.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed min-h-[50px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Standard steps */}
                  <div className="bg-[#0a192f] p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Bench steps:</span>
                    <div className="space-y-1">
                      {service.steps.map((step, sIdx) => (
                        <div key={sIdx} className="text-[10px] text-slate-300 flex items-center gap-1.5">
                          <span className="text-orange-550">•</span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Assured Estimate</span>
                    <span className="text-sm font-extrabold text-[#ea580c] font-mono">{service.priceRange}</span>
                  </div>
                  <button
                    onClick={() => onBookClick && onBookClick(service.title)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-md shadow-orange-500/10"
                  >
                    <CalendarRange className="w-3.5 h-3.5" /> Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Repair Policy Note */}
        <div className="p-8 bg-[#112240] rounded-3xl border border-slate-700/50 text-left max-w-4xl mx-auto space-y-4 shadow-xl">
          <h4 className="text-base font-bold text-white text-center sm:text-left">Our 3-Rule Commitment to Transparent Bench Service</h4>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-orange-400 font-bold text-sm block">1. Clean Testing Log</span>
              <p className="text-[11px] text-slate-300">We inspect screen responsiveness, battery cycles, and motherboard load before & after fitting.</p>
            </div>
            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
              <span className="text-blue-400 font-bold text-sm block">2. Complete Seal Restore</span>
              <p className="text-[11px] text-slate-300">All screens and back covers are sealed back with professional industrial grade adhesion seals.</p>
            </div>
            <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
              <span className="text-emerald-450 text-emerald-400 font-bold text-sm block">3. ESD-Safe Bins</span>
              <p className="text-[11px] text-slate-300">We replace parts on microstatic grounding mats, ensuring zero electrostatic risk to processor ICs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
