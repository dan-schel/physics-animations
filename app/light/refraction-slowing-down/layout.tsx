import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { refractionSlowingDown } from "./animation";

export const metadata = getMetadataForAnimation(refractionSlowingDown);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
