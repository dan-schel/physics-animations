import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { standingFixed } from "./animation";

export const metadata = getMetadataForAnimation(standingFixed);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
