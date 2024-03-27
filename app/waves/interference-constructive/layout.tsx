import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { interferenceConstructive } from "./animation";

export const metadata = getMetadataForAnimation(interferenceConstructive);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
