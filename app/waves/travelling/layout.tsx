import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { travelling } from "./animation";

export const metadata = getMetadataForAnimation(travelling);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
