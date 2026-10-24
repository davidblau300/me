import type { WeatherIcon } from '../weather/forecast';

// Original Mickey-inspired drawings (no Disney artwork). Trusted constants only — inserted via innerHTML.
export const MOUSE_SVG = `<svg class="mouse" viewBox="0 0 40 52" aria-hidden="true">
<path d="M27 36 C 36 38, 38 30, 35 26" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round"/>
<line x1="17" y1="40" x2="16" y2="46" stroke="#111" stroke-width="2.4" stroke-linecap="round"/>
<line x1="23" y1="40" x2="24" y2="46" stroke="#111" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="14.5" cy="47.5" rx="4.5" ry="2.6" fill="#ffcc00" stroke="#111" stroke-width="1"/>
<ellipse cx="25.5" cy="47.5" rx="4.5" ry="2.6" fill="#ffcc00" stroke="#111" stroke-width="1"/>
<ellipse cx="20" cy="33" rx="7" ry="6.5" fill="#111"/>
<rect x="13" y="33" width="14" height="8" rx="3.5" fill="#e3191b"/>
<ellipse cx="17.5" cy="36" rx="1" ry="1.6" fill="#fff"/>
<ellipse cx="22.5" cy="36" rx="1" ry="1.6" fill="#fff"/>
<line x1="27" y1="31" x2="31" y2="36" stroke="#111" stroke-width="2" stroke-linecap="round"/>
<circle cx="32" cy="37" r="2.6" fill="#fff" stroke="#111" stroke-width="1"/>
<g class="wave">
<line x1="13" y1="31" x2="8" y2="25" stroke="#111" stroke-width="2" stroke-linecap="round"/>
<circle cx="7.5" cy="24" r="2.6" fill="#fff" stroke="#111" stroke-width="1"/>
</g>
<circle cx="9.5" cy="8" r="6.5" fill="#111"/>
<circle cx="30.5" cy="8" r="6.5" fill="#111"/>
<circle cx="20" cy="17" r="9.5" fill="#111"/>
<ellipse cx="20" cy="20" rx="7" ry="5.8" fill="#f8dcc4"/>
<ellipse cx="17.6" cy="16.5" rx="1.1" ry="2" fill="#111"/>
<ellipse cx="22.4" cy="16.5" rx="1.1" ry="2" fill="#111"/>
<ellipse cx="20" cy="20.3" rx="1.7" ry="1.3" fill="#111"/>
<path d="M16.8 22.3 Q20 25.2 23.2 22.3" fill="none" stroke="#111" stroke-width="1" stroke-linecap="round"/>
</svg>`;

export const FAB_SVG = `<svg viewBox="0 0 92 82" aria-hidden="true"><circle cx="18" cy="20" r="16" fill="#111"/><circle cx="74" cy="20" r="16" fill="#111"/><circle cx="46" cy="49" r="31" fill="#e3191b"/><path d="M46 35 V63 M32 49 H60" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`;

// Arrow pointing right: "back" in a right-to-left layout.
export const BACK_ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const MOUSE_HEAD_SVG = `<svg viewBox="0 0 92 82" aria-hidden="true"><circle cx="18" cy="20" r="16" fill="#111"/><circle cx="74" cy="20" r="16" fill="#111"/><circle cx="46" cy="49" r="31" fill="#111"/><ellipse cx="46" cy="56" rx="20" ry="17" fill="#f8dcc4"/><ellipse cx="39" cy="44" rx="3" ry="5" fill="#111"/><ellipse cx="53" cy="44" rx="3" ry="5" fill="#111"/><ellipse cx="46" cy="56" rx="5" ry="3.6" fill="#111"/><path d="M37 62 Q46 70 55 62" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round"/></svg>`;

// Original sailor-duck mascot (Donald-inspired colors only, no Disney artwork).
export const DUCK_SVG = `<svg class="duck" viewBox="0 0 64 70" aria-hidden="true">
<ellipse cx="32" cy="16" rx="17" ry="8" fill="#2f6fd6"/>
<rect x="15" y="17" width="34" height="7" rx="3.5" fill="#1d3f8a"/>
<path d="M47 21 L55 29 M47 21 L53 31" stroke="#1d3f8a" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="32" cy="36" r="15" fill="#fff" stroke="#1d3f8a" stroke-width="1.6"/>
<ellipse cx="27" cy="32" rx="1.9" ry="3" fill="#111"/>
<ellipse cx="37" cy="32" rx="1.9" ry="3" fill="#111"/>
<ellipse cx="32" cy="43" rx="10.5" ry="4.6" fill="#ffb21a" stroke="#c97c00" stroke-width="1"/>
<ellipse cx="32" cy="46.5" rx="7" ry="2.8" fill="#f29a00"/>
<path d="M22 56 L32 60.5 L22 65 Z M42 56 L32 60.5 L42 65 Z" fill="#e3191b"/>
<circle cx="32" cy="60.5" r="2.6" fill="#b5121b"/>
</svg>`;

export const DUCK_FAB_SVG = `<svg viewBox="0 0 92 82" aria-hidden="true"><ellipse cx="46" cy="14" rx="26" ry="11" fill="#2f6fd6"/><rect x="20" y="16" width="52" height="9" rx="4.5" fill="#1d3f8a"/><circle cx="46" cy="50" r="30" fill="#2f6fd6" stroke="#1d3f8a" stroke-width="3"/><path d="M46 36 V64 M32 50 H60" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`;

// Original tall-hat dog mascot (Goofy-inspired colors only, no Disney artwork).
export const GOOFY_SVG = `<svg class="goofy" viewBox="0 0 64 78" aria-hidden="true">
<path d="M20 26 L23 4 Q32 0 41 4 L44 26 Z" fill="#3f9b45" stroke="#1f5e2a" stroke-width="1.6"/>
<rect x="20" y="20" width="24" height="5" fill="#111"/>
<ellipse cx="32" cy="27" rx="20" ry="4" fill="#3f9b45" stroke="#1f5e2a" stroke-width="1.6"/>
<path d="M14 32 Q4 44 9 60 Q14 62 17 56 Q15 44 20 36 Z" fill="#111"/>
<path d="M50 32 Q60 44 55 60 Q50 62 47 56 Q49 44 44 36 Z" fill="#111"/>
<ellipse cx="32" cy="42" rx="14" ry="13" fill="#111"/>
<ellipse cx="32" cy="50" rx="11" ry="9" fill="#f6d5b5"/>
<ellipse cx="27" cy="38" rx="4" ry="5" fill="#fff"/>
<ellipse cx="37" cy="38" rx="4" ry="5" fill="#fff"/>
<circle cx="28" cy="39" r="1.8" fill="#111"/>
<circle cx="36" cy="39" r="1.8" fill="#111"/>
<ellipse cx="32" cy="47" rx="4.5" ry="3" fill="#111"/>
<path d="M25 53 Q32 59 39 53" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round"/>
<rect x="29.5" y="54.5" width="5" height="4" rx="1" fill="#fff" stroke="#111" stroke-width=".8"/>
<path d="M18 66 Q32 60 46 66 L48 78 L16 78 Z" fill="#f47b20"/>
</svg>`;

const SUN = '<circle cx="24" cy="24" r="9" fill="#ffc21a"/><g stroke="#ffc21a" stroke-width="3" stroke-linecap="round"><path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.6 10.6l4.2 4.2M33.2 33.2l4.2 4.2M10.6 37.4l4.2-4.2M33.2 14.8l4.2-4.2"/></g>';
const CLOUD = '<path d="M14 36h22a8 8 0 0 0 0-16 11 11 0 0 0-21-2 8 8 0 0 0-1 18z" fill="#fff" stroke="#5b6f86" stroke-width="2.4" stroke-linejoin="round"/>';
const SMALL_SUN = '<circle cx="15" cy="16" r="7" fill="#ffc21a"/><g stroke="#ffc21a" stroke-width="2.4" stroke-linecap="round"><path d="M15 3v3M3 16h3M6.5 7.5l2 2M23.5 7.5l-2 2"/></g>';
const DROPS = '<g stroke="#2f6fd6" stroke-width="2.6" stroke-linecap="round"><path d="M17 40l-2 5M25 40l-2 5M33 40l-2 5"/></g>';

export const WEATHER_ICON_SVG: Record<WeatherIcon, string> = {
  sun: `<svg viewBox="0 0 48 48" aria-hidden="true">${SUN}</svg>`,
  partly: `<svg viewBox="0 0 48 48" aria-hidden="true">${SMALL_SUN}${CLOUD}</svg>`,
  cloud: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}</svg>`,
  fog: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}<g stroke="#8a9bb0" stroke-width="2.6" stroke-linecap="round"><path d="M10 41h28M14 46h20"/></g></svg>`,
  drizzle: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}<g stroke="#2f6fd6" stroke-width="2.2" stroke-linecap="round"><path d="M18 41l-1 3M28 41l-1 3"/></g></svg>`,
  rain: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}${DROPS}</svg>`,
  snow: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}<g fill="#7fb2f0"><circle cx="17" cy="42" r="2"/><circle cx="25" cy="44" r="2"/><circle cx="33" cy="42" r="2"/></g></svg>`,
  storm: `<svg viewBox="0 0 48 48" aria-hidden="true">${CLOUD}<path d="M26 36l-5 7h5l-3 5 8-8h-5l3-4z" fill="#ffc21a" stroke="#c97c00" stroke-width="1"/></svg>`,
};

// Original mouse-with-bow mascot (Minnie-inspired colors only, no Disney artwork).
export const MINNIE_SVG = `<svg class="minnie" viewBox="0 0 92 86" aria-hidden="true">
<circle cx="18" cy="26" r="16" fill="#111"/><circle cx="74" cy="26" r="16" fill="#111"/>
<circle cx="46" cy="54" r="30" fill="#111"/>
<ellipse cx="46" cy="61" rx="20" ry="17" fill="#f8dcc4"/>
<ellipse cx="39" cy="50" rx="3" ry="5" fill="#111"/><ellipse cx="53" cy="50" rx="3" ry="5" fill="#111"/>
<ellipse cx="46" cy="61" rx="5" ry="3.6" fill="#111"/>
<path d="M37 67 Q46 75 55 67" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round"/>
<path d="M46 20 L22 6 Q16 20 22 34 Z M46 20 L70 6 Q76 20 70 34 Z" fill="#e8318a" stroke="#a3125c" stroke-width="1.5"/>
<circle cx="46" cy="20" r="6" fill="#e8318a" stroke="#a3125c" stroke-width="1.5"/>
<g fill="#fff"><circle cx="27" cy="14" r="2.2"/><circle cx="25" cy="26" r="2.2"/><circle cx="33" cy="21" r="2"/><circle cx="65" cy="14" r="2.2"/><circle cx="67" cy="26" r="2.2"/><circle cx="59" cy="21" r="2"/></g>
</svg>`;

// Original duck-with-bow mascot (Daisy-inspired colors only, no Disney artwork).
export const DAISY_SVG = `<svg class="daisy" viewBox="0 0 72 74" aria-hidden="true">
<path d="M36 14 L14 4 Q8 16 14 28 Z M36 14 L58 4 Q64 16 58 28 Z" fill="#ff6fb0" stroke="#c23d80" stroke-width="1.5"/>
<circle cx="36" cy="14" r="6" fill="#b88cff" stroke="#6a3fb5" stroke-width="1.5"/>
<circle cx="36" cy="38" r="18" fill="#fff" stroke="#6a3fb5" stroke-width="1.6"/>
<ellipse cx="30" cy="34" rx="2.2" ry="3.4" fill="#111"/><ellipse cx="42" cy="34" rx="2.2" ry="3.4" fill="#111"/>
<path d="M26 29 l-3 -3 M28 28 l-1.5 -3.5 M46 29 l3 -3 M44 28 l1.5 -3.5" stroke="#111" stroke-width="1.4" stroke-linecap="round"/>
<ellipse cx="36" cy="46" rx="11" ry="5" fill="#ffb21a" stroke="#c97c00" stroke-width="1"/>
<ellipse cx="36" cy="49.5" rx="7.5" ry="3" fill="#f29a00"/>
<path d="M22 60 Q36 54 50 60 L52 74 L20 74 Z" fill="#b88cff"/>
</svg>`;
