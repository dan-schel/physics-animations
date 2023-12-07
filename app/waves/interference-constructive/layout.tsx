import { getMetadataForAnimation } from "@/app/nav-tree";
import { interferenceConstructive } from "./animation";

export const metadata = getMetadataForAnimation(interferenceConstructive);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
