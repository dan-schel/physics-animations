import { getMetadataForAnimation } from "@/app/nav-tree";
import { interferenceDestructive } from "./animation";

export const metadata = getMetadataForAnimation(interferenceDestructive);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
