import { getMetadataForAnimation } from "@/app/nav-tree";
import { bankedTrackFriction } from "./animation";

export const metadata = getMetadataForAnimation(bankedTrackFriction);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
