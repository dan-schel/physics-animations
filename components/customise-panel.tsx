import styles from "./customise-panel.module.scss";
import {
  AnimationOptionDefinition,
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";
import { AnimationType } from "@/animation-types/animation-type";
import { Dispatch, SetStateAction, useState } from "react";
import { UilAngleRightB } from "./icons/uil-angle-right-b";
import Switch from "./switch";

export default function CustomisePanel({
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
    <div
      className={`${styles.menu} ${className ?? ""} ${
        expanded ? styles.expanded : ""
      }`}
    >
      {animation.options.definitions.length === 0 && (
        <p className={styles.empty}>(No customisation options)</p>
      )}
      {animation.options.definitions.length > 0 && (
        <>
          <button
            className={styles.expandButton}
            onClick={handleExpandButtonClick}
          >
            <p>Customise animation</p>
            <UilAngleRightB
              className={expanded ? styles.down : styles.up}
            ></UilAngleRightB>
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
        </>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
}) {
  if (definition.type === "boolean") {
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
    <Switch
      label={definition.displayName}
      checked={value}
      onChange={onChange}
    />
  );
}
