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
