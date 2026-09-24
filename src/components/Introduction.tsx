import React from 'react';
import { Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/content';

interface IntroductionProps {
  onOpenBooking: () => void;
  onExploreCourses: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onOpenBooking, onExploreCourses }) => {
  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#EADBCE]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6D182B] mb-2">
            Welcome to {BRAND.name}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A0E1B] leading-tight mb-4">
            Where Ancient Artistry Meets Dedicated Craft
          </h2>
          <p className="text-[#5A4543] text-base leading-relaxed">
            Based in Gadchiroli, Shivani Mehndi Artist offers mehndi services for weddings and special occasions, along with hands-on training for learners who want to develop their mehndi skills from basic to advanced level.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Courses */}
          <div className="bg-[#FFFDFB] p-7 rounded-xl border border-[#EADBCE] shadow-[0_2px_12px_rgba(44,24,16,0.03)] hover:shadow-[0_6px_20px_rgba(44,24,16,0.08)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-[#6D182B]" />
              </div>
              <h3 className="font-serif text-xl text-[#4A0E1B] mb-2.5 font-medium">
                Mehndi Training Courses
              </h3>
              <p className="text-sm text-[#5A4543] leading-relaxed mb-4">
                Structured hands-on practice starting from cone preparation to complex bridal, animal, and traditional figures.
              </p>
            </div>
            <button
              onClick={onExploreCourses}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#6D182B] hover:text-[#50101E] pt-2"
            >
              <span>Explore Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Occasion Services */}
          <div className="bg-[#FFFDFB] p-7 rounded-xl border border-[#EADBCE] shadow-[0_2px_12px_rgba(44,24,16,0.03)] hover:shadow-[0_6px_20px_rgba(44,24,16,0.08)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 text-[#6D182B]" />
              </div>
              <h3 className="font-serif text-xl text-[#4A0E1B] mb-2.5 font-medium">
                Occasion & Bridal Services
              </h3>
              <p className="text-sm text-[#5A4543] leading-relaxed mb-4">
                Mehndi services for brides, weddings, engagements, baby showers, and other special occasions.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#6D182B] hover:text-[#50101E] pt-2"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: Creative Artistry */}
          <div className="bg-[#FFFDFB] p-7 rounded-xl border border-[#EADBCE] shadow-[0_2px_12px_rgba(44,24,16,0.03)] hover:shadow-[0_6px_20px_rgba(44,24,16,0.08)] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#6D182B]" />
              </div>
              <h3 className="font-serif text-xl text-[#4A0E1B] mb-2.5 font-medium">
                Artistic Craft & Precision
              </h3>
              <p className="text-sm text-[#5A4543] leading-relaxed mb-4">
                Harmonious balance of traditional Indian jaal work, flowing Arabic trails, and intricate symbolic elements.
              </p>
            </div>
            <a
              href="#gallery"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#6D182B] hover:text-[#50101E] pt-2"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
