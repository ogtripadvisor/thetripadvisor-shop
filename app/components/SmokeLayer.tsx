"use client";

import { useMemo } from "react";

type SmokeLayerProps = {
  /** Number of puffs to render. Default 5 (good for small shop cards). */
  count?: number;
  /** Min puff diameter in px. */
  minSize?: number;
  /** Max puff diameter in px. */
  maxSize?: number;
  /** How far (px) puffs rise before fading out. Default 120. */
  travel?: number;
};

/**
 * Renders randomized smoke puffs. Relies on the parent element having
 * position: relative/absolute and a `:hover .smoke-puff` CSS rule
 * (see .product-card:hover and .spotlight-image-wrap:hover in globals.css)
 * to actually trigger the animation.
 *
 * Bigger images should pass a higher count + larger min/maxSize + travel
 * so the smoke reads proportionally — 5 small puffs look lost on a huge photo.
 */
export default function SmokeLayer({
  count = 5,
  minSize = 34,
  maxSize = 64,
  travel = 120,
}: SmokeLayerProps) {
  const puffs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        delay: Math.random() * 0.4,
        size: minSize + Math.random() * (maxSize - minSize),
        driftX: (Math.random() - 0.5) * 60, // -30px to +30px sideways drift
      })),
    [count, minSize, maxSize],
  );

  return (
    <div className="smoke-layer" aria-hidden="true">
      {puffs.map((p) => (
        <span
          key={p.id}
          className="smoke-puff"
          style={
            {
              "--puff-x": `${p.x}%`,
              "--puff-delay": `${p.delay}s`,
              "--puff-size": `${p.size}px`,
              "--puff-travel": `-${travel}px`,
              "--drift-x": `${p.driftX}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}