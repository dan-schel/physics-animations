import { getMetadataForAnimation } from "@/app/nav-tree";
import { refractionCriticalAngle } from "./animation";

export const metadata = getMetadataForAnimation(refractionCriticalAngle);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
