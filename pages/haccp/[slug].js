import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { materials, LANGUAGES } from "../../data/materials";

export async function getStaticPaths() {
  const paths = materials.map((m) => ({ params: { slug: m.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const material = materials.find((m) => m.slug === params.slug) || null;
  return { props: { material } };
}

export default function MaterialPage({ material }) {
  const router = useRouter();
  const initialLang = (router.query.lang && LANGUAGES.find(l => l.code === router.query.lang)) ? router.query.lang : "ko";
  const [lang, setLang] = useState(initialLang);

  if (!material) return <div>Not found</div>;

  const content = material.content[lang] || material.content.ko;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>{material.title[lang] || material.title.ko} | HACCP 교육자료</title>
        <meta name="description" content={material.summary[lang] || material.summary.ko} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .print-page { box-shadow: none !important; border: none !important; max-width: 100% !important; }
          }
          @page { margin: 15mm; size: A4; }
        `}</style>
      </Head>

      <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Noto Sans KR', system-ui, sans-serif" }}>
        {/* Top Nav */}
        <nav
          className="no-print"
          style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <Link
            href="/haccp"
            style={{ color: "#1e40af", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            ← 목록으로
          </Link>
          <span style={{ color: "#e2e8f0" }}>|</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>Day {material.day} · {material.date}</span>

          {/* Language Switcher */}
          <div style={{ display: "flex", gap: "6px", marginLeft: "auto", flexWrap: "wrap" }}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                title={l.label}
                style={{
                  padding: "6px 12px",
                  borderRadius: "16px",
                  border: `2px solid ${lang === l.code ? "#1e40af" : "#e2e8f0"}`,
                  background: lang === l.code ? "#1e40af" : "white",
                  color: lang === l.code ? "white" : "#64748b",
                  cursor: "pointer",
                  fontWeight: lang === l.code ? "700" : "500",
                  fontSize: "13px",
                  transition: "all 0.2s",
                }}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content + PDF */}
        <main style={{ maxWidth: "800px", margin: "32px auto", padding: "0 16px 60px" }}>
          {/* Download Buttons */}
          <div className="no-print" style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <button
              onClick={handlePrint}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📄 PDF로 저장 / 인쇄
            </button>
            <Link
              href={`/haccp/instagram/${material.slug}?lang=${lang}`}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                color: "white",
                borderRadius: "12px",
                fontWeight: "700",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📸 Instagram 카드
            </Link>
            {material.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${material.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 24px",
                  background: "#dc2626",
                  color: "white",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                ▶ YouTube 영상
              </a>
            )}
          </div>

          {/* Print hint */}
          <p className="no-print" style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>
            💡 [PDF로 저장] 클릭 후 "PDF로 저장"을 선택하면 다운로드됩니다.
          </p>

          {/* The actual printable document */}
          <div
            className="print-page"
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Document Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #065f46 100%)",
                padding: "32px",
                color: "white",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "10px",
                    padding: "6px 14px",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  HACCP Day {material.day}
                </span>
                <span style={{ fontSize: "13px", opacity: 0.8 }}>{material.date}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    padding: "4px 10px",
                    fontSize: "12px",
                  }}
                >
                  {LANGUAGES.find((l) => l.code === lang)?.flag}{" "}
                  {LANGUAGES.find((l) => l.code === lang)?.label}
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(20px, 4vw, 30px)", fontWeight: "800", lineHeight: 1.3, marginBottom: "10px" }}>
                {material.title[lang] || material.title.ko}
              </h1>
              <p style={{ fontSize: "15px", opacity: 0.85, lineHeight: 1.6 }}>
                {material.summary[lang] || material.summary.ko}
              </p>
            </div>

            {/* Document Body */}
            <div style={{ padding: "36px 32px" }}>
              {content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {/* Document Footer */}
            <div
              style={{
                borderTop: "2px solid #f1f5f9",
                padding: "20px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                HACCP 외국인 교육자료 · Day {material.day} · 무료 배포 가능
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                {LANGUAGES.map((l) => (
                  <span key={l.code} style={{ fontSize: "14px" }} title={l.label}>
                    {l.flag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation between days */}
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" }}>
            {material.day > 1 && (
              <Link
                href={`/haccp/${materials.find((m) => m.day === material.day - 1)?.slug}?lang=${lang}`}
                style={{
                  padding: "12px 20px",
                  background: "white",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  color: "#475569",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                ← Day {material.day - 1}
              </Link>
            )}
            <div style={{ flex: 1 }} />
            {materials.find((m) => m.day === material.day + 1) && (
              <Link
                href={`/haccp/${materials.find((m) => m.day === material.day + 1)?.slug}?lang=${lang}`}
                style={{
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #1e40af, #065f46)",
                  borderRadius: "12px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Day {material.day + 1} →
              </Link>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function ContentBlock({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1e293b",
            marginTop: "32px",
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: "2px solid #e2e8f0",
          }}
        >
          {block.text}
        </h2>
      );
    case "text":
      return (
        <p
          style={{
            color: "#374151",
            lineHeight: "1.8",
            fontSize: "15px",
            marginBottom: "16px",
          }}
        >
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul style={{ margin: "0 0 20px 0", paddingLeft: "0", listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li
              key={i}
              style={{
                padding: "10px 14px",
                marginBottom: "8px",
                background: "#f8fafc",
                borderRadius: "10px",
                borderLeft: "4px solid #1e40af",
                color: "#374151",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol style={{ margin: "0 0 20px 0", paddingLeft: "0", listStyle: "none", counterReset: "step" }}>
          {block.items.map((item, i) => (
            <li
              key={i}
              style={{
                padding: "10px 14px 10px 50px",
                marginBottom: "8px",
                background: "#f8fafc",
                borderRadius: "10px",
                color: "#374151",
                fontSize: "15px",
                lineHeight: "1.6",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#1e40af",
                  color: "white",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "highlight":
      return (
        <div
          style={{
            background: "linear-gradient(135deg, #eff6ff, #ecfdf5)",
            border: "2px solid #bfdbfe",
            borderRadius: "14px",
            padding: "18px 20px",
            marginTop: "24px",
            color: "#1e40af",
            fontWeight: "700",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        >
          💡 {block.text}
        </div>
      );
    default:
      return null;
  }
}
