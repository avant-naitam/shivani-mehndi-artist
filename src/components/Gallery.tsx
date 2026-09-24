import React, { useState } from 'react';
import { Maximize2, X, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem, ServiceType } from '../types';
import { OrnamentalDivider } from './MehndiMotifs';

interface GalleryProps {
  onSelectForBooking: (serviceType?: ServiceType) => void;
}

const CATEGORIES = [
  'All',
  'Bridal',
  'Traditional',
  'Arabic',
  'Special Occasions',
  'Training & Practice',
] as const;

type CategoryType = typeof CATEGORIES[number];

export const Gallery: React.FC<GalleryProps> = ({ onSelectForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleBookFromLightbox = () => {
    if (!selectedItem) return;
    let mappedService: ServiceType = 'Special Occasion Mehndi';
    if (selectedItem.category === 'Bridal') mappedService = 'Bridal Mehndi';
    else if (selectedItem.category === 'Traditional') mappedService = 'Wedding Mehndi';
    else if (selectedItem.category === 'Arabic') mappedService = 'Engagement Mehndi';

    setSelectedItem(null);
    onSelectForBooking(mappedService);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
            PORTFOLIO & WORKSHOP ARCHIVE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Artistry & Practice Gallery
          </h2>
          <p className="text-base text-[#5A4543] leading-relaxed">
            Browse our curated collection of bridal compositions, delicate Arabic lines, traditional Indian motifs, and hands-on academy practice.
          </p>
          <div className="mt-6">
            <OrnamentalDivider />
          </div>
        </div>

        {/* Category Filter Tabs (Segmented interactive buttons per design guidelines) */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#FFFDFB] rounded-full border border-[#EADBCE] shadow-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#6D182B] text-[#FFFDFB] shadow-xs'
                    : 'text-[#6A5754] hover:text-[#2D1D1E] hover:bg-[#F6ECE8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#FFFDFB] border border-[#EADBCE] shadow-[0_2px_10px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_28px_rgba(44,24,16,0.12)] transition-all duration-300"
            >
              <div className="aspect-[4/3] sm:aspect-square overflow-hidden bg-[#F2ECE3] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-[#50101E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <span className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-medium text-[#DFC493]">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-white leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Caption below image */}
              <div className="p-4 bg-[#FFFDFB] border-t border-[#F2ECE3]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[11px] font-medium text-[#8C6D62]">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-[#C59D5F] flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" /> View
                  </span>
                </div>
                <p className="font-serif text-base text-[#4A0E1B] font-medium truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D1D1E]/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#FFFDFB] rounded-2xl overflow-hidden max-w-3xl w-full border border-[#EADBCE] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A0E1B] transition-colors shadow-md"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] overflow-hidden bg-[#FAF7F2] flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#FFFDFB]">
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-[#8C6D62]">
                  <span className="font-semibold uppercase tracking-wider text-[#6D182B]">
                    {selectedItem.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Shivani Mehndi Artist</span>
                  <span aria-hidden="true">·</span>
                  <span>Gadchiroli</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E1B] mb-2 font-medium">
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-[#5A4543] mb-6 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#F2ECE3]">
                  <button
                    onClick={handleBookFromLightbox}
                    className="inline-flex items-center justify-center gap-2 bg-[#6D182B] hover:bg-[#50101E] text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#DFC493]" />
                    <span>Inquire for Similar Style</span>
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-xs uppercase tracking-wider font-semibold text-[#8C6D62] hover:text-[#4A0E1B] px-4 py-2"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
