import { getMetadataForAnimation } from "@/app/nav-tree";
import { centripetalForce } from "./animation";

export const metadata = getMetadataForAnimation(centripetalForce);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
