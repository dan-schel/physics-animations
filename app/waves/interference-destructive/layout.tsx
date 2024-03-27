import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { interferenceDestructive } from "./animation";

export const metadata = getMetadataForAnimation(interferenceDestructive);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
