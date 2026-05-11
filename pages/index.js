import { useState, useEffect, useRef } from "react";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
const EMOJIS = ["🧑", "👩", "👦", "👧", "🧓"];

function formatKRW(n) { return Math.round(n).toLocaleString("ko-KR") + "원"; }
function dateLabel(d) {
  if (!d) return "-";
  const [, m, day] = d.split("-");
  return `${parseInt(m)}.${parseInt(day)}`;
}
function getDayList(start, end) {
  if (!start || !end) return [];
  const result = [], s = new Date(start), e = new Date(end);
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1))
    result.push(d.toISOString().slice(0, 10));
  return result;
}
function encodeState(s) { try { return btoa(encodeURIComponent(JSON.stringify(s))); } catch { return ""; } }
function decodeState(s) { try { return JSON.parse(decodeURIComponent(atob(s))); } catch { return null; } }

const iStyle = {
  width: "100%", padding: "11px 13px", fontSize: "0.92rem",
  border: "2px solid #334155", borderRadius: 11, outline: "none",
  background: "#1e293b", color: "#f1f5f9", fontFamily: "inherit", boxSizing: "border-box",
};

function calcAll({ items, people, dailyResidents }) {
  const result = {};
  people.forEach(p => { result[p.id] = { total: 0, items: {} }; });
  items.forEach(item => {
    const days = getDayList(item.start, item.end);
    if (!days.length || !item.amount) return;
    const dc = parseFloat(item.amount) / days.length;
    people.forEach(p => { result[p.id].items[item.id] = 0; });
    days.forEach(ds => {
      const res = dailyResidents[item.id]?.[ds] || [];
      if (!res.length) return;
      const share = dc / res.length;
      res.forEach(pid => {
        if (result[pid]) { result[pid].items[item.id] += share; result[pid].total += share; }
      });
    });
  });
  return result;
}

function InvoiceView({ data }) {
  const { items, people, dailyResidents, personId, billingMonth } = data;
  const person = people.find(p => p.id === personId);
  const pi = people.indexOf(person);
  const color = COLORS[pi % COLORS.length];
  const myCalc = calcAll({ items, people, dailyResidents })[personId] || { total: 0, items: {} };
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui,sans-serif", paddingBottom: 48 }}>
      <div style={{ background: `linear-gradient(135deg,${color},${color}99)`, padding: "40px 24px 32px", borderRadius: "0 0 36px 36px", marginBottom: 28 }}>
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>관리비 청구서 · {billingMonth}</div>
        <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>{EMOJIS[pi % 5]} {person?.name}님 청구서</div>
        <div style={{ marginTop: 18, background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "16px 20px" }}>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", marginBottom: 4 }}>이번 달 납부 금액</div>
          <div style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 900 }}>{formatKRW(myCalc.total)}</div>
        </div>
      </div>
      <div style={{ padding: "0 20px", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ background: "#1e293b", borderRadius: 20, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #334155", color: "#94a3b8", fontSize: "0.85rem" }}>📋 청구 내역</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 1fr", padding: "10px 14px", background: "#0f172a" }}>
            {["항목","사용기간","청구금액","내 부담액"].map(h => (
              <div key={h} style={{ color: "#475569", fontSize: "0.7rem", fontWeight: 700, textAlign: "center" }}>{h}</div>
            ))}
          </div>
          {items.map((item, i) => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 1fr", padding: "13px 14px", background: i % 2 === 0 ? "#1e293b" : "#172032", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span>{item.icon}</span>
                <span style={{ color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ color: "#64748b", fontSize: "0.72rem", textAlign: "center", lineHeight: 1.4 }}>{dateLabel(item.start)}<br/>~{dateLabel(item.end)}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", textAlign: "center" }}>{item.amount ? formatKRW(parseFloat(item.amount)) : "-"}</div>
              <div style={{ color, fontSize: "0.85rem", fontWeight: 800, textAlign: "center" }}>{formatKRW(myCalc.items[item.id] || 0)}</div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr 1fr", padding: "14px", borderTop: `2px solid ${color}44`, background: "#0f172a", alignItems: "center" }}>
            <div style={{ color: "#f1f5f9", fontWeight: 800, gridColumn: "1/3" }}>합계</div>
            <div style={{ color: "#f1f5f9", fontWeight: 800, fontSize: "0.85rem", textAlign: "center" }}>{formatKRW(items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0))}</div>
            <div style={{ color, fontWeight: 900, fontSize: "0.95rem", textAlign: "center" }}>{formatKRW(myCalc.total)}</div>
          </div>
        </div>
        <div style={{ textAlign: "center", color: "#334155", fontSize: "0.75rem" }}>이 청구서는 관리자가 생성한 링크입니다</div>
      </div>
    </div>
  );
}

function AdminMode() {
  const [tab, setTab] = useState("people");
  const [billingMonth, setBillingMonth] = useState("2026년 3-4월");
  const [people, setPeople] = useState([{ id: "p1", name: "", liveStart: "", liveEnd: "" }]);
  const [items, setItems] = useState([
    { id: "elec", name: "전기세", icon: "⚡", amount: "43080", start: "2026-03-03", end: "2026-04-02" },
    { id: "gas", name: "가스비", icon: "🔥", amount: "49250", start: "2026-03-15", end: "2026-04-14" },
    { id: "building", name: "건물관리비", icon: "🏢", amount: "25000", start: "2026-03-17", end: "2026-04-16" },
  ]);
  const [dailyResidents, setDailyResidents] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [previewPerson, setPreviewPerson] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [aiError, setAiError] = useState("");
  const fileRef = useRef();

  const addPerson = () => { if (people.length >= 5) return; setPeople(prev => [...prev, { id: "p" + Date.now(), name: "", liveStart: "", liveEnd: "" }]); };
  const removePerson = (id) => setPeople(prev => prev.filter(p => p.id !== id));
  const updatePerson = (id, field, val) => setPeople(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
  const updateItem = (id, field, val) => setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: val } : it));

  const applyItems = (newItems) => {
    setItems(newItems);
    const dr = {};
    newItems.forEach(item => {
      const itemDays = getDayList(item.start, item.end);
      dr[item.id] = {};
      itemDays.forEach(ds => {
        dr[item.id][ds] = people.filter(p => p.liveStart && p.liveEnd && ds >= p.liveStart && ds <= p.liveEnd).map(p => p.id);
      });
    });
    setDailyResidents(dr);
    setAiDone(true);
    setTab("confirm");
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAiLoading(true); setAiError("");
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const resp = await fetch("/api/parse-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType: file.type || "image/jpeg" })
      });
      const parsed = await resp.json();
      const newItems = parsed.items.map((it, i) => ({
        id: it.name.includes("전기") ? "elec" : it.name.includes("가스") ? "gas" : it.name.includes("건물") ? "building" : "item" + i,
        name: it.name, icon: it.icon || "📄", amount: String(it.amount), start: it.start, end: it.end,
      }));
      applyItems(newItems);
    } catch {
      setAiError("사진 인식에 실패했어요. 다시 시도하거나 직접 입력해 주세요.");
    } finally { setAiLoading(false); }
  };

  const calc = calcAll({ items, people, dailyResidents });

  const copyLink = (person) => {
    const state = { items, people, dailyResidents, personId: person.id, billingMonth };
    const url = `${window.location.origin}${window.location.pathname}?share=${encodeState(state)}`;
    navigator.clipboard.writeText(url).then(() => { setCopiedId(person.id); setTimeout(() => setCopiedId(null), 2500); });
  };

  if (previewPerson) {
    return (
      <div>
        <button onClick={() => setPreviewPerson(null)} style={{ position: "fixed", top: 16, left: 16, zIndex: 999, background: "#1e293b", color: "#94a3b8", border: "none", borderRadius: 10, padding: "8px 16px", fontFamily: "inherit", fontWeight: 700, cursor: "pointer" }}>← 돌아가기</button>
        <InvoiceView data={{ items, people, dailyResidents, personId: previewPerson.id, billingMonth }} />
      </div>
    );
  }

  const tabs = [["people","👥 거주자"],["photo","📸 청구서 사진"],["confirm","✅ 확인·수정"],["result","💰 결과"]];

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "system-ui,sans-serif", paddingBottom: 60 }}>
      <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "36px 24px 26px", borderRadius: "0 0 32px 32px", marginBottom: 20 }}>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", marginBottom: 5 }}>관리자 모드</div>
        <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff" }}>🏠 관리비 정산</div>
        <input value={billingMonth} onChange={e => setBillingMonth(e.target.value)} placeholder="예: 2026년 5월"
          style={{ marginTop: 14, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 11, color: "#fff", padding: "9px 14px", fontSize: "0.9rem", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" }} />
      </div>
      <div style={{ margin: "0 16px 18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {tabs.map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ padding: "11px 8px", border: "none", borderRadius: 12, fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", background: tab === key ? "#6366f1" : "#1e293b", color: tab === key ? "#fff" : "#475569" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 16px", maxWidth: 480, margin: "0 auto" }}>
        {tab === "people" && (
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>거주자 및 생활 기간</div>
              {people.length < 5 && <button onClick={addPerson} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>+ 추가</button>}
            </div>
            {people.map((p, i) => (
              <div key={p.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < people.length - 1 ? "1px solid #334155" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: "1.3rem" }}>{EMOJIS[i % 5]}</span>
                  <input value={p.name} onChange={e => updatePerson(p.id, "name", e.target.value)} placeholder={`사람 ${i + 1} 이름`} style={{ ...iStyle, flex: 1 }} />
                  {people.length > 1 && <button onClick={() => removePerson(p.id)} style={{ background: "#ef444422", color: "#ef4444", border: "2px solid #ef444433", borderRadius: 8, padding: "8px 10px", fontFamily: "inherit", cursor: "pointer" }}>✕</button>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <div style={{ color: "#64748b", fontSize: "0.74rem", marginBottom: 5 }}>생활 시작일</div>
                    <input type="date" value={p.liveStart} onChange={e => updatePerson(p.id, "liveStart", e.target.value)} style={iStyle} />
                  </div>
                  <div>
                    <div style={{ color: "#64748b", fontSize: "0.74rem", marginBottom: 5 }}>생활 종료일</div>
                    <input type="date" value={p.liveEnd} onChange={e => updatePerson(p.id, "liveEnd", e.target.value)} style={iStyle} />
                  </div>
                </div>
                {p.liveStart && p.liveEnd && <div style={{ marginTop: 8, color: COLORS[i % 5], fontSize: "0.76rem" }}>📅 {dateLabel(p.liveStart)} ~ {dateLabel(p.liveEnd)} · 총 {getDayList(p.liveStart, p.liveEnd).length}일</div>}
              </div>
            ))}
            <button onClick={() => setTab("photo")} style={{ width: "100%", marginTop: 6, padding: "13px", background: "#6366f1", border: "none", borderRadius: 13, color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer" }}>다음 → 청구서 사진 업로드</button>
          </div>
        )}
        {tab === "photo" && (
          <div>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, marginBottom: 14, textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📸</div>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>청구서 사진을 업로드하세요</div>
              <div style={{ color: "#64748b", fontSize: "0.82rem", marginBottom: 20, lineHeight: 1.6 }}>전기세·가스비·건물관리비가 적힌 사진을 올리면<br/>AI가 기간과 금액을 자동으로 읽어드려요</div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              {aiLoading ? (
                <div style={{ padding: "24px 0" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>🤖</div>
                  <div style={{ color: "#6366f1", fontWeight: 700, fontSize: "0.9rem", marginBottom: 6 }}>AI가 사진을 읽는 중...</div>
                  <div style={{ color: "#475569", fontSize: "0.78rem" }}>잠시만 기다려 주세요</div>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", borderRadius: 14, color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>📂 사진 선택하기</button>
              )}
              {aiError && <div style={{ marginTop: 14, background: "#ef444422", border: "1px solid #ef444444", borderRadius: 10, padding: "10px 14px", color: "#ef4444", fontSize: "0.8rem" }}>{aiError}</div>}
              {aiDone && !aiLoading && <div style={{ marginTop: 14, background: "#10b98122", border: "1px solid #10b98144", borderRadius: 10, padding: "10px 14px", color: "#10b981", fontSize: "0.82rem" }}>✅ 인식 완료! 확인·수정 탭에서 내용을 확인해 주세요</div>}
            </div>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: 20 }}>
              <div style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: 14 }}>또는 직접 입력</div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ marginBottom: idx < items.length - 1 ? 18 : 0, paddingBottom: idx < items.length - 1 ? 18 : 0, borderBottom: idx < items.length - 1 ? "1px solid #334155" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}><span>{item.icon}</span><span style={{ color: "#cbd5e1", fontWeight: 700 }}>{item.name}</span></div>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>금액</div>
                    <input style={iStyle} type="number" placeholder="원" value={item.amount} onChange={e => updateItem(item.id, "amount", e.target.value)} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                    <div><div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>시작일</div><input style={iStyle} type="date" value={item.start} onChange={e => updateItem(item.id, "start", e.target.value)} /></div>
                    <div><div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>종료일</div><input style={iStyle} type="date" value={item.end} onChange={e => updateItem(item.id, "end", e.target.value)} /></div>
                  </div>
                </div>
              ))}
              <button onClick={() => applyItems(items)} style={{ width: "100%", marginTop: 16, padding: "12px", background: "#334155", border: "none", borderRadius: 12, color: "#94a3b8", fontFamily: "inherit", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>직접 입력으로 계속하기 →</button>
            </div>
          </div>
        )}
        {tab === "confirm" && (
          <div>
            <div style={{ background: "#10b98111", border: "1px solid #10b98133", borderRadius: 14, padding: "12px 16px", marginBottom: 16, color: "#10b981", fontSize: "0.82rem" }}>🤖 AI가 자동으로 채웠어요. 내용을 확인하고 틀린 부분만 수정해 주세요.</div>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 16 }}>📋 청구 항목 확인</div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ marginBottom: idx < items.length - 1 ? 18 : 0, paddingBottom: idx < items.length - 1 ? 18 : 0, borderBottom: idx < items.length - 1 ? "1px solid #334155" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{item.name}</span>
                    {item.amount && item.start && item.end && <span style={{ marginLeft: "auto", color: "#6366f1", fontSize: "0.78rem", fontWeight: 700 }}>✓ 인식됨</span>}
                  </div>
                  <div style={{ marginBottom: 8 }}><div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>금액</div><input style={iStyle} type="number" placeholder="원" value={item.amount} onChange={e => updateItem(item.id, "amount", e.target.value)} /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                    <div><div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>시작일</div><input style={iStyle} type="date" value={item.start} onChange={e => updateItem(item.id, "start", e.target.value)} /></div>
                    <div><div style={{ color: "#475569", fontSize: "0.73rem", marginBottom: 4 }}>종료일</div><input style={iStyle} type="date" value={item.end} onChange={e => updateItem(item.id, "end", e.target.value)} /></div>
                  </div>
                  {item.start && item.end && <div style={{ marginTop: 7, color: "#475569", fontSize: "0.74rem" }}>청구기간 {dateLabel(item.start)} ~ {dateLabel(item.end)} · {getDayList(item.start, item.end).length}일</div>}
                </div>
              ))}
            </div>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 14 }}>👥 거주자별 적용 기간 확인</div>
              {items.map(item => (
                <div key={item.id} style={{ marginBottom: 16 }}>
                  <div style={{ color: "#64748b", fontSize: "0.78rem", marginBottom: 8 }}>{item.icon} {item.name}</div>
                  {people.map((p, pi) => {
                    const activeDays = getDayList(item.start, item.end).filter(d => (dailyResidents[item.id]?.[d] || []).includes(p.id));
                    const color = COLORS[pi % 5];
                    return (
                      <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, padding: "8px 12px", background: "#0f172a", borderRadius: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span>{EMOJIS[pi % 5]}</span><span style={{ color: "#cbd5e1", fontSize: "0.84rem" }}>{p.name || `사람 ${pi + 1}`}</span></div>
                        <span style={{ color: activeDays.length > 0 ? color : "#334155", fontSize: "0.8rem", fontWeight: 700 }}>{activeDays.length > 0 ? `${activeDays.length}일 적용` : "해당없음"}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <button onClick={() => setTab("result")} style={{ width: "100%", padding: "13px", background: "#6366f1", border: "none", borderRadius: 13, color: "#fff", fontFamily: "inherit", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer" }}>결과 보기 →</button>
          </div>
        )}
        {tab === "result" && (
          <>
            <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginBottom: 14 }}>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: 14 }}>📊 전체 청구 요약</div>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #172032" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span>{item.icon}</span><span style={{ color: "#cbd5e1", fontSize: "0.82rem" }}>{item.name}</span></div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#f1f5f9", fontSize: "0.88rem", fontWeight: 700 }}>{item.amount ? formatKRW(parseFloat(item.amount)) : "-"}</div>
                    <div style={{ color: "#64748b", fontSize: "0.72rem" }}>{item.start && item.end ? `${dateLabel(item.start)}~${dateLabel(item.end)}` : ""}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: "2px solid #6366f133" }}>
                <span style={{ color: "#f1f5f9", fontWeight: 800 }}>총합계</span>
                <span style={{ color: "#6366f1", fontWeight: 900, fontSize: "1.1rem" }}>{formatKRW(items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0))}</span>
              </div>
            </div>
            {people.map((person, i) => {
              const myData = calc[person.id] || { total: 0, items: {} };
              const color = COLORS[i % 5];
              const isCopied = copiedId === person.id;
              return (
                <div key={person.id} style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: "1.2rem" }}>{EMOJIS[i % 5]}</span>
                      <div>
                        <div style={{ color: "#f1f5f9", fontWeight: 800 }}>{person.name || `사람 ${i + 1}`}</div>
                        {person.liveStart && person.liveEnd && <div style={{ color: "#475569", fontSize: "0.73rem" }}>{dateLabel(person.liveStart)} ~ {dateLabel(person.liveEnd)}</div>}
                      </div>
                    </div>
                    <span style={{ color, fontWeight: 900, fontSize: "1.15rem" }}>{formatKRW(myData.total)}</span>
                  </div>
                  {items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ color: "#64748b", fontSize: "0.82rem" }}>{item.icon} {item.name}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{formatKRW(myData.items[item.id] || 0)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button onClick={() => setPreviewPerson(person)} style={{ flex: 1, padding: "11px", background: "#0f172a", border: "2px solid #334155", borderRadius: 12, color: "#94a3b8", fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>👁 미리보기</button>
                    <button onClick={() => copyLink(person)} style={{ flex: 1, padding: "11px", background: isCopied ? "#10b98122" : color + "22", border: `2px solid ${isCopied ? "#10b981" : color + "55"}`, borderRadius: 12, color: isCopied ? "#10b981" : color, fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}>{isCopied ? "✅ 복사완료!" : "🔗 링크 공유"}</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState(null);
  const [sharedData, setSharedData] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const share = params.get("share");
    if (share) {
      const data = decodeState(share);
      if (data) { setSharedData(data); setMode("viewer"); return; }
    }
    setMode("admin");
  }, []);
  if (mode === "viewer" && sharedData) return <InvoiceView data={sharedData} />;
  if (mode === "admin") return <AdminMode />;
  return null;
}
