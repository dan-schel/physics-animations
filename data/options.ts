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
  readonly options: Record<string, AnimationOptionDefinition>;
  constructor(options: AnimationOptionDefinition[]) {
    this.options = {};
    for (let option of options) {
      this.options[option.id] = option;
    }
    this.validate(AnimationOptions._createDefaultValuesRecord(this.options));
  }

  validate(values: Record<string, unknown>) {
    for (let id in this.options) {
      const option = this.options[id];
      if (option.type === "boolean") {
        if (typeof values[id] !== "boolean") {
          throw new Error(`Expected boolean for option "${id}".`);
        }
      } else {
        throw new Error(`Unknown option type "${option.type}".`);
      }
    }
  }

  getDefaultValues(): AnimationOptionValues<this> {
    return new AnimationOptionValues(
      this,
      AnimationOptions._createDefaultValuesRecord(this.options)
    );
  }

  private static _createDefaultValuesRecord(
    options: Record<string, AnimationOptionDefinition>
  ): Record<string, unknown> {
    const values: Record<string, unknown> = {};
    for (let id in options) {
      values[id] = options[id].defaultValue;
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
