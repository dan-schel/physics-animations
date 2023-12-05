import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1>Error 404 - Page not found</h1>
      <p>This page doesn&apos;t exist, at least not anymore!</p>
      <p>
        <Link className="link" href="/">
          Here&apos;s a link to the homepage.
        </Link>
      </p>
    </div>
  );
}
