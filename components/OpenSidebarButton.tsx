"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UilTimes } from "./icons/UilTimes";
import { UilBars } from "./icons/UilBars";
import clsx from "clsx";

export default function OpenSidebarButton({
  className,
}: {
  className?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(isSidebarOpen());
  }, []);

  // Close the sidebar upon navigation.
  const pathname = usePathname();
  useEffect(() => {
    document.body.classList.remove("sidebarOpen");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <button
      className={clsx(
        className,
        "border-soft-border hover:bg-soft-hover active:bg-soft-active flex h-8 items-center gap-2 rounded-sm border px-2",
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
