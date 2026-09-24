import React from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceType } from '../types';
import { OrnamentalDivider } from './MehndiMotifs';
import { FadeInSection } from './FadeInSection';

interface ServicesProps {
  onBookService: (serviceType: ServiceType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Fade-in */}
        <FadeInSection>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
              CELEBRATORY ARTISTRY
            </p>
            {/* Exact Heading from Prompt */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
              Mehndi Services
            </h2>
            <p className="text-base sm:text-lg text-[#5A4543] leading-relaxed">
              Mehndi services for weddings, bridal occasions, engagements, baby showers, and other special occasions in Gadchiroli.
            </p>
            <div className="mt-6">
              <OrnamentalDivider />
            </div>
          </div>
        </FadeInSection>

        {/* Service Cards Grid with Staggered Fade-in */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <FadeInSection
              key={service.id}
              delay={index * 120}
              className="h-full flex"
            >
              <div className="w-full bg-[#FFFDFB] rounded-2xl overflow-hidden border border-[#EADBCE] shadow-[0_2px_12px_rgba(44,24,16,0.04)] hover:shadow-[0_12px_30px_rgba(44,24,16,0.09)] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F2ECE3]">
                    <img
                      src={service.image}
                      alt={`${service.title} by Shivani Mehndi Artist`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#50101E]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider text-[#6D182B] border border-[#EADBCE]">
                      {service.title}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-serif text-2xl text-[#4A0E1B] font-medium mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#5A4543] leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-[#F2ECE3]">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-[#7A6461]">
                          <Sparkles className="w-3 h-3 text-[#C59D5F]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button: Book Now */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => onBookService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#6D182B] text-[#6D182B] hover:text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold py-3 px-4 rounded-xl border border-[#EADBCE] hover:border-[#6D182B] transition-all duration-200 group/btn shadow-2xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C59D5F] group-hover/btn:text-[#DFC493]" />
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
