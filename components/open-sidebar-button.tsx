"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UilTimes } from "./icons/uil-times";
import { UilBars } from "./icons/uil-bars";
import clsx from "clsx";

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
    <button
      className={clsx(
        className,
        "flex px-2 items-center gap-2 h-8 border-soft-border border rounded-sm hover:bg-soft-hover active:bg-soft-active",
      )}
      onClick={() => {
        document.body.classList.toggle("sidebarOpen");
        setSidebarOpen(isSidebarOpen());
      }}
    >
      {sidebarOpen ? (
        <>
          <UilTimes className="text-lg"></UilTimes>
          <p>Close menu</p>
        </>
      ) : (
        <>
          <UilBars className="text-lg"></UilBars>
          <p>Open menu</p>
        </>
      )}
    </button>
  );
}

function isSidebarOpen() {
  return document.body.classList.contains("sidebarOpen");
}
