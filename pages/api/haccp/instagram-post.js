// Instagram Graph API auto-post
// Required env vars:
//   INSTAGRAM_ACCESS_TOKEN       - Facebook long-lived user token
//   INSTAGRAM_BUSINESS_ACCOUNT_ID - Instagram Business Account ID
//   NEXT_PUBLIC_SITE_URL         - Public URL of this site (for image hosting)

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { imageUrl, caption } = req.body;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!token || !accountId) {
    return res.status(503).json({
      error: "Instagram API not configured",
      setup: "Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in environment variables.",
    });
  }

  try {
    // Step 1: Create media container
    const containerRes = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          caption,
          access_token: token,
        }),
      }
    );
    const container = await containerRes.json();
    if (!container.id) throw new Error(container.error?.message || "Container creation failed");

    // Step 2: Publish
    const publishRes = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creation_id: container.id, access_token: token }),
      }
    );
    const published = await publishRes.json();
    if (!published.id) throw new Error(published.error?.message || "Publish failed");

    res.status(200).json({ success: true, postId: published.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
