import { useState } from "react";
import AnimationCanvas from "./animation-canvas";
import AnimationHeader from "./animation-header";
import OptionMenu from "./option-menu";
import PlaybackControls from "./playback-controls";
import { AnimationType } from "@/data/animation";
import { AnimationOptions } from "@/data/options";

export default function AnimationPage({
  animation,
}: {
  animation: AnimationType<AnimationOptions>;
}) {
  const [time, setTime] = useState(0);
  const [optionValues, setOptionValues] = useState(
    animation.options.getDefaultValues()
  );

  return (
    <div>
      <AnimationHeader
        title={animation.title}
        description={animation.description ?? undefined}
      ></AnimationHeader>
      <AnimationCanvas
        animation={animation}
        time={time}
        optionValues={optionValues}
      ></AnimationCanvas>
      <PlaybackControls
        animation={animation}
        time={time}
        setTime={setTime}
      ></PlaybackControls>
      <OptionMenu
        animation={animation}
        optionValues={optionValues}
        setOptionValues={setOptionValues}
      ></OptionMenu>
    </div>
  );
}
