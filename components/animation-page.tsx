import { useState } from "react";
import AnimationCanvas from "./animation-canvas";
import AnimationHeader from "./animation-header";
import CustomisePanel from "./customise-panel";
import PlaybackControls from "./playback-controls";
import { AnimationType } from "@/animation-types/animation-type";
import { AnimationOptions } from "@/animation-types/animation-options";

export default function AnimationPage({
  animation,
}: {
  animation: AnimationType<AnimationOptions>;
}) {
  const [time, setTime] = useState(0);
  const [optionValues, setOptionValues] = useState(
    animation.options.getDefaultValues(),
  );

  return (
    <div className='grid grid-rows-[auto_1fr_auto_auto] [grid-template-areas:"header""canvas""playback""options"]'>
      <AnimationHeader
        className="[grid-area:header] z-2"
        title={animation.title}
        description={animation.description ?? undefined}
      ></AnimationHeader>
      <AnimationCanvas
        className="[grid-area:canvas] z-0 -mt-(--canvas-header-fade) -mb-(--canvas-header-fade)"
        animation={animation}
        time={time}
        optionValues={optionValues}
      ></AnimationCanvas>
      <PlaybackControls
        className="[grid-area:playback] z-1"
        animation={animation}
        time={time}
        setTime={setTime}
      ></PlaybackControls>
      <CustomisePanel
        className="max-h-[30vh] [grid-area:options] z-4"
        animation={animation}
        optionValues={optionValues}
        setOptionValues={setOptionValues}
      ></CustomisePanel>
    </div>
  );
}
