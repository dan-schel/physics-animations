import { useState } from "react";
import AnimationCanvas from "./AnimationCanvas";
import AnimationHeader from "./AnimationHeader";
import CustomisePanel from "./CustomisePanel";
import PlaybackControls from "./PlaybackControls";
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
        className="z-2 [grid-area:header]"
        title={animation.title}
        description={animation.description ?? undefined}
      ></AnimationHeader>
      <AnimationCanvas
        className="z-0 -mt-(--canvas-header-fade) -mb-(--canvas-header-fade) [grid-area:canvas]"
        animation={animation}
        time={time}
        optionValues={optionValues}
      ></AnimationCanvas>
      <PlaybackControls
        className="z-1 [grid-area:playback]"
        animation={animation}
        time={time}
        setTime={setTime}
      ></PlaybackControls>
      <CustomisePanel
        className="z-4 [grid-area:options]"
        animation={animation}
        optionValues={optionValues}
        setOptionValues={setOptionValues}
      ></CustomisePanel>
    </div>
  );
}
