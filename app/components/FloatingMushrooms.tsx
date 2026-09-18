"use client";

import { useEffect, useState } from "react";

type MushroomSpec = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

const MUSHROOM_COUNT = 8;

function generateMushrooms(): MushroomSpec[] {
  return Array.from({ length: MUSHROOM_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 92,
    y: Math.random() * 88,
    size: 28 + Math.random() * 34,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 5,
  }));
}

/**
 * Fixed, full-viewport layer of 8 floating/glowing/colour-shifting
 * mushroom emojis. Mount once near the root of page.tsx.
 *
 * Positions are randomized client-side only (via useEffect, after
 * mount) rather than during render — Math.random() during SSR
 * produces different values on the server vs. the browser, which
 * causes a hydration mismatch. Starting with an empty array and
 * filling it in after mount avoids that entirely.
 */
export default function FloatingMushrooms() {
  const [mushrooms, setMushrooms] = useState<MushroomSpec[]>([]);

  useEffect(() => {
    setMushrooms(generateMushrooms());
  }, []);

  return (
    <div className="mushroom-layer" aria-hidden="true">
      {mushrooms.map((m) => (
        <span
          key={m.id}
          className="mushroom"
          style={
            {
              "--x": `${m.x}vw`,
              "--y": `${m.y}vh`,
              "--size": `${m.size}px`,
              "--duration": `${m.duration}s`,
              "--delay": `${m.delay}s`,
            } as React.CSSProperties
          }
        >
          🍄
        </span>
      ))}
    </div>
  );
}