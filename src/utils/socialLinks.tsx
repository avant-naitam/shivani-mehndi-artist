import React from 'react';

export const SOCIAL_LINKS = {
  instagram: {
    label: 'Instagram',
    webUrl: 'https://www.instagram.com/shivani__mehandi__artist/',
    appScheme: 'instagram://user?username=shivani__mehandi__artist',
    handle: '@shivani__mehandi__artist',
  },
  whatsapp: {
    label: 'WhatsApp',
    phone: '+91 7588018033',
    rawPhone: '917588018033',
    webUrl: 'https://wa.me/917588018033',
    appScheme: 'whatsapp://send?phone=917588018033',
  },
};

/**
 * Handles app-first navigation on mobile devices with fallback to web browser.
 * On desktop, it falls back to native browser new-tab navigation.
 */
export const openInstagramAppOrWeb = (e?: React.MouseEvent) => {
  if (typeof window === 'undefined') return;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    if (e) e.preventDefault();
    const startTime = Date.now();
    window.location.href = SOCIAL_LINKS.instagram.appScheme;
    setTimeout(() => {
      // If user did not switch to the Instagram app (document is still visible)
      if (!document.hidden && Date.now() - startTime < 1800) {
        window.open(SOCIAL_LINKS.instagram.webUrl, '_blank', 'noopener,noreferrer');
      }
    }, 600);
  }
};

export const openWhatsAppAppOrWeb = (e?: React.MouseEvent) => {
  if (typeof window === 'undefined') return;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    if (e) e.preventDefault();
    const startTime = Date.now();
    window.location.href = SOCIAL_LINKS.whatsapp.appScheme;
    setTimeout(() => {
      // If user did not switch to the WhatsApp app
      if (!document.hidden && Date.now() - startTime < 1800) {
        window.open(SOCIAL_LINKS.whatsapp.webUrl, '_blank', 'noopener,noreferrer');
      }
    }, 600);
  }
};

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105 cursor-pointer ${className}`}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 0 000-2.881z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`transition-transform duration-300 ease-out hover:scale-105 group-hover:scale-105 cursor-pointer ${className}`}
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.13.17 1.76 2.68 4.26 3.75.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
  </svg>
);

export const GoogleMapsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    fill="none"
  >
    {/* Base Red Pin */}
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="#EA4335"
    />
    {/* Left Yellow Wing */}
    <path
      d="M5 9c0 2.2.74 4.23 2 5.86L12 9l-4.5-4.5C6.1 5.7 5 7.2 5 9z"
      fill="#FBBC04"
    />
    {/* Right Blue Wing */}
    <path
      d="M19 9c0 2.2-.74 4.23-2 5.86L12 9l4.5-4.5C17.9 5.7 19 7.2 19 9z"
      fill="#4285F4"
    />
    {/* Bottom Green Tip */}
    <path
      d="M7 14.86L12 22l5-7.14H7z"
      fill="#34A853"
    />
    {/* Center Cutout */}
    <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
  </svg>
);
