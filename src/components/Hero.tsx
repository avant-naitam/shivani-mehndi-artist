import React from 'react';
import { ArrowRight, Calendar, Sparkles, MapPin } from 'lucide-react';
import { BRAND, IMAGES } from '../data/content';
import { MandalaPattern, OrnamentalDivider } from './MehndiMotifs';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreCourses }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF7F2]">
      {/* Subtle background ambient mandalas */}
      <div className="absolute -top-10 -right-10 text-[#C59D5F] hidden md:block">
        <MandalaPattern size={360} opacity={0.06} />
      </div>
      <div className="absolute bottom-4 left-4 text-[#6D182B] hidden lg:block">
        <MandalaPattern size={280} opacity={0.04} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Eyebrow text (strict prompt requirement) */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-6 bg-[#C59D5F]" />
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#6D182B]">
                MEHNDI ART & TRAINING
              </p>
            </div>

            {/* Main Heading (strict prompt requirement) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#4A0E1B] leading-[1.12] tracking-tight mb-3">
              Shivani Mehndi Artist
            </h1>

            {/* Large Supporting Heading (strict prompt requirement) */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#7E2638] font-normal italic leading-snug mb-5">
              Basic to Advanced Mehndi Course
            </h2>

            {/* Description (strict prompt requirement) */}
            <p className="text-base sm:text-lg text-[#5A4543] leading-relaxed max-w-2xl mb-8">
              Learn mehndi from basic to advanced level through hands-on practice and creative designs, while exploring beautiful mehndi styles for weddings and special occasions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-sm font-semibold tracking-wider uppercase px-7 py-4 rounded-full shadow-[0_4px_16px_rgba(109,24,43,0.25)] transition-all duration-200 border border-[#8E253A]"
              >
                <Calendar className="w-4 h-4 text-[#DFC493]" />
                <span>Book a Mehndi Service</span>
              </button>

              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2 bg-[#FFFDFB] hover:bg-[#F6ECE8] active:scale-[0.98] text-[#50101E] text-sm font-semibold tracking-wider uppercase px-6 py-4 rounded-full border border-[#E0D2C8] hover:border-[#C59D5F] shadow-xs transition-all duration-200"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-[#C59D5F]" />
              </button>
            </div>

            {/* Discrete Trust Metadata - Gadchiroli Studio */}
            <div className="pt-6 border-t border-[#EADBCE]/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A6461]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C59D5F]" />
                <span className="font-medium text-[#4A3B39]">Gadchiroli, Maharashtra</span>
              </div>
              <span className="hidden sm:inline text-[#D9C8BE]" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C59D5F]" />
                <span>Hands-on Practical Training</span>
              </div>
              <span className="hidden sm:inline text-[#D9C8BE]" aria-hidden="true">·</span>
              <div>
                <span>Weddings & Special Occasions</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Editorial High-Quality Photographic Composition) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame accent */}
              <div className="absolute -inset-3 rounded-2xl border border-[#C59D5F]/30 pointer-events-none transform -rotate-1 hidden sm:block" />
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#6D182B]/5 to-[#C59D5F]/10 blur-xl pointer-events-none" />

              {/* Main Editorial Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(44,24,16,0.12)] border border-[#EADBCE] bg-[#FFFDFB] aspect-[4/3] sm:aspect-[4/3]">
                <img
                  src={IMAGES.hero}
                  alt="Intricate bridal and celebratory mehndi henna art by Shivani Mehndi Artist"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                
                {/* Subtle bottom gradient for editorial touch */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#50101E]/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 bg-[#FFFDFB]/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-[#EADBCE]/80 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6D182B]">
                      Artistry & Training
                    </p>
                    <p className="font-serif text-sm font-medium text-[#2D1D1E]">
                      Traditional to Contemporary Styles
                    </p>
                  </div>
                  <span className="text-xs font-serif italic text-[#C59D5F]">Gadchiroli</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Decorative Divider */}
      <div className="mt-14 max-w-3xl mx-auto px-4">
        <OrnamentalDivider />
      </div>
    </section>
  );
};
