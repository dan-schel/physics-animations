import { AnimationOptions, OptionDefinition } from "../animation-options";

export class WaveBasicOptions extends AnimationOptions {
  getDefinitions(): OptionDefinition[] {
    return [
      {
        id: "superposition",
        displayName: "Show superposition",
        type: "boolean",
        defaultValue: true,
      },
      {
        id: "components",
        displayName: "Show wave components",
        type: "boolean",
        defaultValue: false,
      },
      {
        id: "particles",
        displayName: "Show particles",
        type: "boolean",
        defaultValue: false,
      },
      {
        id: "longitudinal",
        displayName: "Show as longitudinal",
        type: "boolean",
        defaultValue: false,
      },
    ];
  }
}
