import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { standingFree } from "./animation";

export const metadata = getMetadataForAnimation(standingFree);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
