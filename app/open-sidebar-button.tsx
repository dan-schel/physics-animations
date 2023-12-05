"use client";

import { useEffect, useState } from "react";
import styles from "./open-sidebar-button.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

export default function OpenSidebarButton({
  className,
}: {
  className?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    setSidebarOpen(isSidebarOpen());
  }, []);

  // Close the sidebar upon navigation.
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    document.body.classList.remove("sidebarOpen");
    setSidebarOpen(false);
  }, [pathname, searchParams]);

  // The button is wrapped inside a div because css-template overrides
  // "position: fixed" for "position: relative" for buttons.
  return (
    <div className={className}>
      <button
        className={styles.button}
        onClick={() => {
          document.body.classList.toggle("sidebarOpen");
          setSidebarOpen(isSidebarOpen());
        }}
      >
        {sidebarOpen ? (
          <>
            <CloseIcon></CloseIcon>
            <p>Close menu</p>
          </>
        ) : (
          <>
            <HamburgerIcon></HamburgerIcon>
            <p>Open menu</p>
          </>
        )}
      </button>
    </div>
  );
}

function isSidebarOpen() {
  return document.body.classList.contains("sidebarOpen");
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="icon"
    >
      <path
        fill="currentColor"
        d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2Zm18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Zm0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="icon"
    >
      <path
        fill="currentColor"
        d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
      />
    </svg>
  );
}
