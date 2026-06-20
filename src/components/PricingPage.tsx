import { useState } from 'react';
import { IndianRupee, Smartphone, ShieldAlert, Cpu, CheckCircle, Calculator, PhoneCall } from 'lucide-react';
import { REPAIR_ESTIMATES } from '../data/mockData';

export default function PricingPage() {
  const [deviceVal, setDeviceVal] = useState('iPhone 13');
  const [selectedIssue, setSelectedIssue] = useState('Screen Replacement');

  // Interactive dynamic diagnostic quotation tool
  const dynamicPricing = [
    { model: 'iPhone 15', issue: 'Screen Replacement', price: '₹12,499', quality: 'Retina OLED Grade', warranty: '6 Months' },
    { model: 'iPhone 15', issue: 'Battery Replacement', price: '₹3,499', quality: 'Brand Standard', warranty: '6 Months' },
    { model: 'iPhone 13', issue: 'Screen Replacement', price: '₹5,999', quality: 'RETINA Grade', warranty: '6 Months' },
    { model: 'iPhone 13', issue: 'Battery Replacement', price: '₹2,199', quality: 'High Capacity Premium', warranty: '6 Months' },
    { model: 'OnePlus 11R', issue: 'Screen Replacement', price: '₹6,499', quality: 'Fluid AMOLED', warranty: '6 Months' },
    { model: 'OnePlus 11R', issue: 'Battery Replacement', price: '₹1,799', quality: 'A-Grade high charge', warranty: '6 Months' },
    { model: 'Samsung S23 Ultra', issue: 'Screen Replacement', price: '₹11,499', quality: 'Dynamic AMOLED 2X', warranty: '6 Months' },
    { model: 'Samsung S23 Ultra', issue: 'Battery Replacement', price: '₹2,699', quality: 'Zero Cycle Original', warranty: '6 Months' }
  ];

  const matchedEstimate = dynamicPricing.find(
    (item) => item.model.toLowerCase() === deviceVal.toLowerCase() && item.issue === selectedIssue
  ) || { price: '₹1,499 - ₹4,500', quality: 'A-Grade standard', warranty: '3-6 Months' };

  return (
    <div id="pricing-page" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Fair, Transparent Repair Pricing Estimates
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            No surprise taxes or diagnostics fee trap. See transparent benchmarks based on models.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Dynamic Interactive Estimate Calculator */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20 text-left">
          <div className="lg:col-span-7 bg-[#112240] p-6 sm:p-8 rounded-3xl border border-slate-700/50 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" /> Dynamic Estimator Module
            </h3>
            <p className="text-xs text-slate-400">
              Select your smartphone group and target issue below to calculate guaranteed repair rates.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-350 mb-2">Smartphone Series</label>
                <div className="grid grid-cols-2 gap-2">
                  {['iPhone 15', 'iPhone 13', 'OnePlus 11R', 'Samsung S23 Ultra'].map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setDeviceVal(model)}
                      className={`px-3 py-2 text-xs rounded-xl border text-center transition-all ${
                        deviceVal === model
                          ? 'bg-orange-600 text-white border-orange-500 font-semibold shadow-md shadow-orange-955'
                          : 'bg-[#0a192f] text-slate-300 hover:bg-slate-800 border-slate-700/50'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-350 mb-2">Service Required</label>
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-550 text-slate-200"
                >
                  <option value="Screen Replacement">Screen Replacement</option>
                  <option value="Battery Replacement">Battery Replacement</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs text-orange-300 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldAlert className="w-4 h-4 text-orange-400" /> Wait, I have another model!
              </span>
              <p className="text-slate-300">
                Don't worry! We repair over 500+ different phone models. Call us directly or test your case inside our <strong className="text-orange-400">Services page Gemini AI Diagnostic Tool</strong> for custom estimations.
              </p>
            </div>
          </div>

          {/* Quotation output card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#112240] to-slate-950 text-white p-8 rounded-3xl border border-slate-700/50 shadow-xl space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 block">Calculated Quote Offer</span>
            <div>
              <span className="text-xs text-slate-400 block">Device under scope</span>
              <span className="text-xl font-extrabold text-white">{deviceVal} ({selectedIssue})</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-[#ea580c] font-mono tracking-tight font-bold">{matchedEstimate.price}</span>
              <span className="text-xs text-slate-400 font-mono">All inclusive</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Glass Panel Grade:</span>
                <span className="text-slate-200 font-bold">{matchedEstimate.quality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty Term:</span>
                <span className="text-slate-200 font-bold">{matchedEstimate.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fitted In:</span>
                <span className="text-slate-200 font-bold">45 Minutes (Sit-and-Wait)</span>
              </div>
            </div>

            <button
              onClick={() => window.open(`https://wa.me/919876543210?text=I%20checked%20original%20price%20for%20${encodeURIComponent(deviceVal)}%20${encodeURIComponent(selectedIssue)}%20(${matchedEstimate.price}).%20Is%20Sahar%20Road%20store%20open%20today%3F`, '_blank')}
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-[#ea580c] hover:from-orange-500 hover:to-[#ea580c] text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-1"
            >
              Confirm on WhatsApp
            </button>
          </div>
        </div>

        {/* Categories card list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {REPAIR_ESTIMATES.map((est, idx) => (
            <div key={idx} className="bg-[#112240] p-5 rounded-2xl border border-slate-700/50 shadow-xl space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-orange-500 font-bold text-lg">•</span>
                <h4 className="font-bold text-white text-sm">{est.issue}</h4>
              </div>
              <p className="text-xs text-slate-400">Benchmark estimates for and mid-to-high range devices.</p>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Starts From</span>
                <span className="text-sm font-bold text-[#ea580c] font-mono">₹{est.min.toLocaleString('en-IN')} - ₹{est.max.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
