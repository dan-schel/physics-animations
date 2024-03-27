import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { blank } from "./animation";

export const metadata = getMetadataForAnimation(blank);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
