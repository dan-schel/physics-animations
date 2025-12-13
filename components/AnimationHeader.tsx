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
        "from-background bg-linear-180 from-[calc(100%-var(--canvas-header-fade))] to-transparent px-4 pt-8 pb-(--canvas-header-fade) lg:px-8",
        className,
      )}
    >
      <h1 className="text-foreground-strong text-xl font-bold">{title}</h1>
      {description != null && <p className="mt-2">{description}</p>}
    </div>
  );
}
