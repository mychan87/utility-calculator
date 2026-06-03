import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { materials, LANGUAGES } from "../../../data/materials";

export async function getStaticPaths() {
  return {
    paths: materials.map((m) => ({ params: { slug: m.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const material = materials.find((m) => m.slug === params.slug) || null;
  return { props: { material } };
}

// Group content blocks into slides
function buildSlides(content, title, summary, day) {
  const slides = [{ type: "cover", title, summary, day }];
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

const SLIDE_SIZE = 540;

// ─── Slide designs ────────────────────────────────────────────────────────────

function CoverSlide({ title, summary, day, lang }) {
  const l = LANGUAGES.find((x) => x.code === lang);
  return (
    <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, background: "linear-gradient(145deg,#1e3a8a 0%,#065f46 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "52px 48px", boxSizing: "border-box", position: "relative", overflow: "hidden", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ position: "absolute", top: -70, right: -70, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
      <div style={{ position: "absolute", bottom: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: "24px", padding: "9px 22px", fontSize: "15px", fontWeight: "700", color: "rgba(255,255,255,0.9)", marginBottom: "26px", letterSpacing: "0.04em" }}>
        HACCP · Day {day}
      </div>
      <h1 style={{ color: "white", fontSize: "34px", fontWeight: "900", textAlign: "center", lineHeight: 1.3, margin: "0 0 22px 0" }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "15px", textAlign: "center", lineHeight: 1.75, margin: "0 0 40px 0" }}>{summary}</p>
      <div style={{ position: "absolute", bottom: "22px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>🥗 HACCP 외국인 교육자료</span>
        {l && (
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "2px 10px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
            {l.flag} {l.label}
          </span>
        )}
      </div>
    </div>
  );
}

function ContentSlide({ heading, items, slideNum, total }) {
  return (
    <div style={{ width: SLIDE_SIZE, height: SLIDE_SIZE, background: "white", display: "flex", flexDirection: "column", padding: "38px 40px", boxSizing: "border-box", position: "relative", fontFamily: "system-ui,sans-serif", overflow: "hidden" }}>
      <div style={{ height: "5px", background: "linear-gradient(90deg,#1e3a8a,#065f46)", borderRadius: "3px", marginBottom: "24px" }} />
      {heading && (
        <h2 style={{ fontSize: "21px", fontWeight: "800", color: "#1e293b", margin: "0 0 18px 0", lineHeight: 1.3 }}>{heading}</h2>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
        {items.map((block, i) => {
          if (block.type === "text") {
            return <p key={i} style={{ color: "#374151", fontSize: "13.5px", lineHeight: 1.75, margin: 0 }}>{block.text}</p>;
          }
          if (block.type === "bullets") {
            return (
              <ul key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f8fafc", borderRadius: "8px", padding: "9px 13px", borderLeft: "3px solid #1e3a8a" }}>
                    <span style={{ color: "#374151", fontSize: "12.5px", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "numbered") {
            return (
              <ol key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f8fafc", borderRadius: "8px", padding: "9px 13px" }}>
                    <span style={{ background: "#1e3a8a", color: "white", minWidth: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0, marginTop: "1px" }}>{j + 1}</span>
                    <span style={{ color: "#374151", fontSize: "12.5px", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ol>
            );
          }
          return null;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function InstagramPage({ material }) {
  const router = useRouter();
  const [lang, setLang] = useState(() =>
    LANGUAGES.find((l) => l.code === router.query.lang) ? router.query.lang : "ko"
  );
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const captureRefs = useRef([]);

  const content = material.content[lang] || material.content.ko;
  const slides = buildSlides(
    content,
    material.title[lang] || material.title.ko,
    material.summary[lang] || material.summary.ko,
    material.day
  );

  // reset refs array length when slides change
  captureRefs.current = captureRefs.current.slice(0, slides.length);

  const captureSlide = useCallback(async (index, scale = 2) => {
    const html2canvas = (await import("html2canvas")).default;
    const el = captureRefs.current[index];
    if (!el) return null;
    // Temporarily reset transform so html2canvas sees full-size element
    const prev = el.style.transform;
    el.style.transform = "scale(1)";
    const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: null, width: SLIDE_SIZE, height: SLIDE_SIZE });
    el.style.transform = prev;
    return canvas;
  }, []);

  const downloadSlide = useCallback(async (index) => {
    const canvas = await captureSlide(index);
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = `haccp-day${material.day}-${lang}-slide${index + 1}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, [captureSlide, material.day, lang]);

  const downloadAll = useCallback(async () => {
    setDownloading(true);
    setDownloadProgress(0);
    for (let i = 0; i < slides.length; i++) {
      const canvas = await captureSlide(i);
      if (canvas) {
        const a = document.createElement("a");
        a.download = `haccp-day${material.day}-${lang}-slide${i + 1}of${slides.length}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      }
      setDownloadProgress(i + 1);
      await new Promise((r) => setTimeout(r, 400));
    }
    setDownloading(false);
  }, [slides, captureSlide, material.day, lang]);

  return (
    <>
      <Head>
        <title>Instagram 카드 · Day {material.day} | HACCP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
        {/* Nav */}
        <nav style={{ background: "#1e293b", borderBottom: "1px solid #334155", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link href={`/haccp/${material.slug}?lang=${lang}`} style={{ color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>
            ← 자료로 돌아가기
          </Link>
          <span style={{ color: "#334155" }}>|</span>
          <span style={{ color: "#64748b", fontSize: "13px" }}>Day {material.day} · Instagram 카드</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {LANGUAGES.map((l) => (
              <button key={l.code} onClick={() => setLang(l.code)}
                style={{ padding: "5px 12px", borderRadius: "14px", border: `2px solid ${lang === l.code ? "#3b82f6" : "#334155"}`, background: lang === l.code ? "#3b82f6" : "transparent", color: lang === l.code ? "white" : "#64748b", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Header */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h1 style={{ color: "white", fontSize: "22px", fontWeight: "800", marginBottom: "6px" }}>📸 Instagram 카드 만들기</h1>
              <p style={{ color: "#64748b", fontSize: "14px" }}>{slides.length}장 슬라이드 · 1080×1080 PNG · Carousel 게시물용</p>
            </div>
            <button onClick={downloadAll} disabled={downloading}
              style={{ padding: "12px 28px", background: downloading ? "#334155" : "linear-gradient(135deg,#1d4ed8,#059669)", color: "white", border: "none", borderRadius: "12px", cursor: downloading ? "not-allowed" : "pointer", fontWeight: "700", fontSize: "15px" }}>
              {downloading ? `⬇️ ${downloadProgress}/${slides.length} 저장 중...` : `⬇️ 전체 ${slides.length}장 다운로드`}
            </button>
          </div>

          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "12px 18px", marginBottom: "32px", color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>
            💡 슬라이드를 순서대로 다운받아 Instagram에 <strong style={{ color: "#e2e8f0" }}>carousel 게시물</strong>로 업로드하세요.
            각 PNG는 1080×1080 고화질입니다. 브라우저 알림이 뜨면 "허용"을 눌러주세요.
          </div>
        </div>

        {/* Slides grid */}
        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px" }}>
            {slides.map((slide, i) => (
              <div key={`${lang}-${i}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                    슬라이드 {i + 1}
                    {i === 0 && <span style={{ background: "#7c3aed", color: "white", borderRadius: "6px", padding: "1px 8px", fontSize: "11px" }}>커버</span>}
                    {i === slides.length - 1 && slide.type === "highlight" && <span style={{ background: "#059669", color: "white", borderRadius: "6px", padding: "1px 8px", fontSize: "11px" }}>마지막</span>}
                  </span>
                  <button onClick={() => downloadSlide(i)}
                    style={{ padding: "5px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#94a3b8", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                    ⬇️ PNG
                  </button>
                </div>

                <div style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.5)", borderRadius: "12px", overflow: "hidden" }}>
                  <SlideFrame captureRef={(el) => { captureRefs.current[i] = el; }}>
                    <SlideRenderer slide={slide} lang={lang} slideNum={i + 1} total={slides.length} />
                  </SlideFrame>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

function SlideRenderer({ slide, lang, slideNum, total }) {
  switch (slide.type) {
    case "cover": return <CoverSlide title={slide.title} summary={slide.summary} day={slide.day} lang={lang} />;
    case "content": return <ContentSlide heading={slide.heading} items={slide.items} slideNum={slideNum} total={total} />;
    case "highlight": return <HighlightSlide text={slide.text} slideNum={slideNum} total={total} />;
    default: return null;
  }
}

function SlideFrame({ children, captureRef }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.52);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / SLIDE_SIZE);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const setRefs = useCallback((el) => {
    innerRef.current = el;
    if (typeof captureRef === "function") captureRef(el);
  }, [captureRef]);

  return (
    <div ref={containerRef} style={{ width: "100%", aspectRatio: "1", position: "relative", overflow: "hidden" }}>
      <div ref={setRefs} style={{ width: `${SLIDE_SIZE}px`, height: `${SLIDE_SIZE}px`, transformOrigin: "top left", transform: `scale(${scale})`, position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
