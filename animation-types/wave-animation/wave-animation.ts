import { AnimationType } from "../animation-type";
import { WaveFunction } from "./functions";
import {
  EndpointType,
  Ruler,
  WaveAnimationRenderer,
} from "./wave-animation-renderer";
import { WaveAnimationOptions } from "./wave-animation-options";

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
