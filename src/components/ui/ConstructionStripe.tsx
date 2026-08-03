export function ConstructionStripe({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-4 w-full shrink-0 ${className}`}
      style={{
        backgroundImage: "url(/bottom-strip.png)",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
      }}
    />
  );
}
