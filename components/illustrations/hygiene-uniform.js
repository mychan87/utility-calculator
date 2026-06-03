// Webtoon diagram: worker in full hygiene uniform with numbered labels
// ① cap  ② jacket  ③ pants  ④ shoes  ⑤ mask  ⑥ gloves

export default function HygieneUniform({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <ellipse cx="100" cy="110" rx="60" ry="75" fill="#dbeafe" opacity="0.3" />

      {/* Shadow */}
      <ellipse cx="100" cy="196" rx="26" ry="5" fill="#1e3a8a" opacity="0.1" />

      {/* ④ Shoes */}
      <ellipse cx="84" cy="190" rx="13" ry="6" fill="#1e293b" />
      <ellipse cx="116" cy="190" rx="13" ry="6" fill="#1e293b" />

      {/* ③ Pants/legs */}
      <rect x="75" y="152" width="16" height="38" rx="7" fill="#1e3a8a" />
      <rect x="109" y="152" width="16" height="38" rx="7" fill="#1e3a8a" />
      <rect x="75" y="152" width="16" height="38" rx="7" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <rect x="109" y="152" width="16" height="38" rx="7" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* ② Jacket body */}
      <rect x="68" y="98" width="64" height="57" rx="8" fill="#1e40af" />
      {/* Apron */}
      <path d="M80 101 L120 101 L116 153 L84 153 Z" fill="#bfdbfe" opacity="0.7" />
      <rect x="95" y="101" width="10" height="6" rx="2" fill="#93c5fd" />

      {/* Left arm */}
      <rect x="44" y="100" width="24" height="44" rx="11" fill="#1e40af" />
      <rect x="44" y="100" width="24" height="44" rx="11" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* Right arm */}
      <rect x="132" y="100" width="24" height="44" rx="11" fill="#1e40af" />
      <rect x="132" y="100" width="24" height="44" rx="11" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* ⑥ Left glove – open palm */}
      <ellipse cx="56" cy="144" rx="13" ry="8" fill="#10b981" />
      <ellipse cx="56" cy="144" rx="13" ry="8" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <line x1="48" y1="142" x2="45" y2="135" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="53" y1="140" x2="51" y2="133" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="140" x2="58" y2="133" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="63" y1="141" x2="65" y2="134" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

      {/* ⑥ Right glove – thumbs up */}
      <rect x="135" y="128" width="17" height="20" rx="6" fill="#10b981" />
      <rect x="135" y="128" width="17" height="20" rx="6" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <rect x="140" y="114" width="12" height="16" rx="5" fill="#10b981" />
      <rect x="140" y="114" width="12" height="16" rx="5" fill="none" stroke="#0f172a" strokeWidth="1.8" />
      <text x="155" y="112" fontSize="9" fill="#fbbf24">✦</text>

      {/* Jacket outline */}
      <rect x="68" y="98" width="64" height="57" rx="8" fill="none" stroke="#0f172a" strokeWidth="1.8" />

      {/* Collar */}
      <path d="M91 98 L100 106 L109 98" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Head */}
      <circle cx="100" cy="56" r="27" fill="#fddcb5" />
      <circle cx="100" cy="56" r="27" fill="none" stroke="#0f172a" strokeWidth="2" />

      {/* ① Cap */}
      <path d="M72 43 Q72 18 100 18 Q128 18 128 43 Z" fill="white" />
      <path d="M72 43 Q72 18 100 18 Q128 18 128 43 Z" fill="none" stroke="#0f172a" strokeWidth="2" />
      <ellipse cx="100" cy="43" rx="32" ry="9" fill="white" />
      <ellipse cx="100" cy="43" rx="32" ry="9" fill="none" stroke="#0f172a" strokeWidth="2" />
      <line x1="72" y1="38" x2="128" y2="38" stroke="#bfdbfe" strokeWidth="1.5" />

      {/* ⑤ Mask */}
      <rect x="70" y="67" width="60" height="24" rx="7" fill="#bfdbfe" />
      <rect x="70" y="67" width="60" height="24" rx="7" fill="none" stroke="#0f172a" strokeWidth="2" />
      <path d="M72 74 Q100 78 128 74" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
      <path d="M72 81 Q100 85 128 81" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
      <path d="M70 70 Q61 78 70 86" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M130 70 Q139 78 130 86" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="86" cy="52" rx="7" ry="7.5" fill="white" />
      <ellipse cx="86" cy="52" rx="7" ry="7.5" fill="none" stroke="#0f172a" strokeWidth="2" />
      <circle cx="87" cy="53" r="4.5" fill="#1e293b" />
      <circle cx="88.5" cy="51" r="1.8" fill="white" />
      <ellipse cx="114" cy="52" rx="7" ry="7.5" fill="white" />
      <ellipse cx="114" cy="52" rx="7" ry="7.5" fill="none" stroke="#0f172a" strokeWidth="2" />
      <circle cx="115" cy="53" r="4.5" fill="#1e293b" />
      <circle cx="116.5" cy="51" r="1.8" fill="white" />

      {/* Eyebrows */}
      <path d="M79 39 Q86 36 93 39" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M107 39 Q114 36 121 39" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

      {/* Blush */}
      <ellipse cx="72" cy="63" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="128" cy="63" rx="6" ry="3.5" fill="#fca5a5" opacity="0.5" />

      {/* ─── Number badges ─── */}
      {/* ① Cap – top right */}
      <circle cx="166" cy="26" r="12" fill="#1e40af" />
      <text x="166" y="31" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">1</text>
      <line x1="154" y1="28" x2="130" y2="34" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* ② Jacket – right */}
      <circle cx="174" cy="112" r="12" fill="#1e40af" />
      <text x="174" y="117" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">2</text>
      <line x1="162" y1="112" x2="132" y2="118" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* ③ Pants – right */}
      <circle cx="174" cy="160" r="12" fill="#1e40af" />
      <text x="174" y="165" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">3</text>
      <line x1="162" y1="160" x2="125" y2="160" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* ④ Shoes – bottom right */}
      <circle cx="152" cy="196" r="12" fill="#1e293b" />
      <text x="152" y="201" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">4</text>
      <line x1="140" y1="194" x2="129" y2="191" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* ⑤ Mask – left */}
      <circle cx="34" cy="76" r="12" fill="#7c3aed" />
      <text x="34" y="81" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">5</text>
      <line x1="46" y1="76" x2="70" y2="77" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* ⑥ Gloves – left */}
      <circle cx="26" cy="142" r="12" fill="#10b981" />
      <text x="26" y="147" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">6</text>
      <line x1="38" y1="142" x2="44" y2="142" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
    </svg>
  );
}
