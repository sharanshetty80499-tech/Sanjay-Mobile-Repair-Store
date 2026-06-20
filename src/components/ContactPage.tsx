import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Check, Send } from 'lucide-react';
import { STORE_CONTACT } from '../data/mockData';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${STORE_CONTACT.whatsapp}?text=Hello%20Sanjay%20Mobile%20Store%2C%20inquiry%20from%20Mumbai%20visitor.`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', phone: '', msg: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div id="contact-us-page" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Visit Our Sahar Road Shop
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Conveniently located 2 minutes walking distance from Andheri Station East exit. Fast walk-in, same-day fixing.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start text-left max-w-5xl mx-auto">
          
          {/* Left Column: Contact details */}
          <div className="bg-[#112240] p-6 sm:p-8 rounded-3xl border border-slate-700/50 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white leading-none">Andheri East Store Desk</h3>

            <div className="space-y-4">
              <div className="flex gap-3 text-sm">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Physical Address</span>
                  <span className="text-slate-300 font-light leading-relaxed text-xs">{STORE_CONTACT.address}</span>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-white">Phone Hotline</span>
                  <a href={`tel:${STORE_CONTACT.phone}`} className="text-blue-400 hover:underline font-mono">
                    {STORE_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 text-sm border-t border-slate-800 pt-4">
                <Clock className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <div className="w-full">
                  <span className="font-semibold block text-white mb-1">Standard Shop Timings</span>
                  {STORE_CONTACT.hours.map((val, idx) => (
                    <div key={idx} className="flex justify-between w-full max-w-md text-slate-300 text-xs py-0.5">
                      <span className="font-medium">{val.day}</span>
                      <span className="font-mono text-slate-400">{val.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              Live Chat Support via WhatsApp
            </button>
          </div>

          {/* Right Column: Google map iframe */}
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-slate-700/50 shadow-xl h-[330px] bg-slate-950">
              <iframe
                title="Google Maps Location"
                src={STORE_CONTACT.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 bg-blue-950/20 border border-gold-500/10 rounded-2xl text-xs text-slate-300 font-light text-center leading-relaxed">
              ⚡ <strong>Direct Walk-in:</strong> No prior appointment slot ticketing required. Walk in directly during open slot timings for micro-soldering and express display lamination.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
