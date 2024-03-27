import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { reflectionFree } from "./animation";

export const metadata = getMetadataForAnimation(reflectionFree);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
