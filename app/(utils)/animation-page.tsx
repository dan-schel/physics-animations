import { WaveBasicEngine } from "@/engines/wave-basic/wave-basic-engine";
import { useMemo } from "react";
import AnimationCanvas from "./animation-canvas";
import AnimationHeader from "./animation-header";
import OptionMenu from "./option-menu";
import PlaybackControls from "./playback-controls";
import { AnimationType } from "@/data/animation";
import { WaveAnimationRenderer } from "@/data/wave-animation/wave-animation-renderer";

export default function AnimationPage({
  animation,
}: {
  animation: AnimationType;
}) {
  const engine = useMemo(() => {
    return new WaveBasicEngine(
      (animation.renderer as WaveAnimationRenderer).waves,
      animation.duration,
      false
    );
  }, []);

  return (
    <div>
      <AnimationHeader
        title={animation.name}
        description={animation.description ?? undefined}
      ></AnimationHeader>
      <AnimationCanvas engine={engine}></AnimationCanvas>
      <PlaybackControls engine={engine}></PlaybackControls>
      <OptionMenu engine={engine}></OptionMenu>
    </div>
  );
}
