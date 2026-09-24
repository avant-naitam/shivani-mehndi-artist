import React from 'react';

export const MandalaPattern: React.FC<{ className?: string; size?: number; opacity?: number }> = ({
  className = '',
  size = 200,
  opacity = 0.08,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
    aria-hidden="true"
  >
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
    <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="0.8" />
    <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="1" />
    
    {/* 8-Petal Rosette */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M100 46 C94 62 94 76 100 88 C106 76 106 62 100 46 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M100 10 C92 28 92 38 100 46 C108 38 108 28 100 10 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="100" cy="24" r="1.5" fill="currentColor" />
        <circle cx="100" cy="70" r="1.2" fill="currentColor" />
      </g>
    ))}
  </svg>
);

export const OrnamentalDivider: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#C59D5F]/60" />
    <div className="flex items-center gap-1.5 text-[#C59D5F]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C59D5F]/80" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6D182B]">
        <path
          d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C59D5F]/80" />
    </div>
    <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#C59D5F]/60" />
    {label && <span className="sr-only">{label}</span>}
  </div>
);

export const PaisleyFlourish: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M50 15 C30 15 20 32 20 52 C20 72 35 85 52 85 C70 85 82 72 82 54 C82 32 64 24 50 15 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M50 30 C40 30 32 40 32 54 C32 65 40 73 50 73 C60 73 68 64 68 53 C68 40 58 35 50 30 Z"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="2 3"
    />
    <circle cx="50" cy="52" r="3" fill="currentColor" />
  </svg>
);
