export default function Home() {
  return (
    <main className="py-8 px-4 lg:px-8 max-w-240">
      <h1 className="text-2xl font-bold text-foreground-strong mb-6">
        VCE Physics Animations
      </h1>
      <p className="mb-6">
        This is a small collection of animations I&apos;ve created, which
        I&apos;ve found useful for explaining VCE Physics concepts.
      </p>
      <p className="mb-6">
        Please use the menu on the left (click &quot;Open menu&quot; if
        you&apos;re on a device with a small screen) to navigate to the
        animations.
      </p>
      <p className="mb-6">
        This site and all the animations on it are open source under the{" "}
        <a
          className="text-accent hover:underline"
          href="https://github.com/dan-schel/physics-animations/blob/main/LICENSE"
        >
          MIT License
        </a>
        , so feel free to use it however you&apos;d like. You can also view the
        code, leave feedback, or even contribute to the project by heading over
        to{" "}
        <a
          className="text-accent hover:underline"
          href="https://github.com/dan-schel/physics-animations"
        >
          GitHub
        </a>
        .
      </p>
      <p className="mb-6">© 2023-present Dan Schellekens</p>
    </main>
  );
}
