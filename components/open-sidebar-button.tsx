"use client";

import { useEffect, useState } from "react";
import styles from "./open-sidebar-button.module.scss";
import { usePathname } from "next/navigation";
import { UilTimes } from "./icons/uil-times";
import { UilBars } from "./icons/uil-bars";

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
  useEffect(() => {
    document.body.classList.remove("sidebarOpen");
    setSidebarOpen(false);
  }, [pathname]);

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
            <UilTimes></UilTimes>
            <p>Close menu</p>
          </>
        ) : (
          <>
            <UilBars></UilBars>
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
