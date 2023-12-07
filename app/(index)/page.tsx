import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>VCE Physics Animations</h1>
      <p>
        This is a small collection of animations I&apos;ve created, which
        I&apos;ve found useful for explaining VCE Physics concepts.
      </p>
      <p>
        Please use the menu on the left (click &quot;Open menu&quot; if
        you&apos;re on a device with a small screen) to navigate to the
        animations.
      </p>
      <p>
        This site and all the animations on it are open source under the{" "}
        <a
          className="link"
          href="https://github.com/schel-d/physics-animations/blob/main/LICENSE"
        >
          MIT License
        </a>
        , so feel free to use it however you&apos;d like. You can also view the
        code on{" "}
        <a
          className="link"
          href="https://github.com/schel-d/physics-animations"
        >
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
