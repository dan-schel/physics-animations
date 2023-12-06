// TODO: When it comes time to add other types of properties, make this a
// discriminated union to ensure the "defaultValue" property's type matches
// based on the value of "type".
export type OptionDefinition = {
  readonly id: string;
  readonly displayName: string;
  readonly type: "boolean";
  readonly defaultValue: boolean;
};

export type OptionValues = Record<string, unknown>;

export abstract class AnimationOptions {
  abstract getDefinitions(): OptionDefinition[];

  isValid(values: OptionValues) {
    for (const definition of this.getDefinitions()) {
      const value = values[definition.id];

      if (value == null) {
        return false;
      }

      if (definition.type === "boolean" && typeof value !== "boolean") {
        return false;
      }

      // TODO: Validate other types of option.
    }
  }

  getDefaultValues() {
    const values: OptionValues = {};
    this.getDefinitions().forEach((d) => {
      values[d.id] = d.defaultValue;
    });
    return values;
  }
}
