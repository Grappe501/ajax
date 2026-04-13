export function MultilineAnswer({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className={className}>
      {parts.map((para, idx) => (
        <p key={idx} className="leading-relaxed last:mb-0 [&:not(:first-child)]:mt-3">
          {para}
        </p>
      ))}
    </div>
  );
}
