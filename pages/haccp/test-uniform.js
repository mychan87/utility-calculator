import IllustrationLoader from "../../components/IllustrationLoader";

const RULES = [
  "지정된 장소에서 정해진 순서대로\n위생모 → 위생복 상의 → 위생복 하의 → 위생화 → 마스크 → 위생장갑 순으로 착용한다.",
  "개인 휴대품(목걸이·귀걸이·휴대폰)은 개인사물함에 보관하고, 제조 작업장에 절대 반입하지 않는다.",
  "착용한 위생모·위생복·위생화·마스크·위생장갑은 항상 청결하게 유지하고 주기적으로 교체한다.",
  "위생복장 착용 후에는 반드시 위생전실로 이동하여 아래 절차를 완료한 후 작업장으로 입장한다.",
];

const BADGE_COLORS = ["#1e40af", "#7c3aed", "#10b981", "#f59e0b"];

export default function TestUniform() {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Noto Sans KR', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #065f46 100%)", padding: "40px 24px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", alignItems: "flex-end", gap: "32px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "10px", padding: "5px 14px", fontSize: "13px", fontWeight: "700", display: "inline-block", marginBottom: "14px" }}>
              HACCP Day 2 · 테스트 미리보기
            </div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: "900", lineHeight: 1.3, marginBottom: "10px" }}>
              위생복 착용 규칙
            </h1>
            <p style={{ fontSize: "15px", opacity: 0.85, lineHeight: 1.65 }}>
              식품 작업장 입장 전, 반드시 정해진 순서로 위생복을 착용해야 합니다.
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <IllustrationLoader slug="hygiene-uniform" size={220} />
          </div>
        </div>
      </div>

      {/* Rules */}
      <main style={{ maxWidth: "860px", margin: "40px auto", padding: "0 20px 60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid #e2e8f0" }}>
          위생복 착용 규칙
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {RULES.map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "white", borderRadius: "14px", padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
              <div style={{ background: BADGE_COLORS[i], color: "white", width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px", flexShrink: 0, marginTop: "1px" }}>
                {i + 1}
              </div>
              <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.75", margin: 0, whiteSpace: "pre-line" }}>
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Sequence visual */}
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#1e293b", margin: "40px 0 16px", paddingBottom: "10px", borderBottom: "2px solid #e2e8f0" }}>
          착용 순서
        </h2>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center", background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {["① 위생모", "② 위생복 상의", "③ 위생복 하의", "④ 위생화", "⑤ 마스크", "⑥ 위생장갑"].map((item, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ background: "#eff6ff", color: "#1e40af", borderRadius: "20px", padding: "6px 14px", fontWeight: "700", fontSize: "14px", whiteSpace: "nowrap" }}>
                {item}
              </span>
              {i < arr.length - 1 && <span style={{ color: "#94a3b8", fontSize: "18px", fontWeight: "700" }}>→</span>}
            </span>
          ))}
        </div>

        <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "32px", textAlign: "center" }}>
          🧪 이 페이지는 테스트용입니다 · 실제 Day 2 자료로 추가 예정
        </p>
      </main>
    </div>
  );
}
