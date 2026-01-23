import React from "react";

// SVG logo igual ao print fornecido
export default function LogoMC() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="12" fill="url(#bg)"/>
      <text x="12" y="27" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">MC</text>
      <g>
        <g filter="url(#shadow)">
          <circle cx="34" cy="34" r="9" fill="#15608a"/>
        </g>
        <rect x="29.5" y="31" width="9" height="6" rx="2" fill="#fff"/>
        <rect x="32" y="34" width="4" height="2" rx="1" fill="#2196D3"/>
        <rect x="29.5" y="31" width="9" height="6" rx="2" fill="#fff" fillOpacity="0.15"/>
        <rect x="32" y="34" width="4" height="2" rx="1" fill="#2196D3" fillOpacity="0.2"/>
      </g>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2193b0"/>
          <stop offset="1" stopColor="#15608a"/>
        </linearGradient>
        <filter id="shadow" x="23" y="23" width="22" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>
    </svg>
  );
}
