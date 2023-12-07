import { getMetadataForAnimation } from "@/app/nav-tree";
import { standingFree } from "./animation";

export const metadata = getMetadataForAnimation(standingFree);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
