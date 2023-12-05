import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import Sidebar from "./sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animations for VCE Physics",
  description:
    "A small collection of animations useful for explaining VCE Physics concepts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.page}`}>
        <Sidebar className={styles.sidebar}></Sidebar>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
