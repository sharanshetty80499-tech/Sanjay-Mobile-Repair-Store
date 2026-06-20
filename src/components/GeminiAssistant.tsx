import React, { useState } from 'react';
import { Sparkles, ArrowRight, Battery, Smartphone, Clock, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

interface GeminiAssistantProps {
  onDiagnosticSuccess?: (data: {
    brand: string;
    model: string;
    issueType: string;
    estimate: number;
    diagnosisText: string;
  }) => void;
}

export default function GeminiAssistant({ onDiagnosticSuccess }: GeminiAssistantProps) {
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [issueType, setIssueType] = useState('screen');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !description.trim()) {
      setError('Please provide your exact mobile model and describe the symptom.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          model,
          issueType,
          description
        })
      });

      if (!response.ok) {
        throw new Error('API server returned an error.');
      }

      const data = await response.json();
      setResult(data.aiOutput);

      // Extract a numeric value from price estimate for booking
      let estimatedNum = 1800;
      if (data.aiOutput?.priceEstimate) {
        const matches = data.aiOutput.priceEstimate.match(/\d+[\d,.]*/g);
        if (matches && matches.length > 0) {
          estimatedNum = parseInt(matches[0].replace(/,/g, ''), 10);
        }
      }

      if (onDiagnosticSuccess) {
        onDiagnosticSuccess({
          brand,
          model,
          issueType,
          estimate: estimatedNum,
          diagnosisText: `${data.aiOutput?.likelyCause || ''} - Estimated: ${data.aiOutput?.priceEstimate || ''}`
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch smart diagnosis. Please try again or use manual booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-assistant-container" className="bg-[#112240] rounded-3xl p-6 sm:p-8 border border-slate-700/50 shadow-2xl text-white text-left">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-500/20 p-2.5 rounded-xl border border-orange-500/30 text-orange-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">Sanjay AI Diagnostic Tech</h3>
          <p className="text-xs text-slate-300">Instant Gemini-powered mobile fault analysis & quote estimator</p>
        </div>
      </div>

      <form onSubmit={handleDiagnose} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="Apple" className="bg-[#112240]">Apple iPhone</option>
              <option value="Samsung" className="bg-[#112240]">Samsung Galaxy</option>
              <option value="OnePlus" className="bg-[#112240]">OnePlus</option>
              <option value="Xiaomi" className="bg-[#112240]">Xiaomi / Redmi</option>
              <option value="Realme" className="bg-[#112240]">Realme</option>
              <option value="Vivo" className="bg-[#112240]">Vivo</option>
              <option value="Oppo" className="bg-[#112240]">Oppo</option>
              <option value="Motorola" className="bg-[#112240]">Motorola</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Exact Model</label>
            <input
              type="text"
              placeholder="e.g. iPhone 13 Pro, Nord CE 3"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Fault Category</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="screen" className="bg-[#112240]">Screen Replacement / Flickering</option>
              <option value="battery" className="bg-[#112240]">Battery Swelling / Fast Drain</option>
              <option value="charging" className="bg-[#112240]">Charging / Loose port / USB-C</option>
              <option value="water_damage" className="bg-[#112240]">Water Damage / Wet phone</option>
              <option value="software" className="bg-[#112240]">Slow / Locked / Brick / Bootloop</option>
              <option value="other" className="bg-[#112240]">Speaker / Network / Audio / Camera</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Since When?</label>
            <select className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500">
              <option className="bg-[#112240]">Today / Just fell down</option>
              <option className="bg-[#112240]">Few days ago</option>
              <option className="bg-[#112240]">Gradually worsening</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Symptom Description</label>
          <textarea
            placeholder="e.g. Green line is flickering on right side after a soft drop, touch is active, back glass is safe."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-[#0a192f] border border-slate-700/50 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500 placeholder:text-slate-500"
            required
          />
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-600 to-[#ea580c] hover:from-orange-500 hover:to-[#ea580c] text-white font-medium py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sanjay AI is analyzing hardware profiles...
            </>
          ) : (
            <>
              Analyze Fault & Get Estimate
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Dynamic Results Tray */}
      {result && (
        <div className="mt-6 border-t border-slate-800 pt-6 space-y-4 animate-fadeIn">
          <div className="bg-[#0a192f] rounded-xl p-4 border border-orange-505/10 border-slate-800">
            <h4 className="text-xs font-bold text-orange-405 text-orange-400 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
              <Smartphone className="w-4 h-4" /> Likely Cause Target
            </h4>
            <p className="text-xs sm:text-sm text-slate-205 text-slate-300 leading-relaxed font-light">{result.likelyCause}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0a192f] rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Estimated Cost Range</span>
              <span className="text-md sm:text-lg font-bold text-[#ea580c] font-mono">
                {result.priceEstimate || '₹1,500 - ₹3,500'}
              </span>
            </div>
            <div className="bg-[#0a192f] rounded-xl p-3 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">Estimated Bench Time</span>
              <span className="text-xs sm:text-sm font-semibold text-sky-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> {result.timeEstimate || '45 mins'}
              </span>
            </div>
          </div>

          <div className="bg-[#0a192f]/50 rounded-xl p-4 border border-slate-800/80">
            <span className="text-[10px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">Expert Remedy advice</span>
            <ul className="space-y-1.5">
              {(result.remedyAction || []).map((bullet: string, idx: number) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-orange-400 font-bold mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-500/10 rounded-xl p-3 border border-orange-500/10 text-xs text-orange-300 leading-relaxed">
            <span className="font-bold block text-orange-400 mb-0.5">Andheri East Local Assist:</span>
            {result.localSEOPhrase}
          </div>
        </div>
      )}
    </div>
  );
}
