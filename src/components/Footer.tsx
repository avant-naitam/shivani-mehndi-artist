import React from 'react';
import { Phone, Instagram, MapPin, Heart, Shield } from 'lucide-react';
import { BRAND } from '../data/content';
import { OrnamentalDivider } from './MehndiMotifs';
import {
  InstagramIcon,
  WhatsAppIcon,
  SOCIAL_LINKS,
  openInstagramAppOrWeb,
  openWhatsAppAppOrWeb,
} from '../utils/socialLinks';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Courses', href: '#courses' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2D1D1E] text-[#EADBCE] pt-16 pb-12 border-t border-[#50101E] relative overflow-hidden">
      {/* Decorative hairline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#50101E]">
          {/* Brand Info Column */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <h3 className="font-serif text-3xl font-medium text-[#FFFDFB] tracking-wide">
              {BRAND.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#DFC493] font-semibold">
              {BRAND.tagline}
            </p>
            <p className="text-sm text-[#D1C2BA] leading-relaxed max-w-sm">
              Dedicated to the art of henna craftsmanship, offering hands-on training and exquisite occasion mehndi in Gadchiroli.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#DFC493] pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{BRAND.location}, Maharashtra</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFDFB]">
              Quick Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#D1C2BA]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-[#FFFDFB] transition-colors focus-visible:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 lg:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFDFB]">
              Connect & Inquire
            </p>
            <div className="space-y-2.5 text-sm text-[#D1C2BA]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DFC493] shrink-0" />
                <span>
                  Phone: <a href={`tel:${BRAND.phone}`} className="hover:text-[#FFFDFB] underline underline-offset-2">{BRAND.phone}</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#DFC493] shrink-0 transition-transform duration-300 ease-out hover:scale-105 cursor-pointer" />
                <span>
                  Instagram: <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#FFFDFB] underline underline-offset-2">{BRAND.instagramHandle}</a>
                </span>
              </div>

              {/* Quick Social Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 transition-transform duration-300 hover:scale-105 origin-left">
                <a
                  href={SOCIAL_LINKS.whatsapp.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openWhatsAppAppOrWeb}
                  className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-transform duration-300 hover:scale-105 cursor-pointer"
                  aria-label="WhatsApp (+91 7588018033)"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openInstagramAppOrWeb}
                  className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 active:scale-[0.98] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-transform duration-300 hover:scale-105 cursor-pointer"
                  aria-label="Instagram (@shivani__mehandi__artist)"
                >
                  <InstagramIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>Instagram</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-[#DFC493]/80 hover:text-[#DFC493] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal / Review Bookings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8984]">
          <p>© {currentYear} {BRAND.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-[#DFC493] fill-[#DFC493]" /> for {BRAND.location}
          </p>
        </div>
      </div>
    </footer>
  );
};
