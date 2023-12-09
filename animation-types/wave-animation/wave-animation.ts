import { AnimationType } from "../animation-type";
import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";
import { WaveFunction } from "./functions";
import {
  EndpointType,
  Ruler,
  WaveAnimationRenderer,
} from "./wave-animation-renderer";

export class WaveAnimationType extends AnimationType<WaveAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    options: WaveAnimationOptions,
    renderer: WaveAnimationRenderer,
  ) {
    super(title, description, href, duration, autoLoop, options, renderer);
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    waves,
    leftEnd,
    rightEnd,
    rulers = [],
    rulersOptionText = "Show rulers",
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    waves: WaveFunction[];
    leftEnd: EndpointType;
    rightEnd: EndpointType;
    rulers?: Ruler[];
    rulersOptionText?: string;
  }) {
    return new WaveAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new WaveAnimationOptions(rulers.length > 0 ? rulersOptionText : null),
      new WaveAnimationRenderer(waves, leftEnd, rightEnd, rulers),
    );
  }
}

export class WaveAnimationOptions extends AnimationOptions {
  static readonly superposition = "superposition";
  static readonly components = "components";
  static readonly particles = "particles";
  static readonly longitudinal = "longitudinal";
  static readonly rulers = "rulers";

  constructor(rulersOption: string | null) {
    super([
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.superposition,
        "Show superposition",
        true,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.components,
        "Show wave components",
        false,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.particles,
        "Show particles",
        false,
      ),
      AnimationOptionDefinition.boolean(
        WaveAnimationOptions.longitudinal,
        "Show particles as longitudinal",
        false,
      ),
      ...(rulersOption != null
        ? [
            AnimationOptionDefinition.boolean(
              WaveAnimationOptions.rulers,
              rulersOption,
              false,
            ),
          ]
        : []),
    ]);
  }
}
