import React from "react";

const SunIcon = ({ width = 24, height = 24 }) => {
  const uid = React.useId?.() ?? Math.random().toString(36).slice(2);

  const coreId   = `sun-core-${uid}`;
  const warmId   = `sun-warm-${uid}`;
  const hotId    = `sun-hot-${uid}`;
  const hlId     = `sun-hl-${uid}`;
  const glowId   = `sun-glow-${uid}`;
  const rayGrad  = `sun-ray-${uid}`;

  // Geometry (24×24)
  const cx = 12, cy = 12, r = 6;

  // Simple 8-ray star using thin triangles; sized to avoid clutter at 24px
  const Rays = () => (
    <g opacity="0.95">
      {/* N, NE, E, SE, S, SW, W, NW */}
      <path d="M12 1.5 L12.9 5.2 L11.1 5.2 Z" fill={`url(#${rayGrad})`} />            {/* N */}
      <path d="M18.6 5.4 L15.4 7.0 L16.5 5.0 Z" fill={`url(#${rayGrad})`} />          {/* NE */}
      <path d="M22.5 12 L18.8 12.9 L18.8 11.1 Z" fill={`url(#${rayGrad})`} />        {/* E */}
      <path d="M18.6 18.6 L16.5 19.0 L15.4 17.0 Z" fill={`url(#${rayGrad})`} />      {/* SE */}
      <path d="M12 22.5 L11.1 18.8 L12.9 18.8 Z" fill={`url(#${rayGrad})`} />        {/* S */}
      <path d="M5.4 18.6 L8.6 17.0 L7.5 19.0 Z" fill={`url(#${rayGrad})`} />         {/* SW */}
      <path d="M1.5 12 L5.2 11.1 L5.2 12.9 Z" fill={`url(#${rayGrad})`} />           {/* W */}
      <path d="M5.4 5.4 L7.5 5.0 L8.6 7.0 Z" fill={`url(#${rayGrad})`} />            {/* NW */}
    </g>
  );

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        {/* Warm core gradient (gold → orange) */}
        <radialGradient id={coreId} cx={cx} cy={cy} r={r + 2} gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fff7cc" />   {/* pale center */}
          <stop offset="55%" stopColor="#fcd34d" />   {/* golden */}
          <stop offset="100%" stopColor="#f59e0b" />  {/* amber edge */}
        </radialGradient>

        {/* Extra warmth (peach/pink) to match your moon’s warm layer */}
        <radialGradient id={warmId} cx={cx + 1.5} cy={cy + 1.5} r={r + 3} gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#ffd08a" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ff9fb0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff9fb0" stopOpacity="0" />
        </radialGradient>

        {/* Hot spot (slightly toward upper-left) */}
        <radialGradient id={hotId} cx={cx - 2} cy={cy - 2} r={r} gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {/* Small specular highlight */}
        <radialGradient id={hlId} cx={cx - 2.2} cy={cy - 2.6} r={r - 1.5} gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Rays gradient */}
        <linearGradient id={rayGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Outer glow (to match moon aura) */}
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow ring (soft, behind everything) */}
      <circle cx={cx} cy={cy} r={r + 1} fill="#fde68a" opacity="0.2" filter={`url(#${glowId})`} />

      {/* Rays */}
      <Rays />

      {/* Sun body (layered like your moon) */}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${coreId})`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${warmId})`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${hotId})`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${hlId})`} />

      {/* Optional micro-flecks for texture */}
      <g opacity="0.22" fill="#ffffff">
        <circle cx={cx + 2.5} cy={cy - 1.6} r="0.35" />
        <circle cx={cx - 0.8} cy={cy + 1.8} r="0.3" />
      </g>
    </svg>
  );
};

export default SunIcon;
