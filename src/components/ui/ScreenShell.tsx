export function ScreenShell({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-clip">
      {header}
      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      {footer}
    </div>
  );
}
