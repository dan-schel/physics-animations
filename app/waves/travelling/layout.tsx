import { getMetadataForAnimation } from "@/app/nav-tree";
import { travelling } from "./animation";

export const metadata = getMetadataForAnimation(travelling);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
