import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { projectileMotion } from "./animation";

export const metadata = getMetadataForAnimation(projectileMotion);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
