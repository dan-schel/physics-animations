import styles from "./option-menu.module.scss";
import {
  AnimationOptionDefinition,
  AnimationOptionValues,
  AnimationOptions,
} from "@/data/options";
import { AnimationType } from "@/data/animation";
import { Dispatch, SetStateAction } from "react";

export default function OptionMenu({
  animation,
  optionValues,
  setOptionValues,
}: {
  animation: AnimationType<AnimationOptions>;
  optionValues: AnimationOptionValues<AnimationOptions>;
  setOptionValues: Dispatch<
    SetStateAction<AnimationOptionValues<AnimationOptions>>
  >;
}) {
  return (
    <div className={styles.options}>
      <p>Customize animation</p>
      {animation.options.definitions.map((o) => (
        <OptionInput
          key={o.id}
          definition={o}
          value={optionValues.get(o.id)}
          onChange={(value) => setOptionValues(optionValues.with(o.id, value))}
        ></OptionInput>
      ))}
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
