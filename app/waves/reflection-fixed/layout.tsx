import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { reflectionFixed } from "./animation";

export const metadata = getMetadataForAnimation(reflectionFixed);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
