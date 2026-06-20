import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQs } from '../data/mockData';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-section" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-slate-400 font-light">
            Got queries about parts warranty, data safety, or same-day express timing? Find quick answers below.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* FAQs list accordion card */}
        <div className="bg-[#112240] rounded-3xl border border-slate-700/50 shadow-xl p-4 sm:p-8 space-y-4">
          {FAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-slate-800 last:border-b-0 pb-4 last:pb-0"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left py-3.5 flex items-center justify-between gap-4 font-semibold text-white hover:text-orange-400 transition-colors"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="pl-6 pb-2 pr-4 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2 animate-fadeIn text-left">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
