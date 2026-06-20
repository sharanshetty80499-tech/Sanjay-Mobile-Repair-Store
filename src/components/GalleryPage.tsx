import { useState } from 'react';
import { REPAIR_WORK_PHOTOS } from '../data/mockData';
import { Image, Layers, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Repairs', 'Restoration', 'Inventory'];

  const filteredPhotos = REPAIR_WORK_PHOTOS.filter(
    (photo) => activeFilter === 'All' || photo.category === activeFilter
  );

  return (
    <div id="gallery-page" className="py-16 sm:py-24 bg-[#0a192f] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase px-3 py-1.5 rounded-full font-bold font-mono tracking-wider">
            Live Repair Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Physical Work Bench In Action
          </h2>
          <p className="text-slate-400 text-sm font-light">
            No stock internet-stolen photos. These are actual high-resolution repair steps taken directly inside our Andheri East shop.
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeFilter === cat
                  ? 'bg-orange-600 border-orange-500 text-white shadow-lg'
                  : 'bg-[#112240] border-slate-700/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#112240] border border-slate-700/50 rounded-3xl overflow-hidden group shadow-xl flex flex-col hover:border-blue-500/50 transition-all text-left"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0a192f]/90 text-slate-300 border border-slate-700/55 text-[9px] font-bold font-mono px-3 py-1 rounded-full uppercase tracking-widest">
                  {photo.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">{photo.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{photo.description}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                  <span>Sahar Road Lab Unit</span>
                  <span>Andheri East, MH</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
