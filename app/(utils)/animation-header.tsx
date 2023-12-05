import styles from "./animation-header.module.scss";

export default function AnimationHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      {description != null && <p>{description}</p>}
    </div>
  );
}
