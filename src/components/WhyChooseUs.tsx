import React from 'react';
import { Sparkles, GraduationCap, Palette, HeartHandshake } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';
import { OrnamentalDivider } from './MehndiMotifs';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#6D182B]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#6D182B]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#6D182B]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#6D182B]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#6D182B]" />;
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FFFDFB] border-y border-[#EADBCE]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
            WHY SHIVANI MEHNDI ARTIST
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Dedicated Craft & Personalized Learning
          </h2>
          <p className="text-base text-[#5A4543] leading-relaxed">
            Experience our commitment to authentic henna craftsmanship and hands-on skill development in Gadchiroli.
          </p>
          <div className="mt-6">
            <OrnamentalDivider />
          </div>
        </div>

        {/* 4 Supported Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="bg-[#FAF7F2] p-7 rounded-2xl border border-[#EADBCE] hover:border-[#C59D5F] shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F6ECE8] flex items-center justify-center mb-5 border border-[#EADBCE]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif text-xl text-[#4A0E1B] font-medium mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5A4543] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EADBCE]/80 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6D182B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59D5F]" />
                <span>Gadchiroli</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
