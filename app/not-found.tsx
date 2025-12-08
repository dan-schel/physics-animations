import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 px-6 flex flex-col items-center justify-center">
      <h1 className="text-center mb-4 text-2xl font-bold text-foreground-strong">
        Error 404 - Page not found
      </h1>
      <p className="text-center mb-8">
        This page doesn&apos;t exist, at least not anymore!
      </p>
      <p className="text-center mb-8">
        <Link className="text-accent hover:underline" href="/">
          Here&apos;s a link to the homepage.
        </Link>
      </p>
    </div>
  );
}
