import React from "react";

const MoonIcon = ({ width = 24, height = 24 }) => {
  const uid = React.useId?.() ?? Math.random().toString(36).slice(2);

  // Moon IDs
  const baseId = `base-${uid}`;
  const warmId = `warm-${uid}`;
  const coolId = `cool-${uid}`;
  const hlId   = `hl-${uid}`;
  const glowId = `glow-${uid}`;

  // Cloud IDs
  const cBaseId = `c-base-${uid}`;
  const cWarmId = `c-warm-${uid}`;
  const cHlId   = `c-hl-${uid}`;
  const cRimId  = `c-rim-${uid}`;

  // Exact shapes you already use
  const moonD =
    "M18 11.79A7 7 0 1 1 10.21 4 5.5 5.5 0 0 0 18 11.79z";
  const cloudD =
    "M6 17c0-0.9 0.7-1.6 1.5-1.6 0.3-0.7 1-1.2 1.8-1.2 0.7 0 1.3 0.4 1.6 0.9 0.2-0.1 0.4-0.1 0.6-0.1 0.9 0 1.6 0.7 1.6 1.6 0 0.1 0 0.2 0 0.3h0.4c0.8 0 1.5 0.7 1.5 1.5s-0.7 1.5-1.5 1.5H7c-0.8 0-1.5-0.7-1.5-1.5 0-0.6 0.3-1.1 0.8-1.3C6.1 15.7 6 15.4 6 15z";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        {/* ------- Moon gradients (userSpaceOnUse keeps 24×24 coords) ------- */}
        <radialGradient id={baseId} cx="12" cy="12" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#a78bfa" />
          <stop offset="55%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#60a5fa" />
        </radialGradient>
        <radialGradient id={warmId} cx="12" cy="16" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fca5a5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={coolId} cx="8" cy="8" r="9.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#93c5fd" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={hlId} cx="9" cy="7" r="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Shared soft glow used for the moon’s aura */}
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b2" />
          <feMerge>
            <feMergeNode in="b1" />
            <feMergeNode in="b2" />
          </feMerge>
        </filter>

        {/* ---------------- Cloud gradients to match moon style -------------- */}
        {/* Cool, slightly bluish base */}
        <radialGradient id={cBaseId} cx="10" cy="15" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e5f0ff" />
          <stop offset="100%" stopColor="#c7e0ff" />
        </radialGradient>
        {/* Warm spill from the moon (assumes moon is above-right) */}
        <radialGradient id={cWarmId} cx="16" cy="16.5" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fde68a" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#fca5a5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        {/* Soft top-left highlight on cloud lobes */}
        <radialGradient id={cHlId} cx="8" cy="13" r="5.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        {/* Rim light stroke facing the moon side */}
        <linearGradient id={cRimId} x1="9" y1="18" x2="19" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fef3c7" stopOpacity="0" />
          <stop offset="55%" stopColor="#fde68a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* --------------------------- Moon --------------------------- */}
      <path d={moonD} fill="none" stroke="#7dd3fc" strokeWidth="1" opacity="0.25" filter={`url(#${glowId})`} />
      <path d={moonD} fill={`url(#${baseId})`} />
      <path d={moonD} fill={`url(#${warmId})`} />
      <path d={moonD} fill={`url(#${coolId})`} />
      <path d={moonD} fill={`url(#${hlId})`} />

      {/* --------------------------- Cloud -------------------------- */}
      {/* subtle glow beneath cloud so it sits in the same lighting world */}
      <path d={cloudD} fill="#7dd3fc" opacity="0.25" filter={`url(#${glowId})`} />
      {/* base + warm spill + highlight */}
      <path d={cloudD} fill={`url(#${cBaseId})`} />
      <path d={cloudD} fill={`url(#${cWarmId})`} />
      <path d={cloudD} fill={`url(#${cHlId})`} />
      {/* rim-lighted edge toward the moon, then a very light neutral outline */}
      <path d={cloudD} fill="none" stroke={`url(#${cRimId})`} strokeWidth="0.5" />
      <path d={cloudD} fill="none" stroke="#e6eefc" strokeOpacity="0.6" strokeWidth="0.25" />


            
      <g fill="#fbbf24">
          <path d="M14.5 3l0.6 1.2L16.5 4.8l-1.4 0.6L14.5 7l-0.6-1.4L12.5 4.8l1.4-0.6L14.5 3z"/>
          <path d="M15.5 9l0.4 0.8L16.5 10.2l-0.6 0.4L15.5 11.4l-0.4-0.8L14.5 10.2l0.6-0.4L15.5 9z"/>
      </g>
    </svg>
  );
};

export default MoonIcon;