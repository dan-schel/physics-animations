import { clamp } from "@schel-d/js-utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./playback-controls.module.scss";
import { AnimationType } from "@/data/animation";
import { AnimationOptions } from "@/data/options";

const precision = 1000;

export default function PlaybackControls({
  animation,
  time,
  setTime,
}: {
  animation: AnimationType<AnimationOptions>;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}) {
  const [paused, setPaused] = useState(false);

  function handlePlayPause() {
    setPaused((currentValue) => !currentValue);
  }

  function handleReset() {
    setTime(0);
  }

  return (
    <div className={styles.controls}>
      <button className={styles.playPause} onClick={handlePlayPause}>
        {paused ? <PlayIcon></PlayIcon> : <PauseIcon></PauseIcon>}
      </button>
      <button className={styles.reset} onClick={handleReset}>
        <ResetIcon></ResetIcon>
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
      setTime((time) => time + delta / 1000);
      lastTimestamp = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [paused, holding, setTime]);

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
      onPointerUp={handleSeekbarReleased}
    ></input>
  );
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.icon} icon`}
    >
      <path fill="currentColor" d="M8 5.14v14l11-7l-11-7Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.icon} icon`}
    >
      <path fill="currentColor" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.icon} icon`}
    >
      <g transform="translate(24 0) scale(-1 1)">
        <path
          fill="currentColor"
          d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4q.425 0 .713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10q0-.425.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20Z"
        />
      </g>
    </svg>
  );
}
