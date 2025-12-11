import {
  AnimationOptionDefinition,
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";
import { AnimationType } from "@/animation-types/animation-type";
import { Dispatch, SetStateAction, useState } from "react";
import { UilAngleRightB } from "./icons/uil-angle-right-b";
import Switch from "./switch";
import clsx from "clsx";

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
      className={clsx(
        "bg-background-raised border-t border-t-subtle-border",
        className,
      )}
    >
      {animation.options.definitions.length === 0 && (
        <p className="p-4 italic text-foreground-weak lg:px-8">
          (No customisation options)
        </p>
      )}
      {animation.options.definitions.length > 0 && (
        <>
          <button
            className="p-4 lg:px-8 grid grid-cols-[1fr_auto] hover:bg-soft-hover active:bg-soft-active items-center w-full"
            onClick={handleExpandButtonClick}
          >
            <p className="text-left text-foreground-strong font-bold">
              Customise animation
            </p>
            <UilAngleRightB
              className={clsx("text-lg", {
                "rotate-90": expanded,
                "rotate-270": !expanded,
              })}
            ></UilAngleRightB>
          </button>
          {expanded && (
            <div className="p-4 pt-2 flex flex-col gap-4 overflow-y-auto shrink lg:px-8">
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
