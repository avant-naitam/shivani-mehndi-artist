import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Phone,
  MessageCircle,
  CalendarCheck,
  Check,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqData';
import { FAQCategory } from '../types';
import { BRAND } from '../data/content';
import { OrnamentalDivider, MandalaPattern } from './MehndiMotifs';

interface FAQProps {
  onOpenBooking?: (serviceType?: string) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(['course-curriculum', 'bridal-customization', 'booking-advance'])
  );

  // Filter items based on active category and search input
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        query === '' ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.highlights?.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredItems.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  const categories: { id: FAQCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'Courses', label: 'Courses & Training', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'Bridal Packages', label: 'Bridal Packages', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Booking Policies', label: 'Booking Policies', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'Stain & Care', label: 'Stain & Care', icon: <Clock className="w-4 h-4" /> },
  ];

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking('Bridal Mehndi');
    } else {
      const bookEl = document.getElementById('book');
      if (bookEl) {
        bookEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-[#FFFDFB] relative overflow-hidden border-b border-[#EADBCE]/70"
    >
      {/* Decorative Henna Watermark Mandalas */}
      <div className="absolute top-10 -right-24 text-[#C59D5F] pointer-events-none opacity-30">
        <MandalaPattern size={360} opacity={0.06} />
      </div>
      <div className="absolute bottom-10 -left-20 text-[#6D182B] pointer-events-none opacity-30">
        <MandalaPattern size={320} opacity={0.05} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6ECE8] text-[#6D182B] text-xs font-semibold uppercase tracking-[0.2em] border border-[#EADBCE] mb-3.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C59D5F]" />
            <span>CLEAR ANSWERS & GUIDANCE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-[#5A4543] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our structured mehndi training, bridal packages, booking guidelines, and natural stain longevity in Gadchiroli.
          </p>

          <div className="mt-5">
            <OrnamentalDivider />
          </div>
        </div>

        {/* Search & Category Controls Bar */}
        <div className="mb-10 space-y-5">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8C6D62]">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., 'bridal deposit', 'course duration', 'organic cones')..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:bg-[#FFFDFB] focus:outline-none text-sm text-[#2D1D1E] shadow-2xs transition-all placeholder:text-[#9E837D]"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C6D62] hover:text-[#4A0E1B] cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'All'
                  ? FAQ_ITEMS.length
                  : FAQ_ITEMS.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#6D182B] text-[#FFFDFB] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5A4543] hover:text-[#6D182B] border border-[#EADBCE] hover:border-[#C59D5F]'
                  }`}
                >
                  <span className={isActive ? 'text-[#DFC493]' : 'text-[#8C6D62]'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#50101E] text-[#FFFDFB]'
                        : 'bg-[#EADBCE]/60 text-[#7A6461]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Actions & Result Count Header */}
          <div className="flex items-center justify-between text-xs text-[#7A6461] px-1 pt-1">
            <span>
              Showing <strong className="text-[#4A0E1B]">{filteredItems.length}</strong>{' '}
              {filteredItems.length === 1 ? 'question' : 'questions'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={expandAll}
                className="text-[#6D182B] hover:underline font-medium cursor-pointer"
              >
                Expand all
              </button>
              <span>·</span>
              <button
                onClick={collapseAll}
                className="text-[#7A6461] hover:text-[#4A0E1B] hover:underline font-medium cursor-pointer"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* Accordion FAQ List */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#EADBCE] p-10 text-center max-w-xl mx-auto">
            <HelpCircle className="w-10 h-10 text-[#C59D5F] mx-auto mb-3 opacity-70" />
            <h3 className="font-serif text-lg text-[#4A0E1B] font-medium mb-1">
              No matching questions found
            </h3>
            <p className="text-xs text-[#5A4543] mb-4">
              We couldn't find any questions matching "{searchQuery}". Try searching with a different term or contact Shivani directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#6D182B] text-[#FFFDFB] text-xs font-semibold uppercase tracking-wider hover:bg-[#50101E] transition-colors cursor-pointer"
            >
              View All Questions
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredItems.map((item, index) => {
              const isOpen = openItems.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#FAF7F2] border-[#C59D5F] shadow-xs'
                      : 'bg-[#FFFDFB] border-[#EADBCE] hover:border-[#C59D5F]/60'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D182B]"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <span className="w-6 h-6 rounded-full bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center font-serif text-xs font-semibold shrink-0 mt-0.5 border border-[#EADBCE]">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C59D5F] block mb-0.5">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#4A0E1B] font-medium leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#6D182B] text-[#FFFDFB]'
                          : 'bg-[#FAF7F2] text-[#6D182B] border border-[#EADBCE]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#5A4543] leading-relaxed border-t border-[#EADBCE]/50"
                    >
                      <p className="mb-4">{item.answer}</p>

                      {/* Highlights / Key takeaways */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="bg-[#FFFDFB] rounded-xl p-3.5 border border-[#EADBCE]/80 space-y-2">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6D182B]">
                            Key Takeaways:
                          </p>
                          <ul className="space-y-1.5">
                            {item.highlights.map((highlight, hIdx) => (
                              <li
                                key={hIdx}
                                className="flex items-start gap-2 text-xs text-[#5A4543]"
                              >
                                <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions? Supportive CTA Card */}
        <div className="mt-14 bg-gradient-to-br from-[#FAF7F2] via-[#FFFDFB] to-[#F6ECE8] rounded-3xl border border-[#EADBCE] p-7 sm:p-9 shadow-xs text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E1B] font-medium mb-2">
              Have a Specific Requirement or Custom Request?
            </h3>
            <p className="text-sm text-[#5A4543] max-w-xl mx-auto mb-6 leading-relaxed">
              Whether you need customized bridal dates, family group coordination, or specific course timings, Shivani is here to help you directly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Call Directly */}
              <a
                href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#DFC493]" />
                <span>Call {BRAND.phoneDisplay}</span>
              </a>

              {/* WhatsApp Message */}
              <a
                href={`https://wa.me/91${BRAND.phone}?text=Hello%20Shivani%2C%20I%20have%20a%20question%20regarding%20mehndi%20services%20and%20courses.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Book Directly */}
              <button
                onClick={handleBookingClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFFDFB] hover:bg-[#FAF7F2] text-[#4A0E1B] text-xs font-semibold uppercase tracking-wider border border-[#EADBCE] hover:border-[#C59D5F] shadow-2xs transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#C59D5F]" />
                <span>Book Service Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
