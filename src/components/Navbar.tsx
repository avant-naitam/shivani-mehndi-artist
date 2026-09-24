import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { BRAND } from '../data/content';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenBooking: (serviceType?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(44,24,16,0.06)] border-b border-[#EADBCE]/80 py-3.5'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D182B]"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#50101E] group-hover:text-[#6D182B] transition-colors">
              {BRAND.name}
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8C6D62] font-medium -mt-0.5">
              {BRAND.tagline} · {BRAND.location}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-sm tracking-wider uppercase font-medium transition-all relative py-1 focus-visible:outline-none ${
                    isActive
                      ? 'text-[#6D182B] font-semibold'
                      : 'text-[#4A3B39] hover:text-[#6D182B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C59D5F] rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle, Call & Book Now CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <ThemeToggle />

            <a
              href={`tel:${BRAND.phone}`}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#6D182B] hover:text-[#50101E] px-3 py-2 rounded-md transition-colors"
              title={`Call ${BRAND.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C59D5F]" />
              <span>{BRAND.phoneDisplay}</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-[#8E253A]"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#DFC493]" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle, Book Button & Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden bg-[#6D182B] text-[#FFFDFB] text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#50101E] hover:bg-[#F2ECE3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D182B]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EADBCE] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left py-2 px-3 rounded-md text-sm uppercase tracking-wider font-medium text-[#4A3B39] hover:bg-[#F2ECE3] hover:text-[#6D182B] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#EADBCE] flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#EADBCE]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5A4543]">Theme Appearance</span>
                <ThemeToggle showLabel />
              </div>
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center justify-center gap-2 text-xs font-medium text-[#6D182B] bg-[#F6ECE8] py-2.5 rounded-lg border border-[#EADBCE]"
              >
                <Phone className="w-4 h-4 text-[#C59D5F]" />
                <span>Call {BRAND.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#6D182B] text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold py-3 rounded-lg shadow-sm"
              >
                Book a Mehndi Service
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
