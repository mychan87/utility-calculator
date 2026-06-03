import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const STEPS = [
  {
    num: 1,
    title: "Facebook 개발자 앱 만들기",
    desc: "Instagram API를 사용하려면 Facebook 개발자 계정과 앱이 필요합니다.",
    actions: [
      { label: "Facebook 개발자 콘솔 열기", url: "https://developers.facebook.com/apps" },
    ],
    detail: [
      '개발자 콘솔에서 "앱 만들기" 클릭',
      '앱 유형: "비즈니스" 선택',
      "앱 이름 입력 (예: HACCP Education)",
      '생성된 앱의 "앱 ID"와 "앱 시크릿"을 복사해두세요',
    ],
  },
  {
    num: 2,
    title: "Instagram Business 계정 연결",
    desc: "Instagram 계정이 비즈니스 또는 크리에이터 계정이어야 합니다.",
    actions: [
      { label: "Instagram 계정 유형 변경 방법", url: "https://help.instagram.com/502981923235522" },
    ],
    detail: [
      "Instagram 앱 → 프로필 → 설정 → 계정",
      '"전문가 계정으로 전환" 또는 "비즈니스 계정으로 전환" 선택',
      "Facebook 페이지와 Instagram 계정을 연결",
      "Facebook 비즈니스 관리자에서 Instagram 계정 ID 확인",
    ],
  },
  {
    num: 3,
    title: "액세스 토큰 발급",
    desc: "Graph API를 통해 Instagram에 게시하려면 장기 액세스 토큰이 필요합니다.",
    actions: [
      { label: "Graph API Explorer", url: "https://developers.facebook.com/tools/explorer" },
    ],
    detail: [
      "Graph API Explorer에서 생성한 앱 선택",
      '"사용자 토큰 생성" 클릭',
      "권한 선택: instagram_basic, instagram_content_publish, pages_read_engagement",
      "생성된 단기 토큰을 장기 토큰으로 교환 (60일 유효)",
      "토큰을 아래 설정 칸에 입력",
    ],
  },
  {
    num: 4,
    title: "Instagram 계정 ID 확인",
    desc: "비즈니스 계정의 숫자 ID가 필요합니다.",
    actions: [],
    detail: [
      "Graph API Explorer에서 요청: GET /me/accounts",
      "반환된 페이지 목록에서 Facebook 페이지 ID 확인",
      "GET /{page-id}?fields=instagram_business_account 실행",
      "반환된 id 값이 Instagram Business Account ID",
      "이 ID를 아래 설정 칸에 입력",
    ],
  },
];

export default function InstagramSetupPage() {
  const [token, setToken] = useState("");
  const [accountId, setAccountId] = useState("");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("ig_access_token") || "";
    const a = localStorage.getItem("ig_account_id") || "";
    setToken(t);
    setAccountId(a);
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

  return (
    <>
      <Head>
        <title>Instagram 계정 설정 | HACCP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
        {/* Nav */}
        <nav style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/haccp" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>← 목록</Link>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ color: "#64748b", fontSize: "13px" }}>Instagram 자동 게시 설정</span>
        </nav>

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px 80px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ color: "white", fontSize: "26px", fontWeight: "800", marginBottom: "8px" }}>
              📸 Instagram 자동 게시 설정
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              아래 4단계를 완료하면 콘텐츠 생성 후 Instagram에 자동으로 업로드됩니다.
            </p>
          </div>

          {/* Step-by-step guide */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {STEPS.map((step) => (
              <div key={step.num} style={{ background: "#1e293b", borderRadius: "16px", padding: "24px", border: "1px solid #334155" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "white", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "800", flexShrink: 0 }}>
                    {step.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ color: "white", fontSize: "17px", fontWeight: "700", marginBottom: "6px" }}>{step.title}</h2>
                    <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "14px" }}>{step.desc}</p>

                    {step.actions.map((a, i) => (
                      <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-block", padding: "7px 16px", background: "#0f172a", border: "1px solid #475569", borderRadius: "8px", color: "#94a3b8", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>
                        🔗 {a.label}
                      </a>
                    ))}

                    <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {step.detail.map((d, i) => (
                        <li key={i} style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Credential input */}
          <div style={{ background: "#1e293b", borderRadius: "20px", padding: "28px", border: "1px solid #334155" }}>
            <h2 style={{ color: "white", fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>🔑 API 정보 입력</h2>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "24px" }}>
              입력한 정보는 이 브라우저에만 저장됩니다 (localStorage). 서버로 전송되지 않습니다.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                  액세스 토큰 (Access Token)
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
                  Instagram Business Account ID
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
                style={{ padding: "12px 24px", background: saved ? "#059669" : "linear-gradient(135deg,#7c3aed,#db2777)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px", transition: "background 0.2s" }}>
                {saved ? "✅ 저장됨!" : "💾 저장"}
              </button>
              <Link href="/haccp/generate"
                style={{ padding: "12px 24px", background: "linear-gradient(135deg,#1d4ed8,#059669)", color: "white", borderRadius: "10px", fontWeight: "700", fontSize: "14px" }}>
                ✨ 콘텐츠 생성하러 가기
              </Link>
            </div>

            {/* Server-side env tip */}
            <div style={{ marginTop: "24px", background: "#0f172a", borderRadius: "10px", padding: "14px 16px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.7, margin: 0 }}>
                💡 <strong style={{ color: "#94a3b8" }}>서버 배포 시</strong>: Vercel/배포 환경에서는 환경변수로 설정하세요.<br />
                <code style={{ background: "#1e293b", padding: "2px 6px", borderRadius: "4px", fontFamily: "monospace", color: "#7dd3fc" }}>INSTAGRAM_ACCESS_TOKEN=EAA...</code><br />
                <code style={{ background: "#1e293b", padding: "2px 6px", borderRadius: "4px", fontFamily: "monospace", color: "#7dd3fc" }}>INSTAGRAM_BUSINESS_ACCOUNT_ID=178...</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
