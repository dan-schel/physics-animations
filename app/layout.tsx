import { Inter } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import Sidebar from "../components/sidebar";
import OpenSidebarButton from "../components/open-sidebar-button";
import { getMetadataForPage } from "./nav-tree-utils";

const inter = Inter({ subsets: ["latin"], axes: ["slnt"] });

export const metadata = getMetadataForPage("Home", "/");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.page}`}>
        <Sidebar className={styles.sidebar}></Sidebar>
        <OpenSidebarButton
          className={styles.openSidebarButton}
        ></OpenSidebarButton>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
