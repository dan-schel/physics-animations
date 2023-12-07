import { getMetadataForAnimation } from "@/app/nav-tree";
import { standingFixed } from "./animation";

export const metadata = getMetadataForAnimation(standingFixed);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
