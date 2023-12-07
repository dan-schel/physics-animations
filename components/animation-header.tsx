import styles from "./animation-header.module.scss";

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
    <div className={`${styles.header} ${className ?? ""}`}>
      <h1>{title}</h1>
      {description != null && <p>{description}</p>}
    </div>
  );
}
