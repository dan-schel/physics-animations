import styles from "./option-menu.module.scss";
import {
  AnimationOptionDefinition,
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";
import { AnimationType } from "@/animation-types/animation-type";
import { Dispatch, SetStateAction, useState } from "react";

export default function OptionMenu({
  animation,
  optionValues,
  setOptionValues,
  className,
}: {
  animation: AnimationType<AnimationOptions>;
  optionValues: AnimationOptionValues<AnimationOptions>;
  setOptionValues: Dispatch<
    SetStateAction<AnimationOptionValues<AnimationOptions>>
  >;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(true);

  function handleExpandButtonClick() {
    setExpanded((currentValue) => !currentValue);
  }

  return (
    <div className={`${styles.menu} ${className ?? ""}`}>
      <button className={styles.expandButton} onClick={handleExpandButtonClick}>
        <p>Customize animation</p>
        <ChevronIcon
          className={expanded ? styles.down : styles.up}
        ></ChevronIcon>
      </button>
      {expanded && (
        <div className={styles.options}>
          {animation.options.definitions.map((o) => (
            <OptionInput
              key={o.id}
              definition={o}
              value={optionValues.get(o.id)}
              onChange={(value) =>
                setOptionValues(optionValues.with(o.id, value))
              }
            ></OptionInput>
          ))}
        </div>
      )}
    </div>
  );
}

function OptionInput({
  definition,
  value,
  onChange,
}: {
  definition: AnimationOptionDefinition;
  value: unknown;
  onChange: (value: any) => void;
}) {
  if (definition.type == "boolean") {
    return (
      <BooleanOptionInput
        definition={definition}
        value={value as boolean}
        onChange={onChange}
      ></BooleanOptionInput>
    );
  } else {
    throw new Error(`Unrecognized option type "${definition.type}".`);
  }
}

function BooleanOptionInput({
  definition,
  value,
  onChange,
}: {
  definition: AnimationOptionDefinition;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        autoComplete="off"
      />
      <div>
        <div className={styles.switchGraphic}></div>
        <div className={styles.switchContent}>
          <p>{definition.displayName}</p>
        </div>
      </div>
    </label>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`icon ${className ?? ""}`}
    >
      <path
        fill="currentColor"
        d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z"
      />
    </svg>
  );
}
