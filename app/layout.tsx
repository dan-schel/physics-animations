import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import OpenSidebarButton from "../components/OpenSidebarButton";
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
          'bg-background text-foreground grid h-svh grid-cols-[1fr] [grid-template-areas:"main"] lg:grid-cols-[auto_1fr] lg:[grid-template-areas:"sidebar_main"]',
        )}
      >
        <Sidebar className="max-lg:sidebar-open:visible max-lg:sidebar-open:opacity-100 max-lg:sidebar-open:translate-x-0 z-1 transition-[translate,opacity,visibility] duration-200 max-lg:invisible max-lg:fixed max-lg:h-full max-lg:w-[min(calc(100vw-2rem),25rem)] max-lg:-translate-x-4 max-lg:opacity-0 max-lg:[--extra-margin:3rem] lg:w-[min(25rem,30vw)] lg:[grid-area:sidebar]"></Sidebar>
        <OpenSidebarButton
          className={
            "max-lg:sidebar-open:fixed absolute top-4 left-4 z-2 lg:hidden"
          }
        ></OpenSidebarButton>
        <main className="z-0 grid [grid-area:main] max-lg:mt-12">
          {children}
        </main>
      </body>
    </html>
  );
}
