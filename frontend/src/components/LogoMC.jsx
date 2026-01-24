import React from "react";

// SVG logo igual ao print fornecido
export default function LogoMC() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="12" fill="#2196D3"/>
      <text x="10" y="26" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">MC</text>
      <g>
        <circle cx="15" cy="32" r="8" fill="#fff" fillOpacity="0.9"/>
        <rect x="13" y="29" width="8" height="5" rx="1.5" fill="#2196D3"/>
        <rect x="15" y="31" width="4" height="1.5" rx="0.75" fill="#fff"/>
      </g>
    </svg>
  );
}
