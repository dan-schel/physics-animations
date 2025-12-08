import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/sidebar";
import OpenSidebarButton from "../components/open-sidebar-button";
import { getMetadataForPage } from "./nav-tree-utils";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], axes: [] });

export const metadata = getMetadataForPage("Home", "/");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          'bg-background text-foreground grid h-screen grid-cols-[1fr] lg:grid-cols-[auto_1fr] [grid-template-areas:"main"] lg:[grid-template-areas:"sidebar_main"]',
        )}
      >
        <Sidebar className="transition-[translate,opacity,visibility] duration-200 z-1 lg:[grid-area:sidebar] lg:w-[min(25rem,30vw)] max-lg:fixed max-lg:w-[min(calc(100vw-2rem),25rem)] max-lg:h-full max-lg:invisible max-lg:opacity-0 max-lg:-translate-x-4 max-lg:[--extra-margin:3rem] max-lg:sidebar-open:visible max-lg:sidebar-open:opacity-100 max-lg:sidebar-open:translate-x-0"></Sidebar>
        <OpenSidebarButton
          className={
            "absolute top-4 left-4 z-2 lg:hidden max-lg:sidebar-open:fixed"
          }
        ></OpenSidebarButton>
        <main className="[grid-area:main] grid z-0 max-lg:mt-12">
          {children}
        </main>
      </body>
    </html>
  );
}
