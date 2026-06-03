import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a HACCP food safety educator creating materials for foreign workers in Korea.
Given a Korean topic, generate structured educational content in exactly 5 languages: Korean (ko), English (en), Filipino (tl), Khmer/Cambodian (km), and Nepali (ne).

Rules:
- Keep language simple and clear for workers with basic literacy
- 5 key bullet points max per section
- Numbered list must have exactly 5 items (the 5 most important steps/points)
- Highlight text must be one memorable safety message
- All text must be accurate food safety information`;

const USER_PROMPT = (topic) => `Generate HACCP educational content for this topic: "${topic}"

Respond with ONLY valid JSON, no markdown, no explanation. Use this exact structure:
{
  "title": {
    "ko": "Korean title",
    "en": "English title",
    "tl": "Filipino title",
    "km": "Khmer title",
    "ne": "Nepali title"
  },
  "summary": {
    "ko": "Korean summary (1 sentence)",
    "en": "English summary (1 sentence)",
    "tl": "Filipino summary (1 sentence)",
    "km": "Khmer summary (1 sentence)",
    "ne": "Nepali summary (1 sentence)"
  },
  "content": {
    "ko": [
      { "type": "heading", "text": "소제목" },
      { "type": "text", "text": "2-3 sentence explanation" },
      { "type": "heading", "text": "중요한 이유" },
      { "type": "bullets", "items": ["point 1", "point 2", "point 3", "point 4"] },
      { "type": "heading", "text": "5가지 핵심 규칙" },
      { "type": "numbered", "items": ["rule 1", "rule 2", "rule 3", "rule 4", "rule 5"] },
      { "type": "highlight", "text": "Key safety message to remember" }
    ],
    "en": [ ...same structure in English... ],
    "tl": [ ...same structure in Filipino... ],
    "km": [ ...same structure in Khmer... ],
    "ne": [ ...same structure in Nepali... ]
  }
}`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { topic } = req.body;
  if (!topic?.trim()) return res.status(400).json({ error: "topic required" });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: USER_PROMPT(topic.trim()) }],
    });

    const raw = message.content[0].text.trim();
    // Strip any accidental markdown fences
    const jsonStr = raw.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
    const data = JSON.parse(jsonStr);

    // Build a material object compatible with our data format
    const slug = `day-${Date.now()}-${topic.trim().slice(0, 20).replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`;
    const material = {
      id: Date.now(),
      day: null,
      date: new Date().toISOString().slice(0, 10),
      slug,
      title: data.title,
      summary: data.summary,
      youtubeId: "",
      content: data.content,
    };

    res.status(200).json({ material });
  } catch (err) {
    console.error("generate error:", err);
    res.status(500).json({ error: err.message });
  }
}
