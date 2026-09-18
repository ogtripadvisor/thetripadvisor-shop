type CannabisLeafProps = {
  className?: string;
};

/**
 * A stylized 7-leaflet cannabis fan leaf, built as a single serrated
 * "blade" shape repeated at 7 rotations/scales around a shared base
 * point (matching how real leaflets radiate from the petiole).
 * Uses currentColor so it can be tinted/sized via CSS on the wrapper.
 */
export default function CannabisLeaf({ className }: CannabisLeafProps) {
  // A slender, finely-serrated leaflet (narrow lance shape, widest ~1/3
  // up from the base, tapering to a sharp point) — matches the classic
  // cannabis leaflet silhouette much more closely than a rounded blade.
  const blade =
    "M1.5,0 L6,-6 L3.5,-10 L7.5,-16 L4.5,-20 L8.5,-26 L5,-30 L8,-36 L4.8,-40 " +
    "L7.3,-46 L4.3,-50 L6.5,-56 L3.8,-60 L5.6,-66 L3.2,-70 L4.6,-76 L2.6,-80 " +
    "L3.4,-86 L1.8,-90 L1.8,-95 L0,-100 L-1.8,-95 L-1.8,-90 L-3.4,-86 L-2.6,-80 " +
    "L-4.6,-76 L-3.2,-70 L-5.6,-66 L-3.8,-60 L-6.5,-56 L-4.3,-50 L-7.3,-46 " +
    "L-4.8,-40 L-8,-36 L-5,-30 L-8.5,-26 L-4.5,-20 L-7.5,-16 L-3.5,-10 L-6,-6 L-1.5,0 Z";

  const leaflets = [
    { angle: 0, scale: 1 },
    { angle: 24, scale: 0.86 },
    { angle: -24, scale: 0.86 },
    { angle: 48, scale: 0.66 },
    { angle: -48, scale: 0.66 },
    { angle: 72, scale: 0.42 },
    { angle: -72, scale: 0.42 },
  ];

  return (
    <svg
      className={className}
      viewBox="-95 -105 190 115"
      fill="currentColor"
      aria-hidden="true"
    >
      {leaflets.map((leaflet) => (
        <path
          key={leaflet.angle}
          d={blade}
          transform={`rotate(${leaflet.angle}) scale(${leaflet.scale})`}
        />
      ))}
    </svg>
  );
}