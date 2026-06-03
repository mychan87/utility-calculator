import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: "account",
    phase: "PHASE 1",
    title: "Instagram 비즈니스 계정으로 전환",
    icon: "📱",
    color: "#e11d48",
    desc: "일반(개인) 계정을 비즈니스 또는 크리에이터 계정으로 바꿉니다. API 자동 게시에 필수입니다.",
    steps: [
      {
        title: "Instagram 앱 실행",
        icon: "📲",
        items: [
          "스마트폰에서 Instagram 앱을 엽니다.",
          "하단 오른쪽 내 프로필 아이콘을 탭합니다.",
        ],
      },
      {
        title: "설정 메뉴 진입",
        icon: "⚙️",
        items: [
          "프로필 화면 오른쪽 상단 ≡ (햄버거 메뉴) 탭",
          "하단의 '설정 및 활동' 탭",
        ],
        screen: ["프로필", "≡ 메뉴", "설정 및 활동"],
      },
      {
        title: "계정 유형 변경",
        icon: "🔄",
        items: [
          "'계정' 메뉴 선택",
          "화면 아래로 스크롤",
          "'전문가 계정으로 전환' 탭 (또는 '계정 유형 전환')",
        ],
        screen: ["설정 및 활동", "계정", "전문가 계정으로 전환"],
      },
      {
        title: "계정 유형 선택",
        icon: "🏢",
        items: [
          "비즈니스 ← 식품 회사·사업체 운영 시 권장",
          "크리에이터 ← 개인 교육 채널 운영 시 선택",
          "원하는 유형 선택 후 '다음' 탭",
        ],
        tip: "API 자동 게시는 두 유형 모두 가능합니다. 일반적으로 '비즈니스'를 권장합니다.",
      },
      {
        title: "카테고리 선택",
        icon: "🏷️",
        items: [
          "카테고리 검색창에 '교육' 또는 'Education' 입력",
          "'교육' 카테고리 선택 후 '완료'",
          "프로필에 카테고리를 표시할지 선택",
        ],
      },
      {
        title: "연락처 정보 확인",
        icon: "📧",
        items: [
          "이메일·전화번호 입력 (선택 사항)",
          "'다음' 또는 '건너뛰기' 탭",
          "✅ 비즈니스 계정 전환 완료!",
        ],
        tip: "전환 후에도 언제든지 일반 계정으로 되돌릴 수 있습니다.",
      },
    ],
  },
  {
    id: "facebook",
    phase: "PHASE 2",
    title: "Facebook 페이지 연결",
    icon: "🔗",
    color: "#2563eb",
    desc: "Instagram API는 Facebook 페이지와 연결된 계정만 사용할 수 있습니다. Facebook 페이지를 만들고 연결합니다.",
    steps: [
      {
        title: "Facebook 페이지 만들기 (없는 경우)",
        icon: "📄",
        items: [
          "Facebook 앱 → 하단 ≡ 메뉴 → '페이지'",
          "'새 페이지 만들기' 탭",
          "페이지 이름 입력 (예: HACCP 교육자료)",
          "카테고리: '교육' 선택 후 '페이지 만들기'",
        ],
        action: { label: "Facebook에서 페이지 만들기", url: "https://www.facebook.com/pages/create" },
      },
      {
        title: "Instagram에서 Facebook 페이지 연결",
        icon: "🔗",
        items: [
          "Instagram 앱 → 프로필 → ≡ 메뉴 → 설정 및 활동",
          "'계정 센터' 또는 '연결된 계정' 탭",
          "Facebook 로그인 후 페이지 선택",
          "연결 완료 확인",
        ],
        screen: ["설정 및 활동", "계정 센터", "Facebook 연결"],
      },
    ],
  },
  {
    id: "developer",
    phase: "PHASE 3",
    title: "Facebook 개발자 앱 만들기",
    icon: "🛠️",
    color: "#7c3aed",
    desc: "Instagram Graph API를 호출하려면 Facebook 개발자 앱이 필요합니다.",
    steps: [
      {
        title: "개발자 계정 등록",
        icon: "👤",
        items: [
          "아래 링크에서 Facebook 개발자 등록",
          "Facebook 계정으로 로그인 후 '시작하기'",
          "이메일 인증 완료",
        ],
        action: { label: "developers.facebook.com 열기", url: "https://developers.facebook.com" },
      },
      {
        title: "새 앱 만들기",
        icon: "➕",
        items: [
          "개발자 콘솔 → '내 앱' → '앱 만들기' 클릭",
          "사용 사례: '기타' → '다음'",
          "앱 유형: '비즈니스' 선택",
          "앱 이름 입력 (예: HACCP-Education), 이메일 확인 → '앱 만들기'",
        ],
        action: { label: "앱 만들기 페이지", url: "https://developers.facebook.com/apps/create" },
      },
      {
        title: "Instagram 제품 추가",
        icon: "📦",
        items: [
          "앱 대시보드 → 왼쪽 사이드바 '제품 추가'",
          "'Instagram' 항목 찾기 → '설정' 클릭",
          "Instagram Basic Display 또는 Instagram Graph API 추가",
        ],
      },
    ],
  },
  {
    id: "token",
    phase: "PHASE 4",
    title: "액세스 토큰 발급",
    icon: "🔑",
    color: "#059669",
    desc: "API 호출에 사용할 장기 액세스 토큰(60일)을 발급받습니다.",
    steps: [
      {
        title: "Graph API Explorer 열기",
        icon: "🔭",
        items: [
          "아래 링크에서 Graph API Explorer 열기",
          "오른쪽 상단 'Meta 앱' 드롭다운 → 생성한 앱 선택",
        ],
        action: { label: "Graph API Explorer 열기", url: "https://developers.facebook.com/tools/explorer" },
      },
      {
        title: "사용자 토큰 생성",
        icon: "🎫",
        items: [
          "'사용자 또는 페이지' 드롭다운 → '사용자 액세스 토큰 생성'",
          "권한 추가 (Add a Permission):",
          "  ✓ instagram_basic",
          "  ✓ instagram_content_publish",
          "  ✓ pages_show_list",
          "  ✓ pages_read_engagement",
          "'토큰 생성' 클릭 → Facebook 로그인 → 권한 허용",
        ],
        tip: "생성된 토큰은 단기(1시간) 토큰입니다. 다음 단계에서 장기 토큰으로 교환합니다.",
      },
      {
        title: "단기 → 장기 토큰 교환 (60일)",
        icon: "♾️",
        items: [
          "Graph API Explorer에서 아래 주소로 GET 요청:",
          "GET /oauth/access_token",
          "  ?grant_type=fb_exchange_token",
          "  &client_id={앱 ID}",
          "  &client_secret={앱 시크릿}",
          "  &fb_exchange_token={단기 토큰}",
          "응답의 access_token 값을 복사 → 아래 입력란에 붙여넣기",
        ],
        tip: "앱 ID와 시크릿은 개발자 콘솔 → 내 앱 → 설정 → 기본 설정에서 확인합니다.",
      },
    ],
  },
  {
    id: "accountid",
    phase: "PHASE 5",
    title: "Instagram 계정 ID 확인",
    icon: "🆔",
    color: "#d97706",
    desc: "자동 게시에 필요한 Instagram Business Account ID를 찾습니다.",
    steps: [
      {
        title: "Facebook 페이지 ID 확인",
        icon: "📋",
        items: [
          "Graph API Explorer → GET /me/accounts 요청",
          "응답 JSON에서 연결된 페이지 목록 확인",
          "사용할 페이지의 id 값 복사",
        ],
      },
      {
        title: "Instagram 계정 ID 추출",
        icon: "🔢",
        items: [
          "GET /{페이지 id}?fields=instagram_business_account 요청",
          "예: GET /123456789?fields=instagram_business_account",
          "응답: { \"instagram_business_account\": { \"id\": \"178414…\" } }",
          "이 id 값이 Instagram Business Account ID",
          "아래 입력란에 붙여넣기",
        ],
        tip: "페이지 ID와 Instagram 계정 ID는 다른 값입니다. instagram_business_account.id 를 사용하세요.",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function PhaseCard({ phase, index, open, onToggle }) {
  const isLast = index === PHASES.length - 1;

  return (
    <div style={{ position: "relative" }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{ position: "absolute", left: "27px", top: "72px", width: "2px", bottom: "-16px", background: "linear-gradient(to bottom, " + phase.color + "44, transparent)", zIndex: 0 }} />
      )}

      <div style={{ background: "#1e293b", borderRadius: "16px", border: `1px solid ${open ? phase.color + "55" : "#334155"}`, overflow: "hidden", transition: "border-color 0.2s", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <button
          onClick={onToggle}
          style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", textAlign: "left" }}
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: open ? phase.color : "#334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0, transition: "background 0.2s" }}>
            {phase.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: open ? phase.color : "#64748b", fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "3px" }}>
              {phase.phase}
            </div>
            <div style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>{phase.title}</div>
          </div>
          <div style={{ color: "#475569", fontSize: "20px", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
            ▾
          </div>
        </button>

        {/* Body */}
        {open && (
          <div style={{ padding: "0 24px 24px" }}>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px", paddingTop: "4px", borderTop: "1px solid #334155", paddingTop: "16px" }}>
              {phase.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {phase.steps.map((step, si) => (
                <div key={si} style={{ background: "#0f172a", borderRadius: "12px", padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "18px" }}>{step.icon}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ background: phase.color, color: "white", width: "20px", height: "20px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800", flexShrink: 0 }}>
                        {si + 1}
                      </span>
                      <span style={{ color: "white", fontSize: "14px", fontWeight: "700" }}>{step.title}</span>
                    </div>
                  </div>

                  {/* Screen breadcrumb */}
                  {step.screen && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
                      {step.screen.map((s, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ background: "#1e293b", color: "#94a3b8", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: "600" }}>{s}</span>
                          {i < step.screen.length - 1 && <span style={{ color: "#475569", fontSize: "12px" }}>›</span>}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {step.items.map((item, ii) => (
                      <li key={ii} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <span style={{ color: phase.color, flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>
                          {item.startsWith("  ✓") ? "" : "•"}
                        </span>
                        <span style={{ color: item.startsWith("  ✓") ? "#10b981" : "#94a3b8", fontSize: "13px", lineHeight: 1.6, fontFamily: item.includes("?") || item.includes("{") ? "monospace" : "inherit", fontSize: item.includes("?") || item.includes("{") ? "12px" : "13px" }}>
                          {item.replace(/^  /, "")}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {step.action && (
                    <a href={step.action.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "12px", padding: "7px 14px", background: "#1e293b", border: `1px solid ${phase.color}44`, borderRadius: "8px", color: phase.color, fontSize: "13px", fontWeight: "600" }}>
                      🔗 {step.action.label}
                    </a>
                  )}

                  {step.tip && (
                    <div style={{ marginTop: "12px", background: "#1e293b", borderLeft: `3px solid ${phase.color}`, borderRadius: "0 8px 8px 0", padding: "8px 12px", color: "#64748b", fontSize: "12px", lineHeight: 1.6 }}>
                      💡 {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InstagramSetupPage() {
  const [openPhase, setOpenPhase] = useState("account");
  const [token, setToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("ig_access_token") || "");
    setAccountId(localStorage.getItem("ig_account_id") || "");
  }, []);

  const save = () => {
    localStorage.setItem("ig_access_token", token.trim());
    localStorage.setItem("ig_account_id", accountId.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const testConnection = async () => {
    if (!token.trim() || !accountId.trim()) {
      setTestResult({ ok: false, msg: "토큰과 계정 ID를 먼저 입력해주세요." });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `https://graph.facebook.com/v18.0/${accountId.trim()}?fields=name,username&access_token=${token.trim()}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setTestResult({ ok: true, msg: `✅ 연결 성공! 계정: @${data.username || data.name}` });
    } catch (e) {
      setTestResult({ ok: false, msg: `❌ 연결 실패: ${e.message}` });
    } finally {
      setTesting(false);
    }
  };

  const toggle = (id) => setOpenPhase((prev) => (prev === id ? null : id));

  return (
    <>
      <Head>
        <title>Instagram 계정 설정 | HACCP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
        <nav style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/haccp" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>← 목록</Link>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ color: "#64748b", fontSize: "13px" }}>Instagram 자동 게시 설정</span>
        </nav>

        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 20px 80px" }}>
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <h1 style={{ color: "white", fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>
              📸 Instagram 자동 게시 설정
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7 }}>
              일반 계정 전환부터 API 연결까지 5단계로 안내합니다.<br />
              단계를 클릭해 펼쳐보세요.
            </p>
          </div>

          {/* Progress overview */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "32px", flexWrap: "wrap" }}>
            {PHASES.map((p, i) => (
              <button key={p.id} onClick={() => toggle(p.id)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", border: `2px solid ${openPhase === p.id ? p.color : "#334155"}`, background: openPhase === p.id ? p.color + "22" : "transparent", cursor: "pointer", color: openPhase === p.id ? p.color : "#64748b", fontSize: "13px", fontWeight: "600" }}>
                <span>{p.icon}</span>
                <span style={{ display: "none", }}>{p.phase}</span>
                <span>{i + 1}단계</span>
              </button>
            ))}
          </div>

          {/* Phase cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                index={i}
                open={openPhase === phase.id}
                onToggle={() => toggle(phase.id)}
              />
            ))}
          </div>

          {/* Credential input */}
          <div style={{ background: "#1e293b", borderRadius: "20px", padding: "28px", border: "1px solid #334155" }}>
            <h2 style={{ color: "white", fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>
              🔑 API 정보 입력
            </h2>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "24px" }}>
              5단계 완료 후 아래에 토큰과 계정 ID를 입력하세요.<br />
              입력 정보는 이 브라우저에만 저장됩니다 (서버로 전송하지 않습니다).
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                  액세스 토큰 <span style={{ color: "#475569", fontWeight: "400" }}>(PHASE 4에서 발급)</span>
                </label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="EAA..."
                  type="password"
                  style={{ width: "100%", padding: "12px 16px", background: "#0f172a", border: "2px solid #334155", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "monospace" }}
                />
              </div>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                  Instagram Business Account ID <span style={{ color: "#475569", fontWeight: "400" }}>(PHASE 5에서 확인)</span>
                </label>
                <input
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="17841400000000000"
                  style={{ width: "100%", padding: "12px 16px", background: "#0f172a", border: "2px solid #334155", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "monospace" }}
                />
              </div>
            </div>

            {testResult && (
              <div style={{ background: testResult.ok ? "#064e3b" : "#450a0a", border: `1px solid ${testResult.ok ? "#10b981" : "#ef4444"}`, borderRadius: "10px", padding: "12px 16px", marginBottom: "16px", color: testResult.ok ? "#10b981" : "#f87171", fontSize: "14px", fontWeight: "600" }}>
                {testResult.msg}
              </div>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={testConnection} disabled={testing}
                style={{ padding: "12px 24px", background: "#334155", color: "white", border: "none", borderRadius: "10px", cursor: testing ? "not-allowed" : "pointer", fontWeight: "700", fontSize: "14px" }}>
                {testing ? "⏳ 확인 중..." : "🔌 연결 테스트"}
              </button>
              <button onClick={save}
                style={{ padding: "12px 24px", background: saved ? "#059669" : "linear-gradient(135deg,#7c3aed,#db2777)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px" }}>
                {saved ? "✅ 저장됨!" : "💾 저장"}
              </button>
              <Link href="/haccp/generate"
                style={{ padding: "12px 24px", background: "linear-gradient(135deg,#1d4ed8,#059669)", color: "white", borderRadius: "10px", fontWeight: "700", fontSize: "14px" }}>
                ✨ 콘텐츠 생성하러 가기
              </Link>
            </div>

            <div style={{ marginTop: "24px", background: "#0f172a", borderRadius: "10px", padding: "14px 16px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.8, margin: 0 }}>
                💡 <strong style={{ color: "#94a3b8" }}>서버 배포(Vercel 등) 시</strong> 환경변수로 설정 가능합니다.<br />
                <code style={{ background: "#1e293b", padding: "1px 6px", borderRadius: "4px", fontFamily: "monospace", color: "#7dd3fc" }}>INSTAGRAM_ACCESS_TOKEN=EAA...</code><br />
                <code style={{ background: "#1e293b", padding: "1px 6px", borderRadius: "4px", fontFamily: "monospace", color: "#7dd3fc" }}>INSTAGRAM_BUSINESS_ACCOUNT_ID=178...</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
