import React from 'react';
import { Star, ShieldCheck, MapPin, Wifi, CheckCircle2, ExternalLink } from 'lucide-react';

export default function TestimonialsPage() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Sanjay+Mobile+Repairing+Sahar+Road+Andheri+East+Mumbai';

  return (
    <div id="testimonials-reviews-page" className="py-16 sm:py-24 bg-[#0d0d1e] text-slate-200 relative overflow-hidden text-left">
      
      {/* Background radial overlays */}
      <div className="absolute top-1/4 -left-12 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-full text-xs font-mono font-bold tracking-wider uppercase">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Verified Google Business Status
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display text-center">
            Store Reputation &amp; Ratings
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed text-center">
            Our official performance indicators, location landmarks, and customer satisfaction index on Google Maps.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
        </div>

        {/* Store Reputation Showcase Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Reputation Score Card */}
          <div className="md:col-span-5 bg-[#111126] p-8 rounded-3xl border border-slate-800/80 text-center flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xs font-extrabold text-slate-405 text-slate-400 uppercase tracking-widest font-mono mb-4">
                Google Rating Score
              </h3>
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80">
                <span className="text-5xl font-black text-white font-display block">4.9</span>
                <div className="flex text-gold-400 my-3 justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-current text-gold-400" />
                  ))}
                </div>
                <span className="text-[11px] text-emerald-400 uppercase tracking-wider block font-bold font-mono">
                  100% Five-Star standard
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div className="flex justify-between items-center text-slate-350 border-b border-slate-800/50 pb-2">
                <span>Display Service Time:</span>
                <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">45 Mins Avg</span>
              </div>
              <div className="flex justify-between items-center text-slate-350">
                <span>Sahar Road Landmark:</span>
                <span className="font-mono text-gold-400 font-bold bg-gold-500/10 px-2 py-0.5 rounded text-[10px]">Opp DGCA Office</span>
              </div>
            </div>
          </div>

          {/* Location Verification & Authenticity indicators */}
          <div className="md:col-span-7 bg-[#111126] p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gold-400/10 rounded-xl border border-gold-400/20 text-gold-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">
                    Official Google Business Bridge
                  </h4>
                  <span className="text-[9px] font-mono text-emerald-400 tracking-wider font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                    Verified Location
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Sanjay Mobile &amp; Repair Store is officially registered under Google Place ID <span className="font-mono text-gold-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800/50">ChIJLcyC0MLJvzsR76S86tFiEuI</span>. 
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% genuine replacement components with manufacturer validation keys.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Transparent and upfront reasonable rates matching original folder fittings.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Directly located opposite Andheri Airport DGCA office for quick physical drop-offs.</span>
                </div>
              </div>
            </div>

            <a 
              href={googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-gold-400 hover:bg-gold-500 text-black font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-mono shadow-lg shadow-gold-500/10"
            >
              <MapPin className="w-4 h-4" />
              View Store Location on Map
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
