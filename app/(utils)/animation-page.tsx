import { useState } from "react";
import AnimationCanvas from "./animation-canvas";
import AnimationHeader from "./animation-header";
import OptionMenu from "./option-menu";
import PlaybackControls from "./playback-controls";
import { AnimationType } from "@/data/animation";
import { AnimationOptions } from "@/data/options";
import styles from "./animation-page.module.scss";

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
    <div className={styles.page}>
      <div className={styles.canvasArea}>
        <AnimationHeader
          className={styles.header}
          title={animation.title}
          description={animation.description ?? undefined}
        ></AnimationHeader>
        <AnimationCanvas
          className={styles.canvas}
          animation={animation}
          time={time}
          optionValues={optionValues}
        ></AnimationCanvas>
        <PlaybackControls
          className={styles.playback}
          animation={animation}
          time={time}
          setTime={setTime}
        ></PlaybackControls>
      </div>
      <OptionMenu
        className={styles.options}
        animation={animation}
        optionValues={optionValues}
        setOptionValues={setOptionValues}
      ></OptionMenu>
    </div>
  );
}
