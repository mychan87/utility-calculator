export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const { image, mimeType } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mimeType, data: image } },
            { type: 'text', text: '이 관리비 청구서에서 항목별 정보를 추출해줘. 반드시 아래 JSON 형식으로만 응답해. 다른 텍스트 없이 JSON만. 연도가 없으면 2026으로 가정해.\n\n{"items":[{"name":"전기세","icon":"⚡","amount":43080,"start":"2026-03-03","end":"2026-04-02"},{"name":"가스비","icon":"🔥","amount":49250,"start":"2026-03-15","end":"2026-04-14"},{"name":"건물관리비","icon":"🏢","amount":25000,"start":"2026-03-17","end":"2026-04-16"}]}' }
          ]
        }]
      })
    });
    
    const data = await response.json();
    console.log('API response:', JSON.stringify(data));
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }
    
    const text = data.content?.map(c => c.text || '').join('') || '';
    const clean = text.replace(/```json|```/g, '').trim();
    res.status(200).json(JSON.parse(clean));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
}
