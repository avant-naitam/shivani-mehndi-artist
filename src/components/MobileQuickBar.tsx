import React from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { BRAND } from '../data/content';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-[#FFFDFB]/95 backdrop-blur-md border-t border-[#EADBCE] p-3 px-4 shadow-[0_-4px_16px_rgba(44,24,16,0.08)]">
      <div className="flex items-center gap-3">
        <a
          href={`tel:${BRAND.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#F6ECE8] text-[#6D182B] text-xs font-semibold uppercase tracking-wider border border-[#EADBCE] active:bg-[#EADBCE]"
        >
          <Phone className="w-3.5 h-3.5 text-[#C59D5F]" />
          <span>Call Now</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#6D182B] text-[#FFFDFB] text-xs font-semibold uppercase tracking-wider shadow-xs active:bg-[#50101E]"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#DFC493]" />
          <span>Book Service</span>
        </button>
      </div>
    </div>
  );
};
