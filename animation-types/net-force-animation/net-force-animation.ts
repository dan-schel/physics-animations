import { AnimationType } from "../animation-type";
import { ForcesFunction } from "./functions";
import { Graphic } from "./graphics";
import { NetForceAnimationOptions } from "./net-force-animation-options";
import { NetForceAnimationRenderer } from "./net-force-animation-renderer";

export class NetForceAnimationType extends AnimationType<NetForceAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    renderer: NetForceAnimationRenderer,
  ) {
    super(
      title,
      description,
      href,
      duration,
      autoLoop,
      new NetForceAnimationOptions(),
      renderer,
    );
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
    forces,
    graphic,
    graphicOffset,
    forceDiagramOffset,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
    forces: ForcesFunction;
    graphic: Graphic;
    graphicOffset?: { x: number; y: number };
    forceDiagramOffset?: { x: number; y: number };
  }) {
    return new NetForceAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new NetForceAnimationRenderer(
        forces,
        graphic,
        graphicOffset,
        forceDiagramOffset,
      ),
    );
  }
}
