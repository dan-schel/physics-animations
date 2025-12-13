import {
  AnimationOptionDefinition,
  AnimationOptionValues,
  AnimationOptions,
} from "@/animation-types/animation-options";
import { AnimationType } from "@/animation-types/animation-type";
import { Dispatch, SetStateAction, useState } from "react";
import { UilAngleRightB } from "./icons/UilAngleRightB";
import Switch from "./Switch";
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
        "bg-background-raised border-t-subtle-border border-t",
        className,
      )}
    >
      {animation.options.definitions.length === 0 && (
        <p className="text-foreground-weak p-4 italic lg:px-8">
          (No customisation options)
        </p>
      )}
      {animation.options.definitions.length > 0 && (
        <>
          <button
            className="hover:bg-soft-hover active:bg-soft-active grid w-full grid-cols-[1fr_auto] items-center p-4 lg:px-8"
            onClick={handleExpandButtonClick}
          >
            <p className="text-foreground-strong text-left font-bold">
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
            <div className="flex max-h-[calc(40vh-10rem)] flex-col gap-3 overflow-y-auto px-4 pb-4 lg:px-8">
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
