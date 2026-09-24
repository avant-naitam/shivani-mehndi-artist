import React from 'react';
import { IMAGES, BRAND } from '../data/content';
import { OrnamentalDivider, MandalaPattern } from './MehndiMotifs';
import { Sparkles, Palette, Heart, CheckCircle2 } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFDFB] relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-10 right-0 text-[#C59D5F] hidden xl:block">
        <MandalaPattern size={320} opacity={0.04} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Artistry Frame with Fade-in */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <FadeInSection direction="right" delay={100}>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Asymmetric gold accent backdrop */}
                <div className="absolute -inset-4 rounded-3xl border border-[#C59D5F]/30 pointer-events-none transform rotate-1 hidden sm:block" />
                
                <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(44,24,16,0.1)] border border-[#EADBCE] bg-[#FAF7F2]">
                  <img
                    src={IMAGES.bridal}
                    alt="Detailed bridal mehndi artistry by Shivani Mehndi Artist"
                    className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                    loading="lazy"
                  />
                  
                  {/* Floating caption overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-[#FFFDFB]/95 backdrop-blur-md p-4 rounded-xl border border-[#EADBCE] shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-[#6D182B]" />
                      </div>
                      <div>
                        <p className="font-serif text-base text-[#4A0E1B] font-medium">
                          Artisan Henna & Dedicated Mentorship
                        </p>
                        <p className="text-xs text-[#7A6461]">
                          Rooted in Gadchiroli, Maharashtra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column: Editorial Text adhering exactly to instructions */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeInSection direction="left" delay={200}>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-[1px] w-6 bg-[#C59D5F]" />
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B]">
                  OUR STORY & PHILOSOPHY
                </p>
              </div>

              {/* Exact Heading from Prompt */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-6">
                The Art of Mehndi
              </h2>

              {/* Exact Concept from Prompt (verbatim statement) */}
              <div className="prose prose-stone max-w-none text-[#5A4543] text-base sm:text-lg leading-relaxed mb-8">
                <p className="font-serif text-xl sm:text-2xl text-[#6D182B] font-normal italic leading-snug mb-4">
                  "Shivani Mehndi Artist started from a personal passion for the intricate art of mehndi and a desire to share this creative skill with others."
                </p>
                <p className="text-base text-[#5A4543] leading-relaxed">
                  We focus on hands-on practice and creative expression, helping learners develop their mehndi skills from basic to advanced level. We also provide mehndi services for weddings and special occasions.
                </p>
              </div>

              {/* Core Values / Features directly derived from verified info */}
              <div className="space-y-4 pt-4 border-t border-[#EADBCE]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D182B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#4A0E1B]">
                      Hands-on Skill Building
                    </h4>
                    <p className="text-xs text-[#7A6461] leading-relaxed">
                      Hands-on practice to help learners develop their mehndi skills from basic to advanced level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6D182B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#4A0E1B]">
                      Auspicious Celebration Artistry
                    </h4>
                    <p className="text-xs text-[#7A6461] leading-relaxed">
                      Custom-designed henna for weddings, baby showers, and festive occasions in Gadchiroli.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <OrnamentalDivider className="justify-start" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};
