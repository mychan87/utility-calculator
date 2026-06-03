import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { materials, LANGUAGES } from "../../data/materials";

const UI_TEXT = {
  ko: {
    title: "HACCP 외국인 교육자료",
    subtitle: "외국인 근로자를 위한 식품안전 교육 시리즈",
    description: "매일 1개씩 새로운 HACCP 교육 자료가 추가됩니다. PDF로 다운받아 자유롭게 사용하세요!",
    dayLabel: "Day",
    viewBtn: "자료 보기 / PDF 다운로드",
    watchBtn: "영상 보기",
    totalMaterials: "전체 자료",
    freeBadge: "무료 다운로드",
    footer: "매일 업데이트 · 5개 언어 지원 · 무료 배포",
    langSupport: "지원 언어",
  },
  en: {
    title: "HACCP Education for Foreign Workers",
    subtitle: "Food Safety Education Series",
    description: "A new HACCP educational material is added every day. Download as PDF and use freely!",
    dayLabel: "Day",
    viewBtn: "View / Download PDF",
    watchBtn: "Watch Video",
    totalMaterials: "Total",
    freeBadge: "Free Download",
    footer: "Daily updates · 5 languages · Free distribution",
    langSupport: "Languages",
  },
  vi: {
    title: "Tài liệu đào tạo HACCP",
    subtitle: "Chuỗi đào tạo an toàn thực phẩm cho lao động nước ngoài",
    description: "Mỗi ngày thêm một tài liệu mới. Tải xuống PDF và sử dụng miễn phí!",
    dayLabel: "Ngày",
    viewBtn: "Xem / Tải PDF",
    watchBtn: "Xem video",
    totalMaterials: "Tổng",
    freeBadge: "Tải miễn phí",
    footer: "Cập nhật hàng ngày · 5 ngôn ngữ · Phân phối miễn phí",
    langSupport: "Ngôn ngữ",
  },
  zh: {
    title: "HACCP外籍劳工教育材料",
    subtitle: "食品安全教育系列",
    description: "每天添加一份新材料。以PDF格式下载免费使用！",
    dayLabel: "第",
    viewBtn: "查看 / 下载PDF",
    watchBtn: "观看视频",
    totalMaterials: "共",
    freeBadge: "免费下载",
    footer: "每日更新 · 5种语言 · 免费发布",
    langSupport: "语言",
  },
  tl: {
    title: "HACCP Materyal sa Edukasyon",
    subtitle: "Serye ng Edukasyon sa Kaligtasan ng Pagkain",
    description: "May bagong materyal na idinaragdag araw-araw. I-download bilang PDF nang libre!",
    dayLabel: "Araw",
    viewBtn: "Tingnan / I-download ang PDF",
    watchBtn: "Manood ng Video",
    totalMaterials: "Kabuuan",
    freeBadge: "Libreng Download",
    footer: "Pang-araw-araw na update · 5 wika · Libreng distribusyon",
    langSupport: "Mga wika",
  },
};

export default function HaccpIndex() {
  const [lang, setLang] = useState("ko");
  const ui = UI_TEXT[lang];

  return (
    <>
      <Head>
        <title>HACCP 외국인 교육자료 | Food Safety Education</title>
        <meta name="description" content="외국인 근로자를 위한 HACCP 식품안전 교육자료 무료 다운로드" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Noto Sans KR', system-ui, sans-serif" }}>
        {/* Hero */}
        <header style={{ background: "linear-gradient(135deg, #1e40af 0%, #065f46 100%)", color: "white", padding: "48px 20px 40px" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🥗</div>
            <h1 style={{ fontSize: "clamp(22px, 5vw, 34px)", fontWeight: "800", marginBottom: "12px", lineHeight: 1.3 }}>
              {ui.title}
            </h1>
            <p style={{ fontSize: "clamp(14px, 2.5vw, 17px)", opacity: 0.85, marginBottom: "6px" }}>
              {ui.subtitle}
            </p>
            <p style={{ fontSize: "13px", opacity: 0.7, marginBottom: "28px" }}>
              {ui.description}
            </p>

            {/* Language Selector */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "24px",
                    border: `2px solid ${lang === l.code ? "white" : "rgba(255,255,255,0.35)"}`,
                    background: lang === l.code ? "white" : "transparent",
                    color: lang === l.code ? "#1e40af" : "white",
                    cursor: "pointer",
                    fontWeight: lang === l.code ? "700" : "500",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Stats + Generate CTA */}
        <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "14px 20px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ background: "#059669", color: "white", padding: "4px 14px", borderRadius: "14px", fontSize: "13px", fontWeight: "700" }}>
            ✓ {ui.freeBadge}
          </span>
          <span style={{ color: "#64748b", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            📚 {ui.totalMaterials}: <strong style={{ color: "#1e293b" }}>{materials.length}</strong>
          </span>
          <span style={{ color: "#64748b", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            🌐 {ui.langSupport}: {LANGUAGES.map(l => l.flag).join(" ")}
          </span>
          <Link href="/haccp/generate"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#059669)", color: "white", padding: "6px 18px", borderRadius: "14px", fontSize: "13px", fontWeight: "700" }}>
            ✨ AI 자동 생성
          </Link>
          <Link href="/haccp/instagram-setup"
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", color: "white", padding: "6px 18px", borderRadius: "14px", fontSize: "13px", fontWeight: "700" }}>
            📸 Instagram 설정
          </Link>
        </div>

        {/* Materials Grid */}
        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {materials.map((m) => (
              <MaterialCard key={m.id} material={m} lang={lang} ui={ui} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: "36px 20px", fontSize: "14px" }}>
          <p style={{ marginBottom: "8px", color: "white", fontWeight: "600", fontSize: "16px" }}>
            🥗 HACCP 외국인 교육자료
          </p>
          <p>{ui.footer}</p>
          <p style={{ marginTop: "8px", fontSize: "12px" }}>© {new Date().getFullYear()} · 자유롭게 배포·사용·공유하세요</p>
        </footer>
      </div>
    </>
  );
}

function MaterialCard({ material: m, lang, ui }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        border: "1px solid #e2e8f0",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)";
      }}
    >
      {/* Card top color bar */}
      <div style={{ background: "linear-gradient(135deg, #1e40af, #065f46)", padding: "22px 20px", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <span style={{ background: "rgba(255,255,255,0.22)", borderRadius: "8px", padding: "3px 10px", fontSize: "12px", fontWeight: "700" }}>
            {ui.dayLabel} {m.day}
          </span>
          <span style={{ fontSize: "12px", opacity: 0.75 }}>{m.date}</span>
        </div>
        <h2 style={{ fontSize: "19px", fontWeight: "800", lineHeight: 1.35 }}>
          {m.title[lang] || m.title.ko}
        </h2>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px" }}>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.65", marginBottom: "18px" }}>
          {m.summary[lang] || m.summary.ko}
        </p>

        {/* Language flags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
          {LANGUAGES.map((l) => (
            <span key={l.code} title={l.label} style={{ fontSize: "18px", cursor: "default" }}>
              {l.flag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href={`/haccp/${m.slug}?lang=${lang}`}
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "11px",
              background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
              color: "white",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            📄 {ui.viewBtn}
          </Link>
          {m.youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${m.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "11px 14px",
                background: "#dc2626",
                color: "white",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              ▶
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
