export function StructuralLines({ className = "" }: { className?: string }) {
  const rows = [100, 72, 88, 60, 94, 68, 100, 78];
  return (
    <svg
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {rows.map((w, i) => (
        <line
          key={i}
          x1="0"
          y1={i * 10 + 5}
          x2={w * 2}
          y2={i * 10 + 5}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
