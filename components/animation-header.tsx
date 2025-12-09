import clsx from "clsx";

export default function AnimationHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "pt-8 pb-(--canvas-header-fade) px-4 lg:px-8 bg-linear-180 from-background to-transparent from-[calc(100%-var(--canvas-header-fade))]",
        className,
      )}
    >
      <h1 className="text-xl font-bold text-foreground-strong">{title}</h1>
      {description != null && <p className="mt-4">{description}</p>}
    </div>
  );
}
