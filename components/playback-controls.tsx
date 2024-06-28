import { clamp } from "@dan-schel/js-utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./playback-controls.module.scss";
import { AnimationType } from "@/animation-types/animation-type";
import { AnimationOptions } from "@/animation-types/animation-options";
import { MaterialSymbolsRefreshRounded } from "./icons/material-symbols-refresh-rounded";
import { MdiPlay } from "./icons/mdi-play";
import { MdiPause } from "./icons/mdi-pause";

const precision = 1000;
const arrowKeyJumps = 0.5;

export default function PlaybackControls({
  animation,
  time,
  setTime,
  className,
}: {
  animation: AnimationType<AnimationOptions>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  function handlePlayPause() {
    setPaused((currentValue) => !currentValue);
  }

  function handleReset() {
    setTime(0);
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!(e.target instanceof HTMLBodyElement)) {
        return;
      }

      if (e.code === "Space") {
        if (!e.repeat) {
          setPaused((currentValue) => !currentValue);
        }
        e.preventDefault();
      }

      if (e.code === "ArrowLeft") {
        if (e.ctrlKey) {
          setTime(0);
        } else {
          setTime((time) => clamp(time - arrowKeyJumps, 0, animation.duration));
        }
        e.preventDefault();
      }

      if (e.code === "ArrowRight") {
        if (e.ctrlKey) {
          setTime(animation.duration);
        } else {
          setTime((time) => clamp(time + arrowKeyJumps, 0, animation.duration));
        }
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [setPaused, setTime, animation]);

  return (
    <div className={`${styles.controls} ${className ?? ""}`}>
      <button className={styles.playPause} onClick={handlePlayPause}>
        {paused ? <MdiPlay></MdiPlay> : <MdiPause></MdiPause>}
      </button>
      <button className={styles.reset} onClick={handleReset}>
        <MaterialSymbolsRefreshRounded></MaterialSymbolsRefreshRounded>
      </button>
      <Seekbar
        animation={animation}
        time={time}
        setTime={setTime}
        paused={paused}
      ></Seekbar>
    </div>
  );
}

function Seekbar({
  animation,
  time,
  setTime,
  paused,
}: {
  animation: AnimationType<AnimationOptions>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  paused: boolean;
}) {
  const [holding, setHolding] = useState(false);
  const seekbarValue = clamp(time / animation.duration, 0, 1) * precision;

  const requestRef = useRef<number>();

  useEffect(() => {
    if (paused || holding) {
      requestRef.current = undefined;
      return;
    }

    let lastTimestamp: number | null = null;
    const animate = (timestamp: number) => {
      const delta = lastTimestamp == null ? 0 : timestamp - lastTimestamp;
      if (animation.autoLoop) {
        setTime((time) => (time + delta / 1000) % animation.duration);
      } else {
        setTime((time) => time + delta / 1000);
      }
      lastTimestamp = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [paused, holding, setTime, animation]);

  function handleSeekbarChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    const newTime = (value / precision) * animation.duration;
    setTime(newTime);
  }

  function handleSeekbarHeld() {
    setHolding(true);
  }

  function handleSeekbarReleased() {
    setHolding(false);
  }

  return (
    <input
      className={styles.seekbar}
      type="range"
      min={0}
      max={precision}
      value={seekbarValue}
      onChange={handleSeekbarChanged}
      onPointerDown={handleSeekbarHeld}
      onPointerLeave={handleSeekbarReleased}
      onPointerCancel={handleSeekbarReleased}
      onPointerUp={handleSeekbarReleased}
    ></input>
  );
}
