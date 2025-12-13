import { clamp } from "@dan-schel/js-utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AnimationType } from "@/animation-types/animation-type";
import { AnimationOptions } from "@/animation-types/animation-options";
import { MaterialSymbolsRefreshRounded } from "./icons/MaterialSymbolsRefreshRounded";
import { MdiPlay } from "./icons/MdiPlay";
import { MdiPause } from "./icons/MdiPause";
import clsx from "clsx";

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
    <div
      className={clsx(
        'pb-8 px-4 grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] [grid-template-areas:"playPause_._reset""seekbar_seekbar_seekbar"] gap-4 items-center pt-(--canvas-header-fade) bg-linear-0 from-background to-transparent from-[calc(100%-var(--canvas-header-fade))] lg:px-8 lg:grid-rows-[auto] lg:[grid-template-areas:"playPause_seekbar_reset"]',
        className,
      )}
    >
      <button
        className="[grid-area:playPause] rounded-full border border-soft-border w-12 h-12 flex items-center justify-center hover:bg-soft-hover active:bg-soft-active"
        onClick={handlePlayPause}
      >
        {paused ? (
          <MdiPlay className="text-[2rem]" />
        ) : (
          <MdiPause className="text-[2rem]" />
        )}
      </button>
      <button
        className="[grid-area:reset] rounded-full border border-soft-border w-12 h-12 flex items-center justify-center hover:bg-soft-hover active:bg-soft-active"
        onClick={handleReset}
      >
        <MaterialSymbolsRefreshRounded className="text-[1.75rem] -scale-x-100" />
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
      className="[grid-area:seekbar] accent-accent cursor-pointer"
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
