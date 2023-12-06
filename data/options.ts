import { areUnique } from "@schel-d/js-utils";

export class AnimationOptionDefinition {
  constructor(
    readonly id: string,
    readonly displayName: string,
    readonly type: "boolean",
    readonly defaultValue: unknown
  ) {}

  static boolean(id: string, displayName: string, defaultValue: boolean) {
    return new AnimationOptionDefinition(
      id,
      displayName,
      "boolean",
      defaultValue
    );
  }
}

export class AnimationOptions {
  constructor(readonly definitions: AnimationOptionDefinition[]) {
    if (!areUnique(definitions.map((d) => d.id))) {
      throw new Error("Option definition IDs are not unique.");
    }

    this.validate(
      AnimationOptions._createDefaultValuesRecord(this.definitions)
    );
  }

  validate(values: Record<string, unknown>) {
    for (const option of this.definitions) {
      if (option.type === "boolean") {
        if (typeof values[option.id] !== "boolean") {
          throw new Error(`Expected boolean for option "${option.id}".`);
        }
      } else {
        throw new Error(`Unknown option type "${option.type}".`);
      }
    }
  }

  getDefaultValues(): AnimationOptionValues<this> {
    return new AnimationOptionValues(
      this,
      AnimationOptions._createDefaultValuesRecord(this.definitions)
    );
  }

  private static _createDefaultValuesRecord(
    definitions: AnimationOptionDefinition[]
  ): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    for (const option of definitions) {
      values[option.id] = option.defaultValue;
    }
    return values;
  }
}

export class AnimationOptionValues<OptionType extends AnimationOptions> {
  constructor(
    readonly shape: OptionType,
    readonly options: Record<string, unknown>
  ) {
    shape.validate(options);
  }

  get(id: string): unknown | null {
    return this.options[id] ?? null;
  }

  getBoolean(id: string): boolean | null {
    // Using "as" here is okay because the options record has been validated
    // against the shape in the constructor.
    return (this.options[id] as boolean) ?? null;
  }

  requireBoolean(id: string): boolean {
    const value = this.getBoolean(id);
    if (value === null) {
      throw new Error(`There is no option with ID "${id}".`);
    }
    return value;
  }

  with(id: string, value: unknown): AnimationOptionValues<OptionType> {
    const options = { ...this.options };
    options[id] = value;
    return new AnimationOptionValues(this.shape, options);
  }
}
