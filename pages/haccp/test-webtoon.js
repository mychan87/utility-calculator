// 4-panel webtoon: 위생복 착용 규칙

function SpeechBubble({ x, y, w = 90, h = 28, text, fontSize = 11, tail = "bottom-left" }) {
  const r = 8;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="white" stroke="#1e293b" strokeWidth="2" />
      {tail === "bottom-left" && (
        <polygon points={`${x + 14},${y + h} ${x + 6},${y + h + 12} ${x + 26},${y + h}`} fill="white" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      )}
      {tail === "bottom-right" && (
        <polygon points={`${x + w - 14},${y + h} ${x + w - 6},${y + h + 12} ${x + w - 26},${y + h}`} fill="white" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      )}
      {tail === "top-left" && (
        <polygon points={`${x + 14},${y} ${x + 6},${y - 12} ${x + 26},${y}`} fill="white" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      )}
      <text x={x + w / 2} y={y + h / 2 + fontSize * 0.36} textAnchor="middle" fontSize={fontSize} fontWeight="700" fill="#1e293b" fontFamily="system-ui">{text}</text>
    </g>
  );
}

// Compact webtoon character: cx,cy = center bottom of feet
function Char({ cx, cy, scale = 1, capColor = "white", uniformColor = "#1e40af", gloveColor = "#10b981", pose = "normal", showMask = true }) {
  const s = scale;
  const x = cx;
  const y = cy;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* Feet/shoes */}
      <ellipse cx="-10" cy="0" rx="9" ry="4.5" fill="#1e293b" />
      <ellipse cx="10" cy="0" rx="9" ry="4.5" fill="#1e293b" />
      {/* Legs */}
      <rect x="-16" y="-28" width="12" height="28" rx="5" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" />
      <rect x="4" y="-28" width="12" height="28" rx="5" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" />
      {/* Body */}
      <rect x="-22" y="-64" width="44" height="38" rx="6" fill={uniformColor} stroke="#0f172a" strokeWidth="1.8" />
      {/* Apron */}
      <path d={`M-12,-62 L12,-62 L9,-28 L-9,-28 Z`} fill="#bfdbfe" opacity="0.8" />
      {/* Left arm */}
      {pose === "cap" ? (
        <>
          <rect x="-36" y="-82" width="16" height="30" rx="7" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" transform="rotate(-40,-28,-64)" />
          <ellipse cx="-38" cy="-74" rx="9" ry="6" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x="-36" y="-64" width="16" height="32" rx="7" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="-28" cy="-34" rx="9" ry="6" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
        </>
      )}
      {/* Right arm */}
      {pose === "cap" ? (
        <>
          <rect x="20" y="-82" width="16" height="30" rx="7" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" transform="rotate(40,28,-64)" />
          <ellipse cx="38" cy="-74" rx="9" ry="6" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
        </>
      ) : pose === "thumbsup" ? (
        <>
          <rect x="20" y="-64" width="16" height="32" rx="7" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" />
          <rect x="22" y="-50" width="13" height="17" rx="5" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
          <rect x="26" y="-64" width="10" height="16" rx="4" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x="20" y="-64" width="16" height="32" rx="7" fill={uniformColor} stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="28" cy="-34" rx="9" ry="6" fill={gloveColor} stroke="#0f172a" strokeWidth="1.5" />
        </>
      )}
      {/* Head */}
      <circle cx="0" cy="-90" r="22" fill="#fddcb5" stroke="#0f172a" strokeWidth="2" />
      {/* Cap */}
      <path d="M-22,-96 Q-22,-114 0,-114 Q22,-114 22,-96 Z" fill={capColor} stroke="#0f172a" strokeWidth="2" />
      <ellipse cx="0" cy="-96" rx="26" ry="7" fill={capColor} stroke="#0f172a" strokeWidth="2" />
      {/* Mask */}
      {showMask && (
        <>
          <rect x="-18" y="-88" width="36" height="18" rx="6" fill="#bfdbfe" stroke="#0f172a" strokeWidth="1.8" />
          <path d="M-16,-82 Q0,-79 16,-82" fill="none" stroke="#93c5fd" strokeWidth="1" />
        </>
      )}
      {/* Eyes */}
      <ellipse cx="-7" cy="-96" rx="5.5" ry="6" fill="white" stroke="#0f172a" strokeWidth="1.8" />
      <circle cx="-6" cy="-95" r="3.5" fill="#1e293b" />
      <circle cx="-5" cy="-97" r="1.2" fill="white" />
      <ellipse cx="7" cy="-96" rx="5.5" ry="6" fill="white" stroke="#0f172a" strokeWidth="1.8" />
      <circle cx="8" cy="-95" r="3.5" fill="#1e293b" />
      <circle cx="9" cy="-97" r="1.2" fill="white" />
      {/* Eyebrows */}
      <path d="M-12,-104 Q-7,-107 -2,-104" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2,-104 Q7,-107 12,-104" fill="none" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="-18" cy="-88" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="18" cy="-88" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
    </g>
  );
}

// ── Panel 1: Items laid out in locker room ──
function Panel1() {
  return (
    <svg viewBox="0 0 260 240" style={{ width: "100%", display: "block" }}>
      <rect width="260" height="240" fill="#f0f9ff" />
      {/* Caption bar */}
      <rect width="260" height="30" fill="#1e3a8a" />
      <text x="130" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">작업 시작 전...</text>
      {/* Locker/shelf */}
      <rect x="14" y="160" width="230" height="10" rx="3" fill="#94a3b8" />
      <rect x="14" y="100" width="230" height="65" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Items on shelf */}
      {/* ① Cap */}
      <ellipse cx="40" cy="148" rx="16" ry="7" fill="white" stroke="#1e293b" strokeWidth="2" />
      <path d="M24,148 Q24,132 40,132 Q56,132 56,148 Z" fill="white" stroke="#1e293b" strokeWidth="2" />
      <circle cx="32" cy="116" r="10" fill="#1e40af" />
      <text x="32" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">1</text>
      {/* ② Jacket */}
      <rect x="65" y="125" width="26" height="30" rx="4" fill="#1e40af" stroke="#0f172a" strokeWidth="1.8" />
      <path d="M72,125 L78,131 L84,125" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="75" cy="116" r="10" fill="#1e40af" />
      <text x="75" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">2</text>
      {/* ③ Pants */}
      <rect x="100" y="128" width="12" height="26" rx="4" fill="#1e40af" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="114" y="128" width="12" height="26" rx="4" fill="#1e40af" stroke="#0f172a" strokeWidth="1.5" />
      <circle cx="113" cy="116" r="10" fill="#1e40af" />
      <text x="113" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">3</text>
      {/* ④ Shoes */}
      <ellipse cx="152" cy="152" rx="14" ry="6" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
      <ellipse cx="152" cy="147" rx="11" ry="5" fill="#334155" />
      <circle cx="152" cy="116" r="10" fill="#1e293b" />
      <text x="152" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">4</text>
      {/* ⑤ Mask */}
      <rect x="172" y="132" width="26" height="18" rx="6" fill="#bfdbfe" stroke="#1e293b" strokeWidth="1.8" />
      <path d="M174,140 Q185,143 196,140" fill="none" stroke="#93c5fd" strokeWidth="1" />
      <circle cx="186" cy="116" r="10" fill="#7c3aed" />
      <text x="186" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">5</text>
      {/* ⑥ Gloves */}
      <ellipse cx="228" cy="146" rx="12" ry="8" fill="#10b981" stroke="#0f172a" strokeWidth="1.8" />
      <circle cx="222" cy="116" r="10" fill="#10b981" />
      <text x="222" y="121" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="system-ui">6</text>
      {/* Small worker character looking at items */}
      <Char cx={220} cy={230} scale={0.55} pose="normal" />
      {/* Thought lines */}
      <line x1="196" y1="205" x2="220" y2="165" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,2" />
      {/* Bottom note */}
      <text x="60" y="230" fontSize="11" fill="#475569" fontFamily="system-ui" fontWeight="600">순서대로 착용하세요!</text>
    </svg>
  );
}

// ── Panel 2: Putting on cap ──
function Panel2() {
  return (
    <svg viewBox="0 0 260 240" style={{ width: "100%", display: "block" }}>
      <rect width="260" height="240" fill="#fff7ed" />
      {/* Caption */}
      <rect width="260" height="30" fill="#c2410c" />
      <text x="130" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">① 위생모부터!</text>
      {/* Action lines */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 115, cy = 120;
        return (
          <line key={i}
            x1={cx + Math.cos(rad) * 55} y1={cy + Math.sin(rad) * 45}
            x2={cx + Math.cos(rad) * 72} y2={cy + Math.sin(rad) * 62}
            stroke="#fed7aa" strokeWidth="2.5" strokeLinecap="round" />
        );
      })}
      {/* Character - arms raised putting on cap */}
      <Char cx={115} cy={230} scale={0.85} pose="cap" showMask={false} />
      {/* Cap being placed (floating above head) */}
      <g transform="translate(95,40)">
        <ellipse cx="20" cy="18" rx="24" ry="9" fill="white" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M-4,18 Q-4,-2 20,-2 Q44,-2 44,18 Z" fill="white" stroke="#1e293b" strokeWidth="2.5" />
        <line x1="-4" y1="12" x2="44" y2="12" stroke="#bfdbfe" strokeWidth="1.8" />
      </g>
      {/* Down arrows showing cap being placed */}
      <text x="105" y="72" fontSize="18" fill="#c2410c" fontWeight="900" fontFamily="system-ui">↓</text>
      <text x="119" y="72" fontSize="18" fill="#c2410c" fontWeight="900" fontFamily="system-ui">↓</text>
      {/* Speech bubble */}
      <SpeechBubble x={148} y={82} w={100} h={28} text="위생모 먼저!" tail="bottom-left" />
    </svg>
  );
}

// ── Panel 3: Putting on mask and gloves ──
function Panel3() {
  return (
    <svg viewBox="0 0 260 240" style={{ width: "100%", display: "block" }}>
      <rect width="260" height="240" fill="#f0fdf4" />
      {/* Caption */}
      <rect width="260" height="30" fill="#065f46" />
      <text x="130" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">⑤ 마스크 → ⑥ 위생장갑</text>
      {/* Character - fully dressed */}
      <Char cx={100} cy={230} scale={0.85} pose="normal" />
      {/* Checklist on right */}
      {[
        { y: 65,  text: "✓ 위생모",  done: true },
        { y: 90,  text: "✓ 상의",    done: true },
        { y: 115, text: "✓ 하의",    done: true },
        { y: 140, text: "✓ 위생화",  done: true },
        { y: 165, text: "✓ 마스크",  done: true },
        { y: 190, text: "⬜ 위생장갑", done: false },
      ].map((item, i) => (
        <g key={i}>
          <rect x="158" y={item.y - 14} width="90" height="20" rx="5"
            fill={item.done ? "#dcfce7" : "#fee2e2"}
            stroke={item.done ? "#16a34a" : "#dc2626"} strokeWidth="1.5" />
          <text x="203" y={item.y} textAnchor="middle" fontSize="11" fontWeight="700"
            fill={item.done ? "#166534" : "#dc2626"} fontFamily="system-ui">{item.text}</text>
        </g>
      ))}
      {/* Glove floating with arrow */}
      <ellipse cx="148" cy="210" rx="20" ry="13" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
      <text x="148" y="215" textAnchor="middle" fontSize="10" fill="white" fontWeight="700" fontFamily="system-ui">장갑</text>
      <text x="148" y="195" textAnchor="middle" fontSize="16" fill="#10b981" fontWeight="900">↑</text>
    </svg>
  );
}

// ── Panel 4: Fully ready, entering work area ──
function Panel4() {
  return (
    <svg viewBox="0 0 260 240" style={{ width: "100%", display: "block" }}>
      <rect width="260" height="240" fill="#eff6ff" />
      {/* Caption */}
      <rect width="260" height="30" fill="#1e40af" />
      <text x="130" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">작업 준비 완료! ✓</text>
      {/* Door frame */}
      <rect x="165" y="90" width="80" height="150" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
      <rect x="170" y="95" width="70" height="140" rx="3" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="205" y="165" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="700" fontFamily="system-ui">작업장</text>
      <circle cx="170" cy="167" r="4" fill="#94a3b8" />
      {/* Sparkles */}
      {[[48,48],[220,60],[36,130],[240,140],[60,200]].map(([sx,sy],i) => (
        <text key={i} x={sx} y={sy} fontSize="14" fill="#fbbf24" fontFamily="system-ui">✦</text>
      ))}
      {/* Character - thumbs up */}
      <Char cx={110} cy={232} scale={0.88} pose="thumbsup" />
      {/* Speech bubble */}
      <SpeechBubble x={130} y={72} w={110} h={32} text="완료! 작업 시작!" fontSize={12} tail="bottom-left" />
      {/* All-clear badges */}
      <rect x="28" y="175" width="66" height="20" rx="10" fill="#1e40af" />
      <text x="61" y="189" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui">6/6 착용 완료</text>
    </svg>
  );
}

export default function TestWebtoon() {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Noto Sans KR', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "32px 20px 60px" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <span style={{ background: "#1e40af", color: "white", borderRadius: "20px", padding: "5px 16px", fontSize: "12px", fontWeight: "700" }}>HACCP Day 2</span>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#1e293b", margin: "12px 0 6px" }}>위생복 착용 규칙</h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>작업장 입장 전, 반드시 순서대로!</p>
        </div>

        {/* 2×2 Webtoon panels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px",
          background: "#1e293b",
          padding: "4px",
          borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          marginBottom: "32px",
        }}>
          <div style={{ borderRadius: "6px", overflow: "hidden" }}><Panel1 /></div>
          <div style={{ borderRadius: "6px", overflow: "hidden" }}><Panel2 /></div>
          <div style={{ borderRadius: "6px", overflow: "hidden" }}><Panel3 /></div>
          <div style={{ borderRadius: "6px", overflow: "hidden" }}><Panel4 /></div>
        </div>

        {/* Rules */}
        <h2 style={{ fontSize: "17px", fontWeight: "800", color: "#1e293b", marginBottom: "14px" }}>📋 세부 규칙</h2>
        {[
          "지정된 장소에서 정해진 순서대로 위생모 → 위생복 상의 → 위생복 하의 → 위생화 → 마스크 → 위생장갑 순으로 착용한다.",
          "개인 휴대품(목걸이·귀걸이·휴대폰)은 개인사물함에 보관하고, 제조 작업장에 절대 반입하지 않는다.",
          "착용한 위생모·위생복·위생화·마스크·위생장갑은 항상 청결하게 유지하고 주기적으로 교체한다.",
          "위생복장 착용 후에는 반드시 위생전실로 이동하여 절차를 완료한 후 작업장으로 입장한다.",
        ].map((rule, i) => (
          <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "white", borderRadius: "12px", padding: "14px 16px", marginBottom: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <span style={{ background: "#1e40af", color: "white", width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", flexShrink: 0 }}>{i + 1}</span>
            <p style={{ color: "#374151", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
