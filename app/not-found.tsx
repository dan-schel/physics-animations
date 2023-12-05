import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <MonochromeLogo></MonochromeLogo>
      <h1>Error 404 - Page not found</h1>
      <p>This page doesn&apos;t exist, at least not anymore!</p>
      <p>
        <Link className="link" href="/">
          Here&apos;s a link to the homepage.
        </Link>
      </p>
    </main>
  );
}

function MonochromeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="1"
      height="1"
    >
      <title>Dan Schellekens logo</title>
      <path
        d="M0,0 m14,4h2v4h1v3h-1v-1h-2v1h-1v-3h1z m3,7h1v5h1v3h-1v-1h-1v1h-4v-1h-1v1h-1v-3h1v-5h1v3h1v-1h2v1h1z m-4,9h4v1h-4z m-1,3h1v1h4v-1h1v2h-1v1h-4v-1h-1z m0,4h1v1h-1z m1,1h4v1h-4z m4,-1h1v1h-1z m-13,-5v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1v6z m2,-4v-3h1v-5h1v5h1v1h-1v1h-1v1z m14,-2h1v1h1v1h1v1h1v1h1v1h1v1h-6z m1,-1h1v-5h1v5h1v3h-1v-1h-1v-1h-1z"
        fill="currentColor"
      />
    </svg>
  );
}
