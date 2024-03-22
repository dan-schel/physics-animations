import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { bankedTrackFriction } from "./animation";

export const metadata = getMetadataForAnimation(bankedTrackFriction);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
