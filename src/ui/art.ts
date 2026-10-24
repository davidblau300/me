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

// ── Princess-inspired symbols (original drawings; no Disney characters) ──

export const CROWN_SVG = `<svg class="crown" viewBox="0 0 40 26" aria-hidden="true"><path d="M3 23 L6 6 L14 14 L20 3 L26 14 L34 6 L37 23 Z" fill="#f5c242" stroke="#b8860b" stroke-width="1.6" stroke-linejoin="round"/><rect x="3" y="20" width="34" height="5" rx="2" fill="#e0a800"/><circle cx="20" cy="4" r="2.4" fill="#d62828"/><circle cx="6" cy="7" r="2" fill="#2b4aa0"/><circle cx="34" cy="7" r="2" fill="#2b4aa0"/></svg>`;

export const APPLE_FAB_SVG = `<svg class="apple" viewBox="0 0 92 82" aria-hidden="true"><path d="M46 24 C30 12 8 24 12 48 C16 70 34 82 46 76 C58 82 76 70 80 48 C84 24 62 12 46 24 Z" fill="#d62828" stroke="#9b1c1c" stroke-width="2.5"/><path d="M46 24 Q48 12 54 6" fill="none" stroke="#6b3e1d" stroke-width="4" stroke-linecap="round"/><ellipse cx="62" cy="13" rx="11" ry="5.5" transform="rotate(-30 62 13)" fill="#3c9a4a"/><path d="M46 38 V64 M33 51 H59" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`;

export const PRINCESS_CAL_FAB_SVG = `<svg viewBox="0 0 92 82" aria-hidden="true"><path d="M24 24 L28 5 L38 15 L46 1 L54 15 L64 5 L68 24 Z" fill="#f5c242" stroke="#b8860b" stroke-width="2" stroke-linejoin="round"/><circle cx="46" cy="52" r="29" fill="#6fa8dc" stroke="#3f6fae" stroke-width="3"/><path d="M46 38 V66 M32 52 H60" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`;

// Original cartoon princess portraits (hair, outfit and accessory colors only; no Disney artwork).
const SKIN = '#f9dcc4';
const PRINCESS_FACE = `<rect x="28" y="47" width="8" height="9" fill="${SKIN}"/>`;
const PRINCESS_FEATURES = `<ellipse cx="32" cy="35" rx="14.5" ry="15.5" fill="${SKIN}"/>`
  + '<ellipse cx="26.5" cy="36" rx="2.3" ry="3" fill="#2b1a10"/><ellipse cx="37.5" cy="36" rx="2.3" ry="3" fill="#2b1a10"/>'
  + '<circle cx="27.3" cy="35" r=".9" fill="#fff"/><circle cx="38.3" cy="35" r=".9" fill="#fff"/>'
  + '<ellipse cx="22.5" cy="41" rx="2.6" ry="1.6" fill="#f7a1a8" opacity=".75"/><ellipse cx="41.5" cy="41" rx="2.6" ry="1.6" fill="#f7a1a8" opacity=".75"/>'
  + '<path d="M28.5 43 Q32 46.5 35.5 43" fill="none" stroke="#b5544a" stroke-width="1.6" stroke-linecap="round"/>';

function princess(className: string, behind: string, outfit: string, front: string): string {
  return `<svg class="${className}" viewBox="0 0 64 72" aria-hidden="true">${behind}${PRINCESS_FACE}${outfit}${PRINCESS_FEATURES}${front}</svg>`;
}

export const SNOW_WHITE_SVG = princess('snow-white',
  '<path d="M12 36 Q10 14 32 12 Q54 14 52 36 L52 46 Q46 50 44 44 L20 44 Q18 50 12 46 Z" fill="#1b1b2f"/>',
  '<path d="M8 72 Q10 56 32 55 Q54 56 56 72 Z" fill="#2b4aa0"/><circle cx="13" cy="62" r="7" fill="#d62828"/><circle cx="51" cy="62" r="7" fill="#d62828"/>'
    + '<path d="M20 56 L24 47 L32 55 L40 47 L44 56 Q32 60 20 56 Z" fill="#fff" stroke="#c9ced8" stroke-width=".8"/>',
  '<path d="M17 32 Q18 17 32 16 Q46 17 47 32 Q42 24 34 24 Q28 22 17 32 Z" fill="#1b1b2f"/>'
    + '<path d="M16 25 Q32 10 48 25" fill="none" stroke="#d62828" stroke-width="3.5" stroke-linecap="round"/>'
    + '<path d="M45 17 L38 11 L38 22 Z M45 17 L52 11 L52 22 Z" fill="#d62828"/><circle cx="45" cy="16.5" r="2.4" fill="#a81c1c"/>');

export const CINDERELLA_SVG = princess('cinderella',
  '<ellipse cx="32" cy="31" rx="19" ry="19" fill="#f2cd6b"/><circle cx="32" cy="11" r="8" fill="#f2cd6b" stroke="#d9ac3e" stroke-width="1"/>',
  '<path d="M8 72 Q10 56 32 55 Q54 56 56 72 Z" fill="#9fd0f5"/><path d="M21 56 Q32 66 43 56 Z" fill="#f9dcc4"/>'
    + '<rect x="27" y="50.5" width="10" height="2.6" rx="1.2" fill="#1b1b2f"/>',
  '<path d="M17 31 Q17 17 32 16 Q47 17 47 30 Q40 20 30 22 Q22 24 17 31 Z" fill="#f2cd6b"/>'
    + '<path d="M17 24 Q32 12 47 24" fill="none" stroke="#6fb3e8" stroke-width="3.5" stroke-linecap="round"/>'
    + '<path d="M55 10 l1.4 3.4 l3.4 1.4 l-3.4 1.4 l-1.4 3.4 l-1.4 -3.4 l-3.4 -1.4 l3.4 -1.4 Z" fill="#9fd0f5"/>');

export const MERMAID_SVG = princess('mermaid',
  '<path d="M10 40 Q6 12 32 10 Q58 12 54 40 Q56 58 48 66 L44 50 L20 50 L16 66 Q8 58 10 40 Z" fill="#e0412e"/>',
  '<path d="M10 72 Q12 58 32 57 Q52 58 54 72 Z" fill="#f9dcc4"/>'
    + '<path d="M17 72 Q18 63 25 63 Q32 63 31 72 Z M33 72 Q32 63 39 63 Q46 63 47 72 Z" fill="#8a5cd6" stroke="#6a3fb5" stroke-width="1"/>',
  '<path d="M16 33 Q14 15 32 14 Q50 15 49 30 Q44 18 36 22 Q30 20 24 26 Q20 28 16 33 Z" fill="#e0412e"/>'
    + '<path d="M24 19 Q30 15 37 16" fill="none" stroke="#f47a5c" stroke-width="1.6" stroke-linecap="round"/>'
    + '<circle cx="56" cy="14" r="2.6" fill="none" stroke="#7fd3d0" stroke-width="1.3"/><circle cx="59" cy="22" r="1.7" fill="none" stroke="#7fd3d0" stroke-width="1.2"/>');

export const BELLE_SVG = princess('belle',
  '<ellipse cx="32" cy="32" rx="19" ry="20" fill="#6b3e1d"/><circle cx="32" cy="12" r="7" fill="#6b3e1d"/>'
    + '<path d="M14 36 Q12 52 18 58 L22 44 Z M50 36 Q52 52 46 58 L42 44 Z" fill="#6b3e1d"/>',
  '<path d="M8 72 Q10 57 32 56 Q54 57 56 72 Z" fill="#f9dcc4"/><path d="M12 72 Q14 64 32 63 Q50 64 52 72 Z" fill="#f2c94c" stroke="#c99a20" stroke-width="1"/>'
    + '<circle cx="49" cy="66" r="2.8" fill="#c8102e"/>',
  '<path d="M17 31 Q18 17 32 16 Q46 17 47 31 Q44 22 36 21 Q26 22 17 31 Z" fill="#6b3e1d"/>'
    + '<path d="M32 18 L26 14 L26 21 Z M32 18 L38 14 L38 21 Z" fill="#f2c94c"/>');

export const AURORA_SVG = princess('aurora',
  '<path d="M10 38 Q8 12 32 11 Q56 12 54 38 Q56 60 50 70 L42 52 L22 52 L14 70 Q8 60 10 38 Z" fill="#e8b84a"/>',
  '<path d="M8 72 Q10 57 32 56 Q54 57 56 72 Z" fill="#f9dcc4"/><path d="M12 72 Q14 63 32 63 Q50 63 52 72 Z" fill="#f4a6c8" stroke="#d97aa5" stroke-width="1"/>'
    + '<path d="M17 40 Q14 56 18 66 L22 64 Q20 52 22 42 Z M47 40 Q50 56 46 66 L42 64 Q44 52 42 42 Z" fill="#e8b84a"/>',
  '<path d="M17 32 Q17 16 32 15 Q47 16 47 32 Q42 21 32 21 Q22 21 17 32 Z" fill="#e8b84a"/>'
    + '<path d="M24 17 L26 10 L29 14 L32 7 L35 14 L38 10 L40 17 Z" fill="#f5c242" stroke="#b8860b" stroke-width="1"/><circle cx="32" cy="10" r="1.6" fill="#7b4bc4"/>');

// Original golden dog mascot (Pluto-inspired colors only, no Disney artwork).
export const PLUTO_SVG = `<svg class="pluto" viewBox="0 0 72 72" aria-hidden="true">
<path d="M14 18 Q4 30 8 50 Q12 54 16 48 Q16 34 22 26 Z" fill="#1b1b1b"/>
<path d="M58 18 Q68 30 64 50 Q60 54 56 48 Q56 34 50 26 Z" fill="#1b1b1b"/>
<ellipse cx="36" cy="34" rx="20" ry="19" fill="#f4b63c" stroke="#c98a12" stroke-width="1.4"/>
<ellipse cx="36" cy="45" rx="13" ry="9" fill="#f7c95e"/>
<ellipse cx="29" cy="29" rx="3" ry="4.4" fill="#fff"/><ellipse cx="43" cy="29" rx="3" ry="4.4" fill="#fff"/>
<circle cx="29.5" cy="30" r="1.9" fill="#111"/><circle cx="42.5" cy="30" r="1.9" fill="#111"/>
<ellipse cx="36" cy="40" rx="6" ry="4.2" fill="#111"/><ellipse cx="34.5" cy="39" rx="1.6" ry="1" fill="#fff" opacity=".7"/>
<path d="M30 47 Q36 52 42 47" fill="none" stroke="#7a4a00" stroke-width="1.6" stroke-linecap="round"/>
<path d="M36 49 Q36 57 40 56 Q42 52 40 48 Z" fill="#e85a6b"/>
<path d="M20 58 Q36 64 52 58 L52 63 Q36 69 20 63 Z" fill="#3a8f3a"/>
<circle cx="36" cy="66" r="3.4" fill="#f5c242" stroke="#b8860b" stroke-width="1"/>
</svg>`;

export const RAPUNZEL_SVG = princess('rapunzel',
  '<path d="M11 38 Q8 12 32 11 Q56 12 53 38 Q54 50 50 56 L44 50 L20 50 L14 56 Q10 50 11 38 Z" fill="#f0c75a"/>'
    + '<path d="M50 44 Q60 52 56 62 Q54 68 58 72 L50 72 Q46 66 49 60 Q52 54 46 48 Z" fill="#f0c75a" stroke="#d9a93a" stroke-width="1"/>',
  '<path d="M8 72 Q10 56 32 55 Q54 56 56 72 Z" fill="#9b6ad1"/><path d="M22 56 L32 66 L42 56 Z" fill="#f4a6c8"/>'
    + '<path d="M26 58 L38 58 M27 61 L37 61" stroke="#f9e7f1" stroke-width="1.2"/>',
  '<path d="M17 31 Q17 16 32 15 Q47 16 47 31 Q42 21 32 21 Q22 21 17 31 Z" fill="#f0c75a"/>'
    + '<circle cx="53" cy="56" r="2.6" fill="#ff7eb9"/><circle cx="51" cy="64" r="2.2" fill="#b88cff"/><circle cx="56" cy="69" r="2" fill="#fff59d"/>'
    + '<circle cx="20" cy="22" r="2.4" fill="#ff7eb9"/><circle cx="20" cy="22" r="1" fill="#fff59d"/>');

// ── Emotion characters (original cartoons inspired by Inside Out colors; no Pixar artwork) ──

function emotion(className: string, parts: string): string {
  return `<svg class="${className}" viewBox="0 0 64 72" aria-hidden="true">${parts}</svg>`;
}

export const JOY_SVG = emotion('joy',
  '<circle cx="32" cy="36" r="27" fill="#fff7b0" opacity=".55"/><path d="M10 72 Q12 56 32 55 Q52 56 54 72 Z" fill="#6ccf4f"/>'
  + '<path d="M24 56 L28 60 L32 56 L36 60 L40 56" fill="none" stroke="#3f9b2f" stroke-width="1.6"/><rect x="28" y="47" width="8" height="9" fill="#ffe066"/>'
  + '<path d="M14 38 Q11 14 32 12 Q53 13 51 36 Q49 27 46 24 L18 24 Q15 30 14 38 Z" fill="#2e6fe0"/>'
  + '<ellipse cx="32" cy="35" rx="15" ry="16" fill="#ffe066" stroke="#e6c200" stroke-width="1.2"/>'
  + '<path d="M16 33 Q15 15 34 14 Q50 15 50 30 Q46 21 36 21 Q27 21 22 27 Q19 30 16 33 Z" fill="#2e6fe0"/><path d="M31 14 Q33 5 41 6 Q36 9 36 15 Z" fill="#2e6fe0"/>'
  + '<path d="M24 18 Q33 14 44 19" fill="none" stroke="#6aa1ff" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="26.5" cy="35" rx="2.6" ry="3.4" fill="#1b2a5a"/>'
  + '<ellipse cx="37.5" cy="35" rx="2.6" ry="3.4" fill="#1b2a5a"/><circle cx="27.4" cy="34" r="1" fill="#fff"/><circle cx="38.4" cy="34" r="1" fill="#fff"/>'
  + '<path d="M24 42 Q32 52 40 42 Z" fill="#8a1f33"/><ellipse cx="32" cy="47" rx="4" ry="2" fill="#f28aa0"/><ellipse cx="21.5" cy="42" rx="2.4" ry="1.4" fill="#ffb347" opacity=".6"/>'
  + '<ellipse cx="42.5" cy="42" rx="2.4" ry="1.4" fill="#ffb347" opacity=".6"/>');

export const SADNESS_SVG = emotion('sadness',
  '<path d="M12 42 Q10 16 32 14 Q54 16 52 42 L52 48 L12 48 Z" fill="#2c4f9e"/>'
  + '<path d="M8 72 Q10 56 32 55 Q54 56 56 72 Z" fill="#f2f2f4" stroke="#cfd4dc" stroke-width="1"/><rect x="24" y="49" width="16" height="8" rx="3" fill="#f2f2f4" stroke="#cfd4dc" stroke-width="1"/>'
  + '<ellipse cx="32" cy="36" rx="15.5" ry="15" fill="#7fb0ec"/>'
  + '<path d="M17 32 Q18 19 32 18 Q46 19 47 32 Q40 24 32 25 Q24 24 17 32 Z" fill="#2c4f9e"/>'
  + '<circle cx="26" cy="36" r="5.6" fill="#dfeeff" fill-opacity=".45" stroke="#1b1b2f" stroke-width="1.8"/><circle cx="38" cy="36" r="5.6" fill="#dfeeff" fill-opacity=".45" stroke="#1b1b2f" stroke-width="1.8"/>'
  + '<path d="M31.6 36 L32.4 36" stroke="#1b1b2f" stroke-width="1.8"/>'
  + '<ellipse cx="26" cy="37" rx="1.7" ry="2.2" fill="#1b2a5a"/><ellipse cx="38" cy="37" rx="1.7" ry="2.2" fill="#1b2a5a"/>'
  + '<path d="M28 45.5 Q32 42.5 36 45.5" fill="none" stroke="#1b2f5a" stroke-width="1.8" stroke-linecap="round"/>'
  + '<path d="M43 41 Q45.5 45 43 47.5 Q40.5 45 43 41 Z" fill="#cfe7ff" stroke="#7fb0ec" stroke-width=".8"/>');

export const ANGER_SVG = emotion('anger',
  '<path d="M8 72 Q10 58 32 57 Q54 58 56 72 Z" fill="#f2f2f2" stroke="#cfcfcf" stroke-width="1"/>'
  + '<path d="M30 57 L34 57 L35.5 69 L32 72 L28.5 69 Z" fill="#b5121b"/>'
  + '<path d="M18 22 Q20 7 28 12 Q30 1 36 10 Q42 3 44 14 Q51 9 46 22 Z" fill="#ff9a3c"/><path d="M24 22 Q26 13 31 16 Q33 9 37 16 Q41 12 40 22 Z" fill="#ffd23f"/>'
  + '<rect x="14" y="20" width="36" height="36" rx="7" fill="#e8431f" stroke="#a8260f" stroke-width="1.4"/>'
  + '<path d="M19 29 L29 33 M45 29 L35 33" stroke="#1b1b1b" stroke-width="3.6" stroke-linecap="round"/>'
  + '<ellipse cx="25.5" cy="37" rx="2.2" ry="2.6" fill="#1b1b1b"/><ellipse cx="38.5" cy="37" rx="2.2" ry="2.6" fill="#1b1b1b"/>'
  + '<path d="M24 48 Q32 42 40 48" fill="none" stroke="#1b1b1b" stroke-width="2.6" stroke-linecap="round"/>');

export const FEAR_SVG = emotion('fear',
  '<path d="M12 72 Q14 58 32 57 Q50 58 52 72 Z" fill="#8a6bbf"/><path d="M26 58 L32 66 L38 58" fill="none" stroke="#f2e9ff" stroke-width="1.4"/>'
  + '<rect x="29" y="48" width="6" height="10" fill="#a07ad6"/>'
  + '<path d="M32 58 L25.5 54.5 L25.5 61.5 Z M32 58 L38.5 54.5 L38.5 61.5 Z" fill="#d62828"/>'
  + '<ellipse cx="32" cy="33" rx="13.5" ry="18" fill="#a07ad6" stroke="#7b4bc4" stroke-width="1.2"/>'
  + '<path d="M32 15.5 Q29 6 36 3.5" fill="none" stroke="#4b2a7a" stroke-width="2" stroke-linecap="round"/>'
  + '<path d="M20.5 22 Q25.5 18.5 30 22.5 M34 22.5 Q38.5 18.5 43.5 22" fill="none" stroke="#4b2a7a" stroke-width="2" stroke-linecap="round"/>'
  + '<ellipse cx="26" cy="31" rx="5" ry="6.5" fill="#fff"/><ellipse cx="38" cy="31" rx="5" ry="6.5" fill="#fff"/>'
  + '<circle cx="26.5" cy="32" r="1.8" fill="#1b1b2f"/><circle cx="37.5" cy="32" r="1.8" fill="#1b1b2f"/>'
  + '<path d="M25 44 Q27 42 29 44 Q31 46 33 44 Q35 42 37 44 Q38 45 39 44" fill="none" stroke="#4b2a7a" stroke-width="1.8" stroke-linecap="round"/>');

export const DISGUST_SVG = emotion('disgust',
  '<path d="M12 40 Q9 14 32 13 Q55 14 52 40 Q53 47 58 49 Q50 53 46 46 L18 46 Q14 53 6 49 Q11 47 12 40 Z" fill="#2a6324"/><path d="M8 72 Q10 57 32 56 Q54 57 56 72 Z" fill="#5fb34a"/>'
  + '<rect x="28" y="47" width="8" height="9" fill="#8fd66a"/><path d="M17 55 Q32 63 47 55 L47 60 Q32 68 17 60 Z" fill="#c78be8"/>'
  + '<ellipse cx="32" cy="35" rx="14.5" ry="15.5" fill="#8fd66a"/><path d="M17 32 Q14 16 33 15 Q50 16 47 31 Q43 22 33 21 Q25 21 17 32 Z" fill="#2a6324"/>'
  + '<path d="M24 18 Q33 15 42 18" fill="none" stroke="#4f9a3f" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="26.5" cy="36" rx="4" ry="4.4" fill="#fff"/>'
  + '<ellipse cx="37.5" cy="36" rx="4" ry="4.4" fill="#fff"/><circle cx="28.5" cy="36.5" r="2.3" fill="#1b3a14"/><circle cx="39.5" cy="36.5" r="2.3" fill="#1b3a14"/>'
  + '<path d="M22.3 33.5 Q26.5 30.6 30.7 33.5 M33.3 33.5 Q37.5 30.6 41.7 33.5" fill="none" stroke="#1b3a14" stroke-width="2" stroke-linecap="round"/>'
  + '<path d="M22.5 33 L20 30.5 M23.6 32.1 L22.2 29.2 M41.5 33 L44 30.5 M40.4 32.1 L41.8 29.2" stroke="#1b3a14" stroke-width="1.3" stroke-linecap="round"/>'
  + '<path d="M22 28 Q26 25.5 30 27.5 M34 27 Q38 23 42 25" fill="none" stroke="#1b3a14" stroke-width="1.7" stroke-linecap="round"/>'
  + '<path d="M28 45 Q32 43 36 45 Q32 47.6 28 45 Z" fill="#9b3a7a"/>');

export const ENVY_SVG = emotion('envy',
  '<g fill="#1b6e69"><circle cx="19" cy="25" r="7"/><circle cx="27" cy="18" r="8"/><circle cx="37" cy="18" r="8"/><circle cx="45" cy="25" r="7"/><circle cx="48" cy="34" r="6"/><circle cx="16" cy="34" r="6"/></g>'
  + '<path d="M14 72 Q16 58 32 57 Q48 58 50 72 Z" fill="#7fe0d8"/><rect x="29" y="48" width="6" height="9" fill="#3fd0c8"/>'
  + '<circle cx="32" cy="37" r="15" fill="#3fd0c8" stroke="#13968f" stroke-width="1.2"/>'
  + '<ellipse cx="25.5" cy="36" rx="6.4" ry="7.4" fill="#fff"/><ellipse cx="38.5" cy="36" rx="6.4" ry="7.4" fill="#fff"/>'
  + '<circle cx="26" cy="37" r="4.4" fill="#1b2a3a"/><circle cx="38" cy="37" r="4.4" fill="#1b2a3a"/>'
  + '<circle cx="27.6" cy="35.2" r="1.5" fill="#fff"/><circle cx="39.6" cy="35.2" r="1.5" fill="#fff"/>'
  + '<ellipse cx="21" cy="44" rx="2.4" ry="1.4" fill="#ff9fc4" opacity=".8"/><ellipse cx="43" cy="44" rx="2.4" ry="1.4" fill="#ff9fc4" opacity=".8"/>'
  + '<path d="M29.5 46 Q32 48.5 34.5 46" fill="none" stroke="#0e3a3a" stroke-width="1.6" stroke-linecap="round"/>');

// Five memory orbs above the logo.
export const ORBS_SVG = `<svg class="orbs" viewBox="0 0 62 14" aria-hidden="true">${[
  ['#ffd52e', 7], ['#4f8ce0', 19], ['#e8431f', 31], ['#9b6ad1', 43], ['#6bc24a', 55],
].map(([color, cx]) => `<circle cx="${cx}" cy="7" r="5.4" fill="${color}"/><circle cx="${Number(cx) - 1.8}" cy="5.2" r="1.6" fill="#fff" opacity=".75"/>`).join('')}</svg>`;

function memoryOrbFab(name: string, light: string, mid: string, dark: string): string {
  return `<svg viewBox="0 0 92 82" aria-hidden="true"><defs><radialGradient id="orb-${name}" cx="35%" cy="30%" r="70%">`
    + `<stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>`
    + `<circle cx="46" cy="44" r="37" fill="${mid}" opacity=".25"/><circle cx="46" cy="44" r="31" fill="url(#orb-${name})"/>`
    + '<path d="M46 30 V58 M32 44 H60" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>';
}

export const JOY_ORB_FAB_SVG = memoryOrbFab('joy', '#fffbd1', '#ffd52e', '#d9a800');
export const FEAR_ORB_FAB_SVG = memoryOrbFab('fear', '#efe2ff', '#9b6ad1', '#6c3fb0');

// ── Hundred Acre Wood friends (original cartoons inspired by the Pooh stories; no Disney artwork) ──

function woodFriend(className: string, parts: string): string {
  return `<svg class="${className}" viewBox="0 0 64 72" aria-hidden="true">${parts}</svg>`;
}

export const POOH_SVG = woodFriend('pooh',
  '<path d="M8 72 Q10 55 32 54 Q54 55 56 72 Z" fill="#c8102e"/><path d="M20 72 Q22 66 32 66 Q42 66 44 72 Z" fill="#a50d26"/>'
  + '<circle cx="15" cy="17" r="7.5" fill="#f2b632" stroke="#c98a12" stroke-width="1.2"/><circle cx="49" cy="17" r="7.5" fill="#f2b632" stroke="#c98a12" stroke-width="1.2"/>'
  + '<circle cx="15" cy="17" r="3.8" fill="#e09a1c"/><circle cx="49" cy="17" r="3.8" fill="#e09a1c"/>'
  + '<ellipse cx="32" cy="34" rx="20" ry="18.5" fill="#f5bd3a" stroke="#c98a12" stroke-width="1.2"/>'
  + '<ellipse cx="32" cy="42" rx="10.5" ry="7.5" fill="#fbd77a"/>'
  + '<path d="M22 24 Q25 21.5 28 23.5 M36 23.5 Q39 21.5 42 24" fill="none" stroke="#8a5a10" stroke-width="1.5" stroke-linecap="round"/>'
  + '<circle cx="25" cy="31" r="2" fill="#2a1a08"/><circle cx="39" cy="31" r="2" fill="#2a1a08"/>'
  + '<ellipse cx="32" cy="38" rx="4" ry="2.8" fill="#3a2208"/><ellipse cx="31" cy="37.2" rx="1.3" ry=".7" fill="#fff" opacity=".6"/>'
  + '<path d="M26.5 44 Q32 49 37.5 44" fill="none" stroke="#8a4a10" stroke-width="1.6" stroke-linecap="round"/>'
  + '<ellipse cx="19.5" cy="39" rx="2.6" ry="1.6" fill="#f08a5a" opacity=".55"/><ellipse cx="44.5" cy="39" rx="2.6" ry="1.6" fill="#f08a5a" opacity=".55"/>');

export const PIGLET_SVG = woodFriend('piglet',
  '<path d="M14 72 Q16 57 32 56 Q48 57 50 72 Z" fill="#d6457a"/>'
  + '<path d="M18.5 62 Q32 59.5 45.5 62 M15.6 67 Q32 64.5 48.4 67" fill="none" stroke="#f28ab0" stroke-width="2.4"/>'
  + '<path d="M20 23 Q12 15 15 9 Q24 9 28 18 Z M44 23 Q52 15 49 9 Q40 9 36 18 Z" fill="#f7b2c8" stroke="#e08aa6" stroke-width="1"/>'
  + '<path d="M21 20 Q16 15 17.5 11.5 Q22.5 12 25 17.5 Z M43 20 Q48 15 46.5 11.5 Q41.5 12 39 17.5 Z" fill="#ec8fae"/>'
  + '<ellipse cx="32" cy="34" rx="14" ry="17.5" fill="#f9c1d3" stroke="#e08aa6" stroke-width="1.2"/>'
  + '<path d="M24.5 27.5 Q27 25.5 29 27 M35 27 Q37 25.5 39.5 27.5" fill="none" stroke="#a8466b" stroke-width="1.4" stroke-linecap="round"/>'
  + '<ellipse cx="27" cy="32" rx="1.8" ry="2.3" fill="#2a1420"/><ellipse cx="37" cy="32" rx="1.8" ry="2.3" fill="#2a1420"/>'
  + '<ellipse cx="32" cy="41" rx="6" ry="4.4" fill="#f59ab8" stroke="#e07a9e" stroke-width="1"/>'
  + '<ellipse cx="30" cy="41" rx=".9" ry="1.4" fill="#a8466b"/><ellipse cx="34" cy="41" rx=".9" ry="1.4" fill="#a8466b"/>'
  + '<path d="M29 47.5 Q32 49.5 35 47.5" fill="none" stroke="#a8466b" stroke-width="1.4" stroke-linecap="round"/>'
  + '<ellipse cx="22.5" cy="39" rx="2.2" ry="1.4" fill="#f27aa0" opacity=".55"/><ellipse cx="41.5" cy="39" rx="2.2" ry="1.4" fill="#f27aa0" opacity=".55"/>');

export const EEYORE_SVG = woodFriend('eeyore',
  '<path d="M16 72 Q18 58 32 57 Q46 58 48 72 Z" fill="#8c95b0"/>'
  + '<g fill="#b8c2d8"><circle cx="51" cy="8" r="4"/><circle cx="56" cy="6.5" r="5"/><circle cx="60.5" cy="8.5" r="3.4"/><rect x="51" y="8" width="10" height="4" rx="2"/></g>'
  + '<path d="M53 15 L52 17.5 M57 15 L56 17.5 M60.5 14.5 L59.5 17" stroke="#7fa8e0" stroke-width="1.3" stroke-linecap="round"/>'
  + '<path d="M21 22 Q7 21 3 33 Q8 36 13 30.5 Q18 27.5 22 27.5 Z M43 22 Q57 21 61 33 Q56 36 51 30.5 Q46 27.5 42 27.5 Z" fill="#8c95b0" stroke="#6a7390" stroke-width="1"/>'
  + '<path d="M19 25 Q10 25 7 31 Q11 31 15 28 Z M45 25 Q54 25 57 31 Q53 31 49 28 Z" fill="#c9a3b8"/>'
  + '<path d="M20 24 Q20 12 32 12 Q44 12 44 24 L45 40 Q47 55 32 55 Q17 55 19 40 Z" fill="#9aa3bd" stroke="#6a7390" stroke-width="1.2"/>'
  + '<path d="M28 13 Q26 6 30.5 8 Q32 3 34.5 8 Q38.5 6 36 13 Z" fill="#2a2a35"/>'
  + '<ellipse cx="32" cy="46.5" rx="12" ry="8" fill="#c3c9da"/>'
  + '<ellipse cx="27.5" cy="45" rx="1.4" ry="2" fill="#3a3f52"/><ellipse cx="36.5" cy="45" rx="1.4" ry="2" fill="#3a3f52"/>'
  + '<path d="M27 51.5 Q32 50.5 37 51.5" fill="none" stroke="#3a3f52" stroke-width="1.4" stroke-linecap="round"/>'
  + '<path d="M22.5 29 Q26 33.5 29.5 29 Z M34.5 29 Q38 33.5 41.5 29 Z" fill="#fff"/>'
  + '<circle cx="26" cy="30.6" r="1.3" fill="#1b1b2f"/><circle cx="38" cy="30.6" r="1.3" fill="#1b1b2f"/>'
  + '<path d="M22 29 L30 29 M34 29 L42 29" stroke="#3a3f52" stroke-width="1.6" stroke-linecap="round"/>'
  + '<path d="M22 26 Q25.5 24.5 29 24 M35 24 Q38.5 24.5 42 26" fill="none" stroke="#3a3f52" stroke-width="1.4" stroke-linecap="round"/>');

export const OWL_SVG = woodFriend('owl',
  '<ellipse cx="32" cy="58" rx="19" ry="17" fill="#8a5a2b"/>'
  + '<path d="M13 46 Q6 57 12 70 Q17 61 17 50 Z M51 46 Q58 57 52 70 Q47 61 47 50 Z" fill="#6e4520"/>'
  + '<ellipse cx="32" cy="61" rx="11" ry="11" fill="#e8cfa0"/>'
  + '<path d="M26 57 Q28 59 30 57 M34 57 Q36 59 38 57 M30 62 Q32 64 34 62 M26 66 Q28 68 30 66 M34 66 Q36 68 38 66" fill="none" stroke="#b8935a" stroke-width="1.1" stroke-linecap="round"/>'
  + '<path d="M27 16 Q26 8 30 10 Q32 5 34 10 Q38 8 37 16 Z" fill="#8a5a2b"/>'
  + '<ellipse cx="32" cy="31" rx="20" ry="17" fill="#9b6834" stroke="#6b4320" stroke-width="1.2"/>'
  + '<circle cx="24" cy="31" r="8.5" fill="#f0dcb4"/><circle cx="40" cy="31" r="8.5" fill="#f0dcb4"/>'
  + '<circle cx="24" cy="31" r="5.6" fill="#fff" stroke="#c9a46a" stroke-width=".8"/><circle cx="40" cy="31" r="5.6" fill="#fff" stroke="#c9a46a" stroke-width=".8"/>'
  + '<circle cx="24.6" cy="31.6" r="2.7" fill="#2a1a08"/><circle cx="39.4" cy="31.6" r="2.7" fill="#2a1a08"/>'
  + '<circle cx="25.6" cy="30.4" r=".9" fill="#fff"/><circle cx="40.4" cy="30.4" r=".9" fill="#fff"/>'
  + '<path d="M15 22 Q23 17.5 30 22.5 M34 22.5 Q41 17.5 49 22" fill="none" stroke="#4a2a10" stroke-width="2.6" stroke-linecap="round"/>'
  + '<path d="M29.5 36 L34.5 36 L32 42 Z" fill="#e8a33a" stroke="#b8761a" stroke-width="1" stroke-linejoin="round"/>');

export const TIGGER_SVG = woodFriend('tigger',
  '<path d="M10 72 Q12 56 32 55 Q52 56 54 72 Z" fill="#f58a1f"/>'
  + '<path d="M15 63 L22 65 M14 68 L21 69.5 M49 63 L42 65 M50 68 L43 69.5" stroke="#2a1a10" stroke-width="2" stroke-linecap="round"/>'
  + '<ellipse cx="32" cy="64" rx="9" ry="8" fill="#fff3d9"/>'
  + '<path d="M15 22 Q12 7 25 12 Z M49 22 Q52 7 39 12 Z" fill="#f7941f" stroke="#c96a10" stroke-width="1.2" stroke-linejoin="round"/>'
  + '<path d="M17 18 Q16 11 22 13 Z M47 18 Q48 11 42 13 Z" fill="#2a1a10"/>'
  + '<path d="M15 30 Q14 14 32 14 Q50 14 49 30 L55 34 L49.5 37 L54 41.5 L46.5 42 Q42 51 32 51 Q22 51 17.5 42 L10 41.5 L14.5 37 L9 34 Z" fill="#f7941f" stroke="#c96a10" stroke-width="1.2" stroke-linejoin="round"/>'
  + '<path d="M28 15 L29.5 20 M32 14.5 L32 20.5 M36 15 L34.5 20 M15.5 27 L20 28.5 M48.5 27 L44 28.5 M13 36 L18 36.5 M51 36 L46 36.5" stroke="#2a1a10" stroke-width="2" stroke-linecap="round"/>'
  + '<ellipse cx="27" cy="41" rx="6.5" ry="5" fill="#fff3d9"/><ellipse cx="37" cy="41" rx="6.5" ry="5" fill="#fff3d9"/>'
  + '<path d="M25 43 Q32 52 39 43 Q32 46 25 43 Z" fill="#8a1f2a"/>'
  + '<ellipse cx="32" cy="37" rx="3.6" ry="2.6" fill="#f07aa0" stroke="#c94a75" stroke-width=".9"/>'
  + '<ellipse cx="26" cy="29" rx="2.8" ry="3.6" fill="#fff"/><ellipse cx="38" cy="29" rx="2.8" ry="3.6" fill="#fff"/>'
  + '<circle cx="26.6" cy="28.6" r="1.7" fill="#1b1b2f"/><circle cx="37.4" cy="28.6" r="1.7" fill="#1b1b2f"/>'
  + '<path d="M22 23 Q26 20 29.5 23 M34.5 23 Q38 20 42 23" fill="none" stroke="#2a1a10" stroke-width="1.6" stroke-linecap="round"/>');

export const RABBIT_SVG = woodFriend('rabbit',
  '<path d="M14 72 Q16 56 32 55 Q48 56 50 72 Z" fill="#efd96e"/><ellipse cx="32" cy="66" rx="9" ry="7" fill="#fff6cf"/>'
  + '<ellipse cx="24" cy="14" rx="5.2" ry="13" transform="rotate(-12 24 14)" fill="#f2df7a" stroke="#c4ae3a" stroke-width="1"/>'
  + '<ellipse cx="40" cy="14" rx="5.2" ry="13" transform="rotate(12 40 14)" fill="#f2df7a" stroke="#c4ae3a" stroke-width="1"/>'
  + '<ellipse cx="24" cy="15" rx="2.4" ry="9" transform="rotate(-12 24 15)" fill="#f4b3b3"/><ellipse cx="40" cy="15" rx="2.4" ry="9" transform="rotate(12 40 15)" fill="#f4b3b3"/>'
  + '<ellipse cx="32" cy="38" rx="15" ry="15" fill="#f2df7a" stroke="#c4ae3a" stroke-width="1.2"/>'
  + '<ellipse cx="28.3" cy="45" rx="4.6" ry="3.6" fill="#fff6cf"/><ellipse cx="35.7" cy="45" rx="4.6" ry="3.6" fill="#fff6cf"/>'
  + '<rect x="30" y="46.5" width="4" height="4.2" rx=".8" fill="#fff" stroke="#c4ae3a" stroke-width=".8"/><path d="M32 46.5 V50.7" stroke="#c4ae3a" stroke-width=".6"/>'
  + '<ellipse cx="32" cy="42" rx="3" ry="2.2" fill="#f08aa0"/>'
  + '<ellipse cx="26.5" cy="35" rx="2.6" ry="3.2" fill="#fff"/><ellipse cx="37.5" cy="35" rx="2.6" ry="3.2" fill="#fff"/>'
  + '<circle cx="26.8" cy="35.6" r="1.6" fill="#1b1b2f"/><circle cx="37.2" cy="35.6" r="1.6" fill="#1b1b2f"/>'
  + '<path d="M23 30 L29.5 31.2 M41 30 L34.5 31.2" stroke="#6b5a14" stroke-width="1.5" stroke-linecap="round"/>'
  + '<path d="M45 67 L57 54 Q60 56 57.5 58.5 Z" fill="#f08a24" stroke="#c96a10" stroke-width=".8" stroke-linejoin="round"/>'
  + '<path d="M57.5 55 Q60 49 63 50 M58 55.5 Q63 53 64 56" fill="none" stroke="#3c9a4a" stroke-width="1.8" stroke-linecap="round"/>');

// A little honey pot above the logo.
export const HONEY_POT_SVG = '<svg class="honey-pot" viewBox="0 0 36 28" aria-hidden="true">'
  + '<path d="M8 9 Q4 18 9 25 Q18 29 27 25 Q32 18 28 9 Z" fill="#c97d2a" stroke="#8a5216" stroke-width="1.4"/>'
  + '<rect x="6" y="5" width="24" height="5.5" rx="2.7" fill="#a8641e" stroke="#8a5216" stroke-width="1.2"/>'
  + '<path d="M9 6 Q11 2 18 2.5 Q25 2 27 6 Q25 9 24 13 Q23 15 22 13 Q21 9 18 9 Q14 9 13 12 Q12 14.5 11 12 Q10 9 9 6 Z" fill="#f5b82e"/>'
  + '<path d="M12 18 Q18 15 24 18" fill="none" stroke="#f0c98a" stroke-width="1.4" stroke-linecap="round"/></svg>';

export const HONEY_POT_FAB_SVG = '<svg viewBox="0 0 92 82" aria-hidden="true">'
  + '<path d="M22 24 Q8 46 20 70 Q46 82 72 70 Q84 46 70 24 Z" fill="#c97d2a" stroke="#8a5216" stroke-width="2.5"/>'
  + '<rect x="16" y="13" width="60" height="13" rx="6.5" fill="#a8641e" stroke="#8a5216" stroke-width="2.2"/>'
  + '<path d="M20 15 Q24 4 46 5 Q68 4 72 15 Q68 22 66 32 Q64 37 62 32 Q60 24 50 23 Q40 23 36 30 Q34 36 31 30 Q28 22 20 15 Z" fill="#f5b82e"/>'
  + '<path d="M46 38 V64 M33 51 H59" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>';

export const BALLOON_FAB_SVG = '<svg class="balloon" viewBox="0 0 92 82" aria-hidden="true">'
  + '<path d="M46 66 Q42 72 47 76 Q51 80 46 82" fill="none" stroke="#6b4320" stroke-width="2" stroke-linecap="round"/>'
  + '<path d="M46 66 C22 62 16 36 22 22 C28 6 64 6 70 22 C76 36 70 62 46 66 Z" fill="#d62839" stroke="#9b1c2a" stroke-width="2.5"/>'
  + '<path d="M42 64 L50 64 L48 68 L44 68 Z" fill="#9b1c2a"/><ellipse cx="33" cy="22" rx="5" ry="8" transform="rotate(25 33 22)" fill="#fff" opacity=".35"/>'
  + '<path d="M46 24 V50 M33 37 H59" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>';
