import { areUnique } from "@dan-schel/js-utils";

export class AnimationOptionDefinition {
  constructor(
    readonly id: string,
    readonly displayName: string,
    readonly type: "boolean",
    readonly defaultValue: unknown,
  ) {}

  static boolean(id: string, displayName: string, defaultValue: boolean) {
    return new AnimationOptionDefinition(
      id,
      displayName,
      "boolean",
      defaultValue,
    );
  }
}

export class AnimationOptions {
  private _definitions: AnimationOptionDefinition[] | null = null;

  define(): AnimationOptionDefinition[] {
    return [];
  }

  get definitions(): AnimationOptionDefinition[] {
    if (this._definitions == null) {
      const defs = this.define();

      if (!areUnique(defs.map((d) => d.id))) {
        throw new Error("Option definition IDs are not unique.");
      }

      AnimationOptions._validate(
        AnimationOptions._createDefaultValuesRecord(defs),
        defs,
      );

      this._definitions = defs;
    }

    return this._definitions;
  }

  validate(values: Record<string, unknown>) {
    AnimationOptions._validate(values, this.definitions);
  }

  getDefaultValues(): AnimationOptionValues<this> {
    return new AnimationOptionValues(
      this,
      AnimationOptions._createDefaultValuesRecord(this.definitions),
    );
  }

  private static _validate(
    values: Record<string, unknown>,
    definitions: AnimationOptionDefinition[],
  ) {
    for (const option of definitions) {
      if (option.type === "boolean") {
        if (typeof values[option.id] !== "boolean") {
          throw new Error(`Expected boolean for option "${option.id}".`);
        }
      } else {
        throw new Error(`Unknown option type "${option.type}".`);
      }
    }
  }

  private static _createDefaultValuesRecord(
    definitions: AnimationOptionDefinition[],
  ): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    for (const option of definitions) {
      values[option.id] = option.defaultValue;
    }
    return values;
  }
}

export class AnimationOptionValues<
  OptionType extends AnimationOptions = AnimationOptions,
> {
  constructor(
    readonly shape: OptionType,
    readonly options: Record<string, unknown>,
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
