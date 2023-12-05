import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Animations for VCE Physics</h1>
      <p>
        This is a small collection of animations I&apos;ve created, which
        I&apos;ve found useful for explaining VCE Physics concepts.
      </p>
      <p>
        Please use the menu on the left (click &quot;Open menu&quot; if
        you&apos;re on a device with a small screen) to navigate to the
        animations.
      </p>
      <p>Hope you enjoy!</p>
    </main>
  );
}
