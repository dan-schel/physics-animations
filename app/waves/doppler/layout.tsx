import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { doppler } from "./animation";

export const metadata = getMetadataForAnimation(doppler);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
