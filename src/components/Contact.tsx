import React from 'react';
import { CalendarCheck, Navigation, ExternalLink } from 'lucide-react';
import { BRAND } from '../data/content';
import { OrnamentalDivider } from './MehndiMotifs';
import {
  InstagramIcon,
  WhatsAppIcon,
  GoogleMapsIcon,
  SOCIAL_LINKS,
  openInstagramAppOrWeb,
  openWhatsAppAppOrWeb,
} from '../utils/socialLinks';

interface ContactProps {
  onOpenBooking: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenBooking }) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
            GET IN TOUCH
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Let's Create Something Beautiful
          </h2>
          <p className="text-base text-[#5A4543] leading-relaxed">
            Reach out for course admissions, wedding bookings, or general inquiries in Gadchiroli.
          </p>
          <div className="mt-6">
            <OrnamentalDivider />
          </div>
        </div>

        {/* Business Details Card - Centered */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#FFFDFB] p-8 sm:p-10 rounded-2xl border border-[#EADBCE] shadow-xs space-y-6">
            <h3 className="font-serif text-2xl text-[#4A0E1B] font-medium border-b border-[#F2ECE3] pb-4 text-center sm:text-left">
              Studio Contact
            </h3>

            {/* Location (Gadchiroli Address & Get Directions) */}
            <div className="flex items-start gap-4">
              <div
                onClick={() => window.open('https://maps.app.goo.gl/49tExRoJa9nvtFaA7', '_blank', 'noopener,noreferrer')}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#EADBCE] shadow-2xs hover:shadow-xs transition-all duration-200 hover:scale-105 cursor-pointer"
                title="Open in Google Maps"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open('https://maps.app.goo.gl/49tExRoJa9nvtFaA7', '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <GoogleMapsIcon className="w-5 h-5" />
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D62] block mb-1">
                    Location
                  </span>
                  <p className="text-sm sm:text-base font-serif font-medium text-[#2D1D1E] leading-snug">
                    Reddy Godown Chowk, Potegav Bypass Road,<br />
                    Near Ashok Nete House, Gadchiroli
                  </p>
                </div>
                <div>
                  <a
                    href="https://maps.app.goo.gl/49tExRoJa9nvtFaA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F6ECE8] hover:bg-[#6D182B] text-[#6D182B] hover:text-white border border-[#EADBCE] hover:border-[#6D182B] text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer group"
                    aria-label="Get Directions on Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Button - Business Number: +91 7588018033 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#25D366]/40 hover:bg-[#F2FAF5]/60 transition-all duration-200">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs group cursor-pointer">
                  <WhatsAppIcon className="w-5 h-5 fill-current transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D62] block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="text-base font-medium text-[#2D1D1E] hover:text-[#128C7E] transition-colors"
                  >
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.whatsapp.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openWhatsAppAppOrWeb}
                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
                aria-label="Chat on WhatsApp (+91 7588018033)"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0 transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Instagram Button - Profile: shivani__mehandi__artist */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#E1306C]/40 hover:bg-[#FDF2F5]/60 transition-all duration-200">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0 shadow-2xs group cursor-pointer">
                  <InstagramIcon className="w-5 h-5 fill-current transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D62] block">
                    Instagram
                  </span>
                  <a
                    href={SOCIAL_LINKS.instagram.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openInstagramAppOrWeb}
                    className="text-xs sm:text-sm font-medium text-[#2D1D1E] hover:text-[#C13584] transition-colors break-all sm:break-normal"
                  >
                    {BRAND.instagramHandle}
                  </a>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.instagram.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openInstagramAppOrWeb}
                className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shrink-0"
                aria-label="Follow on Instagram (@shivani__mehandi__artist)"
              >
                <InstagramIcon className="w-4 h-4 fill-current shrink-0 transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Book a Mehndi Service CTA in Contact Section */}
            <div className="pt-4 border-t border-[#F2ECE3]">
              <p className="text-xs text-[#7A6461] mb-3 text-center sm:text-left">
                Ready to reserve for your upcoming wedding or occasion?
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold py-3.5 px-5 rounded-xl shadow-xs transition-all border border-[#8E253A] cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#DFC493]" />
                <span>Book a Mehndi Service</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
