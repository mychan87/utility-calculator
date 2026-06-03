import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LANGUAGES } from "../../../data/materials";

const SLIDE_SIZE = 540;

// ─── Slide components (identical to instagram/[slug].js) ──────────────────────

function buildSlides(content, title, summary) {
  const slides = [{ type: "cover", title, summary }];
  let current = null;
  for (const block of content) {
    if (block.type === "heading") {
      if (current) slides.push(current);
      current = { type: "content", heading: block.text, items: [] };
    } else if (block.type === "highlight") {
      if (current) slides.push(current);
      slides.push({ type: "highlight", text: block.text });
      current = null;
    } else {
      if (!current) current = { type: "content", heading: null, items: [] };
      current.items.push(block);
    }
  }
  if (current) slides.push(current);
  return slides;
}

function CoverSlide({ title, summary, lang }) {
  const l = LANGUAGES.find((x) => x.code === lang);
  return (
    <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, background: "linear-gradient(145deg,#1e3a8a 0%,#065f46 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "52px 48px", boxSizing: "border-box", position: "relative", overflow: "hidden", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ position: "absolute", top: -70, right: -70, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: "24px", padding: "9px 22px", fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", marginBottom: "26px" }}>HACCP 교육자료</div>
      <h1 style={{ color: "white", fontSize: "34px", fontWeight: "900", textAlign: "center", lineHeight: 1.3, margin: "0 0 22px 0" }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "15px", textAlign: "center", lineHeight: 1.75, margin: "0 0 40px 0" }}>{summary}</p>
      <div style={{ position: "absolute", bottom: "22px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "10px" }}>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>🥗 HACCP 외국인 교육자료</span>
        {l && <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "2px 10px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{l.flag} {l.label}</span>}
      </div>
    </div>
  );
}

function ContentSlide({ heading, items, slideNum, total }) {
  return (
    <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, background: "white", display: "flex", flexDirection: "column", padding: "38px 40px", boxSizing: "border-box", overflow: "hidden", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ height: "5px", background: "linear-gradient(90deg,#1e3a8a,#065f46)", borderRadius: "3px", marginBottom: "24px", flexShrink: 0 }} />
      {heading && <h2 style={{ fontSize: "21px", fontWeight: "800", color: "#1e293b", margin: "0 0 18px 0", lineHeight: 1.3, flexShrink: 0 }}>{heading}</h2>}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
        {items.map((block, i) => {
          if (block.type === "text") return <p key={i} style={{ color: "#374151", fontSize: "13.5px", lineHeight: 1.75, margin: 0 }}>{block.text}</p>;
          if (block.type === "bullets") return (
            <ul key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {block.items.map((item, j) => (
                <li key={j} style={{ display: "flex", gap: "10px", background: "#f8fafc", borderRadius: "8px", padding: "9px 13px", borderLeft: "3px solid #1e3a8a" }}>
                  <span style={{ color: "#374151", fontSize: "12.5px", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          );
          if (block.type === "numbered") return (
            <ol key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
              {block.items.map((item, j) => (
                <li key={j} style={{ display: "flex", gap: "10px", background: "#f8fafc", borderRadius: "8px", padding: "9px 13px" }}>
                  <span style={{ background: "#1e3a8a", color: "white", minWidth: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0, marginTop: "1px" }}>{j + 1}</span>
                  <span style={{ color: "#374151", fontSize: "12.5px", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ol>
          );
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", flexShrink: 0 }}>
        <span style={{ color: "#cbd5e1", fontSize: "11px" }}>🥗 HACCP 외국인 교육자료</span>
        <span style={{ color: "#cbd5e1", fontSize: "11px" }}>{slideNum}/{total}</span>
      </div>
    </div>
  );
}

function HighlightSlide({ text, slideNum, total }) {
  return (
    <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, background: "linear-gradient(145deg,#eff6ff 0%,#ecfdf5 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "52px 48px", boxSizing: "border-box", position: "relative", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ fontSize: "56px", marginBottom: "28px" }}>💡</div>
      <p style={{ color: "#1e3a8a", fontSize: "19px", fontWeight: "800", textAlign: "center", lineHeight: 1.7, margin: "0 0 40px 0" }}>{text}</p>
      <div style={{ background: "linear-gradient(135deg,#1e3a8a,#065f46)", borderRadius: "16px", padding: "14px 32px" }}>
        <span style={{ color: "white", fontSize: "14px", fontWeight: "700" }}>🥗 HACCP 외국인 교육자료</span>
      </div>
      <span style={{ position: "absolute", bottom: "20px", right: "24px", color: "#bfdbfe", fontSize: "12px" }}>{slideNum}/{total}</span>
    </div>
  );
}

function SlideRenderer({ slide, lang, slideNum, total }) {
  switch (slide.type) {
    case "cover": return <CoverSlide title={slide.title} summary={slide.summary} lang={lang} />;
    case "content": return <ContentSlide heading={slide.heading} items={slide.items} slideNum={slideNum} total={total} />;
    case "highlight": return <HighlightSlide text={slide.text} slideNum={slideNum} total={total} />;
    default: return null;
  }
}

function SlidePreview({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([e]) => setScale(e.contentRect.width / SLIDE_SIZE));
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={containerRef} style={{ width: "100%", aspectRatio: "1", position: "relative", overflow: "hidden", borderRadius: "10px" }}>
      <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, transformOrigin: "top left", transform: `scale(${scale})`, position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Video generator using canvas + MediaRecorder ─────────────────────────────

async function generateVideo(captureContainerEl, slideCount, slideDurationMs = 2500) {
  const html2canvas = (await import("html2canvas")).default;
  const canvasEl = document.createElement("canvas");
  canvasEl.width = SLIDE_SIZE * 2;
  canvasEl.height = SLIDE_SIZE * 2;
  const ctx = canvasEl.getContext("2d");

  const stream = canvasEl.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
  const chunks = [];
  recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

  recorder.start();

  for (let i = 0; i < slideCount; i++) {
    const slideEl = captureContainerEl.children[i];
    if (!slideEl) continue;
    const slideCanvas = await html2canvas(slideEl, { scale: 2, useCORS: true, backgroundColor: null, width: SLIDE_SIZE, height: SLIDE_SIZE });
    ctx.drawImage(slideCanvas, 0, 0, SLIDE_SIZE * 2, SLIDE_SIZE * 2);
    await new Promise((r) => setTimeout(r, slideDurationMs));
  }

  recorder.stop();

  return new Promise((resolve) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      resolve(blob);
    };
  });
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const STEPS = ["idle", "generating", "done"];

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [step, setStep] = useState("idle");
  const [error, setError] = useState("");
  const [material, setMaterial] = useState(null);
  const [lang, setLang] = useState("ko");
  const [dlState, setDlState] = useState({ cards: false, pdf: false, video: false, insta: false });
  const [instaStatus, setInstaStatus] = useState("");
  const captureRef = useRef(null);

  const generate = useCallback(async () => {
    if (!topic.trim()) return;
    setStep("generating");
    setError("");
    try {
      const res = await fetch("/api/haccp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "생성 실패");
      setMaterial(json.material);
      setStep("done");
    } catch (e) {
      setError(e.message);
      setStep("idle");
    }
  }, [topic]);

  const content = material?.content?.[lang] || material?.content?.ko || [];
  const slides = material
    ? buildSlides(content, material.title[lang] || material.title.ko, material.summary[lang] || material.summary.ko)
    : [];

  // Download cards as combined single PNG
  const downloadCards = useCallback(async () => {
    if (!captureRef.current) return;
    setDlState((s) => ({ ...s, cards: true }));
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current, { scale: 2, useCORS: true, backgroundColor: null, width: SLIDE_SIZE, height: SLIDE_SIZE * slides.length });
      const a = document.createElement("a");
      a.download = `haccp-${lang}-cards.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    } finally {
      setDlState((s) => ({ ...s, cards: false }));
    }
  }, [slides.length, lang]);

  // Print PDF
  const downloadPDF = useCallback(() => {
    setDlState((s) => ({ ...s, pdf: true }));
    window.print();
    setTimeout(() => setDlState((s) => ({ ...s, pdf: false })), 1500);
  }, []);

  // Generate and download video
  const downloadVideo = useCallback(async () => {
    if (!captureRef.current) return;
    setDlState((s) => ({ ...s, video: true }));
    try {
      const blob = await generateVideo(captureRef.current, slides.length);
      const a = document.createElement("a");
      a.download = `haccp-${lang}-shorts.webm`;
      a.href = URL.createObjectURL(blob);
      a.click();
    } catch (e) {
      alert("영상 생성 실패: " + e.message);
    } finally {
      setDlState((s) => ({ ...s, video: false }));
    }
  }, [slides.length, lang]);

  // Post to Instagram
  const postToInstagram = useCallback(async () => {
    if (!captureRef.current || !material) return;
    setDlState((s) => ({ ...s, insta: true }));
    setInstaStatus("이미지 생성 중...");
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(captureRef.current.children[0], { scale: 2, useCORS: true, backgroundColor: null });
      const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
      // Upload to a public URL — requires NEXT_PUBLIC_SITE_URL + file upload endpoint
      setInstaStatus("Instagram API 호출 중...");
      const caption = `${material.title.ko}\n\n${material.summary.ko}\n\n#HACCP #식품안전 #외국인근로자`;
      const res = await fetch("/api/haccp/instagram-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: canvas.toDataURL("image/png"), caption }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || json.setup || "실패");
      setInstaStatus("✅ Instagram 게시 완료!");
    } catch (e) {
      setInstaStatus("⚠️ " + e.message);
    } finally {
      setDlState((s) => ({ ...s, insta: false }));
    }
  }, [material, lang]);

  return (
    <>
      <Head>
        <title>HACCP 콘텐츠 자동 생성</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .print-area { display: block !important; }
          }
          .print-area { display: none; }
        `}</style>
      </Head>

      {/* Hidden capture container for html2canvas / video */}
      {material && (
        <div ref={captureRef} aria-hidden="true" style={{ position: "fixed", left: "-9999px", top: 0, width: SLIDE_SIZE, zIndex: -1 }}>
          {slides.map((slide, i) => (
            <div key={`cap-${lang}-${i}`} style={{ width: SLIDE_SIZE, height: SLIDE_SIZE }}>
              <SlideRenderer slide={slide} lang={lang} slideNum={i + 1} total={slides.length} />
            </div>
          ))}
        </div>
      )}

      {/* Print area (PDF) */}
      {material && (
        <div className="print-area" style={{ padding: "20mm", fontFamily: "system-ui,sans-serif", maxWidth: "800px" }}>
          <div style={{ background: "linear-gradient(135deg,#1e3a8a,#065f46)", color: "white", padding: "24px 28px", borderRadius: "12px", marginBottom: "20px" }}>
            <div style={{ fontSize: "13px", opacity: 0.8, marginBottom: "6px" }}>HACCP 교육자료 · {material.date}</div>
            <h1 style={{ fontSize: "26px", fontWeight: "900", margin: "0 0 10px 0" }}>{material.title[lang] || material.title.ko}</h1>
            <p style={{ margin: 0, opacity: 0.85 }}>{material.summary[lang] || material.summary.ko}</p>
          </div>
          {content.map((block, i) => {
            if (block.type === "heading") return <h2 key={i} style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px", margin: "20px 0 10px 0" }}>{block.text}</h2>;
            if (block.type === "text") return <p key={i} style={{ color: "#374151", lineHeight: 1.8, margin: "0 0 12px 0" }}>{block.text}</p>;
            if (block.type === "bullets") return <ul key={i} style={{ margin: "0 0 12px 0", paddingLeft: "20px" }}>{block.items.map((t, j) => <li key={j} style={{ color: "#374151", lineHeight: 1.7, marginBottom: "4px" }}>{t}</li>)}</ul>;
            if (block.type === "numbered") return <ol key={i} style={{ margin: "0 0 12px 0", paddingLeft: "20px" }}>{block.items.map((t, j) => <li key={j} style={{ color: "#374151", lineHeight: 1.7, marginBottom: "4px" }}>{t}</li>)}</ol>;
            if (block.type === "highlight") return <div key={i} style={{ background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: "10px", padding: "14px 18px", color: "#1e3a8a", fontWeight: "700", marginTop: "16px" }}>💡 {block.text}</div>;
            return null;
          })}
          <div style={{ marginTop: "24px", borderTop: "1px solid #e2e8f0", paddingTop: "12px", color: "#94a3b8", fontSize: "12px" }}>
            🥗 HACCP 외국인 교육자료 · 무료 배포 가능 · {LANGUAGES.map(l => l.flag).join(" ")}
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="no-print" style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
        {/* Nav */}
        <nav style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/haccp" style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>← 목록</Link>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ color: "#64748b", fontSize: "13px" }}>AI 콘텐츠 자동 생성</span>
        </nav>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
          {/* Input Section */}
          <div style={{ background: "#1e293b", borderRadius: "20px", padding: "32px", marginBottom: "32px" }}>
            <h1 style={{ color: "white", fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}>🤖 HACCP 콘텐츠 자동 생성</h1>
            <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>주제를 입력하면 AI가 5개 언어로 카드뉴스·PDF·영상 자료를 자동으로 만들어 드립니다.</p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generate()}
                placeholder="예: 손 씻기의 중요성, 식품 보관 온도, 교차오염 방지..."
                style={{ flex: 1, minWidth: "240px", padding: "14px 18px", background: "#0f172a", border: "2px solid #334155", borderRadius: "12px", color: "white", fontSize: "15px", outline: "none" }}
                disabled={step === "generating"}
              />
              <button
                onClick={generate}
                disabled={step === "generating" || !topic.trim()}
                style={{ padding: "14px 32px", background: step === "generating" ? "#334155" : "linear-gradient(135deg,#1d4ed8,#059669)", color: "white", border: "none", borderRadius: "12px", cursor: step === "generating" ? "not-allowed" : "pointer", fontWeight: "700", fontSize: "15px", whiteSpace: "nowrap" }}
              >
                {step === "generating" ? "⏳ 생성 중..." : "✨ 자동 생성"}
              </button>
            </div>
            {error && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "12px" }}>⚠️ {error}</p>}

            {/* Example topics */}
            <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["손 씻기", "식품 보관 온도", "교차오염 방지", "개인 위생", "HACCP 기록 작성"].map((t) => (
                <button key={t} onClick={() => setTopic(t)}
                  style={{ padding: "6px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "20px", color: "#64748b", fontSize: "13px", cursor: "pointer" }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Result Section */}
          {step === "done" && material && (
            <>
              {/* Language Selector */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => setLang(l.code)}
                    style={{ padding: "8px 18px", borderRadius: "20px", border: `2px solid ${lang === l.code ? "#3b82f6" : "#334155"}`, background: lang === l.code ? "#3b82f6" : "transparent", color: lang === l.code ? "white" : "#64748b", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px", marginBottom: "32px" }}>
                <ActionBtn
                  icon="🖼️"
                  label="카드뉴스 PNG"
                  sub="1장 세로 이미지"
                  color="#1d4ed8"
                  loading={dlState.cards}
                  onClick={downloadCards}
                />
                <ActionBtn
                  icon="📄"
                  label="PDF 요약본"
                  sub="A4 1장 인쇄"
                  color="#059669"
                  loading={dlState.pdf}
                  onClick={downloadPDF}
                />
                <ActionBtn
                  icon="🎬"
                  label="Shorts 영상"
                  sub="슬라이드쇼 WebM"
                  color="#7c3aed"
                  loading={dlState.video}
                  onClick={downloadVideo}
                />
                <ActionBtn
                  icon="📸"
                  label="Instagram 게시"
                  sub={instaStatus || "자동 업로드"}
                  color="#db2777"
                  loading={dlState.insta}
                  onClick={postToInstagram}
                />
              </div>

              {/* Slide Previews */}
              <div>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                  📱 슬라이드 미리보기 ({slides.length}장)
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                  {slides.map((slide, i) => (
                    <div key={`preview-${lang}-${i}`} style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)", borderRadius: "10px", overflow: "hidden" }}>
                      <SlidePreview>
                        <SlideRenderer slide={slide} lang={lang} slideNum={i + 1} total={slides.length} />
                      </SlidePreview>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ActionBtn({ icon, label, sub, color, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{ background: loading ? "#1e293b" : "#1e293b", border: `2px solid ${loading ? "#334155" : color + "66"}`, borderRadius: "14px", padding: "18px 20px", cursor: loading ? "not-allowed" : "pointer", textAlign: "left", transition: "border-color 0.2s" }}
    >
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{loading ? "⏳" : icon}</div>
      <div style={{ color: loading ? "#475569" : "white", fontWeight: "700", fontSize: "15px", marginBottom: "4px" }}>{label}</div>
      <div style={{ color: "#64748b", fontSize: "12px" }}>{loading ? "처리 중..." : sub}</div>
    </button>
  );
}
