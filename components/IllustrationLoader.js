import { useState, useEffect } from "react";

// Automatically loads illustrations/[slug].js if it exists.
// Add a new illustration by creating components/illustrations/<slug>.js — no registration needed.
export default function IllustrationLoader({ slug, size = 120 }) {
  const [Comp, setComp] = useState(null);

  useEffect(() => {
    setComp(null);
    import(`./illustrations/${slug}`)
      .then((mod) => setComp(() => mod.default))
      .catch(() => setComp(null));
  }, [slug]);

  if (!Comp) return null;
  return <Comp size={size} />;
}
