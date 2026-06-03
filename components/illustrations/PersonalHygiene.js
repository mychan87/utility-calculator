// Webtoon-style food worker character for Personal Hygiene (Day 1)
// Standing pose, hygiene uniform (cap, mask, gloves), thumbs up

export default function PersonalHygiene({ size = 120 }) {
  const h = size * 1.4;
  return (
    <svg width={size} height={h} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft background glow */}
      <ellipse cx="50" cy="80" rx="46" ry="54" fill="#dbeafe" opacity="0.35" />

      {/* ── SHADOW ── */}
      <ellipse cx="50" cy="136" rx="22" ry="4" fill="#1e3a8a" opacity="0.12" />

      {/* ── SHOES ── */}
      <ellipse cx="39" cy="131" rx="10" ry="5" fill="#1e293b" />
      <ellipse cx="61" cy="131" rx="10" ry="5" fill="#1e293b" />

      {/* ── LEGS ── */}
      <rect x="33" y="107" width="13" height="24" rx="6" fill="#1e3a8a" />
      <rect x="54" y="107" width="13" height="24" rx="6" fill="#1e3a8a" />
      <rect x="33" y="107" width="13" height="24" rx="6" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <rect x="54" y="107" width="13" height="24" rx="6" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* ── BODY (uniform) ── */}
      <rect x="24" y="60" width="52" height="50" rx="8" fill="#1e40af" />

      {/* ── APRON ── */}
      <path d="M35 63 L65 63 L61 108 L39 108 Z" fill="#bfdbfe" opacity="0.75" />
      {/* Apron tie */}
      <rect x="46" y="63" width="8" height="5" rx="2" fill="#93c5fd" />

      {/* ── ARMS ── */}
      <rect x="6" y="63" width="18" height="38" rx="9" fill="#1e40af" />
      <rect x="6" y="63" width="18" height="38" rx="9" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <rect x="76" y="63" width="18" height="38" rx="9" fill="#1e40af" />
      <rect x="76" y="63" width="18" height="38" rx="9" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* ── LEFT GLOVE (open palm / wave) ── */}
      <ellipse cx="15" cy="101" rx="10" ry="7" fill="#10b981" />
      <ellipse cx="15" cy="101" rx="10" ry="7" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      {/* Fingers */}
      <line x1="9" y1="100" x2="7" y2="94" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="98" x2="12" y2="92" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="98" x2="17" y2="92" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="99" x2="22" y2="93" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── RIGHT GLOVE (thumbs up) ── */}
      <rect x="78" y="86" width="14" height="17" rx="5" fill="#10b981" />
      <rect x="78" y="86" width="14" height="17" rx="5" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      {/* Thumb up */}
      <rect x="83" y="74" width="9" height="15" rx="4" fill="#10b981" />
      <rect x="83" y="74" width="9" height="15" rx="4" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      {/* Sparkle near thumb */}
      <text x="94" y="73" fontSize="8" fill="#fbbf24">✦</text>

      {/* ── BODY outline ── */}
      <rect x="24" y="60" width="52" height="50" rx="8" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* ── HEAD ── */}
      <circle cx="50" cy="38" r="24" fill="#fddcb5" />
      <circle cx="50" cy="38" r="24" fill="none" stroke="#0f172a" strokeWidth="2" />

      {/* ── CAP ── */}
      {/* Cap body */}
      <path d="M26 28 Q26 12 50 12 Q74 12 74 28 Z" fill="white" />
      <path d="M26 28 Q26 12 50 12 Q74 12 74 28 Z" fill="none" stroke="#0f172a" strokeWidth="2" />
      {/* Brim */}
      <ellipse cx="50" cy="28" rx="28" ry="7" fill="white" />
      <ellipse cx="50" cy="28" rx="28" ry="7" fill="none" stroke="#0f172a" strokeWidth="2" />
      {/* Cap stripe */}
      <line x1="27" y1="24" x2="73" y2="24" stroke="#bfdbfe" strokeWidth="1.5" />

      {/* ── MASK ── */}
      <rect x="27" y="47" width="46" height="20" rx="7" fill="#bfdbfe" />
      <rect x="27" y="47" width="46" height="20" rx="7" fill="none" stroke="#0f172a" strokeWidth="2" />
      {/* Pleats */}
      <path d="M29 53 Q50 56 71 53" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
      <path d="M29 59 Q50 62 71 59" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
      {/* Ear straps */}
      <path d="M27 50 Q20 55 27 62" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M73 50 Q80 55 73 62" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />

      {/* ── EYES ── */}
      {/* Left eye */}
      <ellipse cx="40" cy="36" rx="6.5" ry="7" fill="white" />
      <ellipse cx="40" cy="36" rx="6.5" ry="7" fill="none" stroke="#0f172a" strokeWidth="2" />
      <circle cx="41" cy="37" r="4" fill="#1e293b" />
      <circle cx="42.5" cy="35" r="1.5" fill="white" />
      {/* Right eye */}
      <ellipse cx="60" cy="36" rx="6.5" ry="7" fill="white" />
      <ellipse cx="60" cy="36" rx="6.5" ry="7" fill="none" stroke="#0f172a" strokeWidth="2" />
      <circle cx="61" cy="37" r="4" fill="#1e293b" />
      <circle cx="62.5" cy="35" r="1.5" fill="white" />

      {/* ── EYEBROWS ── */}
      <path d="M34 26 Q40 23 46 26" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 26 Q60 23 66 26" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── Blush ── */}
      <ellipse cx="32" cy="44" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="68" cy="44" rx="5" ry="3" fill="#fca5a5" opacity="0.5" />

      {/* ── COLLAR ── */}
      <path d="M42 60 L50 67 L58 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
