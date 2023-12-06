import { AnimationEngine } from "@/engines/animation-engine";
import styles from "./option-menu.module.scss";
import { useMemo, useState } from "react";
import { OptionDefinition } from "@/engines/animation-options";

export default function OptionMenu({ engine }: { engine: AnimationEngine }) {
  const [values, setValues] = useState(engine.getOptionValues());

  const definitions = useMemo(() => engine.options.getDefinitions(), [engine]);

  function handleValueChanged(definition: OptionDefinition, value: any) {
    engine.setOption(definition.id, value);
    setValues(engine.getOptionValues());
  }

  return (
    <div className={styles.options}>
      <p>Customize</p>
      {definitions.map((o) => (
        <OptionInput
          key={o.id}
          definition={o}
          value={values[o.id]}
          onChange={(value) => handleValueChanged(o, value)}
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
  definition: OptionDefinition;
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
  definition: OptionDefinition;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <p>{definition.displayName}</p>
      </label>
    </div>
  );
}
