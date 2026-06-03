#!/usr/bin/env node
/**
 * 매일 새 HACCP 교육 자료를 추가하는 스크립트
 * 사용법: node scripts/add-material.js
 *
 * materials.js 파일의 materials 배열에 새 항목을 추가합니다.
 * 내용은 직접 편집하거나 이 스크립트를 수정해 사용하세요.
 */

const today = new Date().toISOString().slice(0, 10);
console.log(`\n✅ HACCP 교육 자료 추가 가이드 (${today})\n`);
console.log("1. data/materials.js 파일을 열어주세요");
console.log("2. materials 배열 맨 끝에 새 항목을 추가하세요");
console.log("3. 아래 템플릿을 복사해 사용하세요:\n");

const template = `
  {
    id: [번호],
    day: [일차],
    date: "${today}",
    slug: "day-[일차]-[영문-제목-kebab-case]",
    title: {
      ko: "한국어 제목",
      en: "English Title",
      vi: "Tiêu đề tiếng Việt",
      zh: "中文标题",
      tl: "Pamagat sa Filipino",
    },
    summary: {
      ko: "한국어 요약",
      en: "English summary",
      vi: "Tóm tắt tiếng Việt",
      zh: "中文摘要",
      tl: "Buod sa Filipino",
    },
    youtubeId: "",  // YouTube 영상 ID (예: "dQw4w9WgXcQ")
    content: {
      ko: [
        { type: "heading", text: "소제목" },
        { type: "text", text: "본문 텍스트" },
        { type: "bullets", items: ["항목1", "항목2", "항목3"] },
        { type: "numbered", items: ["단계1", "단계2", "단계3"] },
        { type: "highlight", text: "중요 강조 메시지" },
      ],
      en: [ ... ],
      vi: [ ... ],
      zh: [ ... ],
      tl: [ ... ],
    },
  },
`;

console.log(template);
console.log("\n블록 타입:");
console.log("  - heading   : 소제목 (파란색 밑줄)");
console.log("  - text      : 본문 문단");
console.log("  - bullets   : 불릿 리스트 (파란 왼쪽 라인)");
console.log("  - numbered  : 번호 리스트 (파란 원)");
console.log("  - highlight : 강조 박스 (하늘색 배경)\n");
