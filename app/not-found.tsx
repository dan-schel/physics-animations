import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-foreground-strong mb-4 text-center text-2xl font-bold">
        Error 404 - Page not found
      </h1>
      <p className="mb-8 text-center">
        This page doesn&apos;t exist, at least not anymore!
      </p>
      <p className="mb-8 text-center">
        <Link className="text-accent hover:underline" href="/">
          Here&apos;s a link to the homepage.
        </Link>
      </p>
    </div>
  );
}
