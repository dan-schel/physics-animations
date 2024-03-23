# Adding animations to the site

Here's a step-by-step guide to adding animations to the site.

## Step 1 - Getting set up

**TODO:** Forking the repo, installing dependencies, etc.

## Step 2 - Creating the NextJS page.

Every animation needs a dedicated subfolder inside the `app` folder, containing:

- `animation.ts` - The typescript constant that defines the animation.
- `page.tsx` - The component NextJS renders.
- `layout.tsx` - The page metadata (title/description for SEO) and layout.

See [`app/waves/travelling`](https://github.com/dan-schel/physics-animations/tree/master/app/waves/travelling) for examples of each.

### The `animation.ts` file

The `animation.ts` file is responsible for exporting a constant that inherits from `AnimationType` and defines the animation itself. It provides a title, description, duration, renderer, and more. For now we can use `BlankAnimationType` to get started:

```ts
// File: app/topic/my-custom-animation/animation.ts

import { BlankAnimationType } from "@/animation-types/blank-animation/blank-animation";

export const myCustomAnimation = BlankAnimationType.fromObject({
  title: "My custom animation",
  description: "This is an animation I made, wow!",
  href: "/topic/my-custom-animation",
  duration: 5,
  autoLoop: true,
});
```

Be sure to set `href` to match the location of the subfolder you created (without the `app`).

### The `page.tsx` file

The `page.tsx` file is just boilerplate code which hooks your animation up with the NextJS router. It imports your animation object from `animation.ts` and passes it to an `AnimationPage` component to render it:

```tsx
// File: app/topic/my-custom-animation/page.tsx

"use client";

import AnimationPage from "@/components/animation-page";
import { myCustomAnimation } from "./animation";

export default function Page() {
  return <AnimationPage animation={myCustomAnimation}></AnimationPage>;
}
```

All `page.tsx` files should look identical, aside from name of the `myCustomAnimation` constant.

### The `layout.tsx` file

Similarly to `page.tsx`, `layout.tsx` is also boilerplate code for the NextJS router. It again imports your animation from `animation.ts`, but this time passes it to `getMetadataForAnimation`, which sets up the page title, description, and other SEO tags:

```tsx
// File: app/topic/my-custom-animation/layout.tsx

import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { myCustomAnimation } from "./animation";

export const metadata = getMetadataForAnimation(myCustomAnimation);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Again, all `layout.tsx` files should look identical, aside from name of the `myCustomAnimation` constant.

### Viewing the page

By this point you should be able to navigate to [`http://localhost:3000/topic/my-custom-animation`](http://localhost:3000/topic/my-custom-animation) to see the blank page soon to house your animation!

## Step 3 - Creating a custom animation renderer

The classes which inherit from `AnimationRenderer` are the classes actually responsible for making draw calls to the canvas, which they do in their `render` method:

```ts
// File: animation-types/my-custom-animation/my-custom-animation-renderer.ts

import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { red } from "../utils/colors";
import { centerFrame } from "../utils/framing";

const width = 250;
const height = 200;

const circleColor = red;
const circleRadius = 20;
const oscillationWidth = 50;
const oscillationPeriod = 5;

export class MyCustomAnimationRenderer extends AnimationRenderer {
  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    options: AnimationOptionValues,
  ): void {
    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);

    // Draw a circle that oscillates horizontally!
    const x =
      Math.sin((time / oscillationPeriod) * Math.PI * 2) * oscillationWidth;
    ctx.fillStyle = circleColor;
    ctx.beginPath();
    ctx.ellipse(x, 0, circleRadius, circleRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
```

Now to use your custom renderer, implement your custom animation type:

```ts
// File: animation-types/my-custom-animation/my-custom-animation.ts

import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
import { MyCustomAnimationRenderer } from "./my-custom-animation-renderer";

export class MyCustomAnimationType extends AnimationType {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    options: AnimationOptions,
    renderer: MyCustomAnimationRenderer, // <-- Using MyCustomAnimationRenderer
  ) {
    super(title, description, href, duration, autoLoop, options, renderer);
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
  }) {
    return new BlankAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new AnimationOptions(),
      new MyCustomAnimationRenderer(), // <-- Using MyCustomAnimationRenderer
    );
  }
}
```

And switch your `animation.ts` file from being a `BlankAnimationType` to a `MyCustomAnimationType`:

```ts
// File: app/topic/my-custom-animation/animation.ts

import { MyCustomAnimationType } from "@/animation-types/my-custom-animation/my-custom-animation";

//                            Using MyCustomAnimationType
//                                         V
export const myCustomAnimation = MyCustomAnimationType.fromObject({
  title: "My custom animation",
  description: "This is an animation I made, wow!",
  href: "/topic/my-custom-animation",
  duration: 5,
  autoLoop: true,
});
```

You should now see a red circle oscillating horizontally across the screen as your animation. You can customise the `render` method within `MyCustomAnimationRenderer` to draw whatever you'd like!

## Step 4 - Allowing for customisation

Many animations on this site allow the user to toggle elements of the animation on and off. You can offer animation options for your animations by creating a class which inherits from `AnimationOptions`. The `define` method returns an array containing each option this animation provides for customisation:

```ts
// File: animation-types/my-custom-animation/my-custom-animation-options.ts

import {
  AnimationOptionDefinition,
  AnimationOptions,
} from "../animation-options";

export class MyCustomAnimationOptions extends AnimationOptions {
  static readonly netForce = "net-force";

  define() {
    return [
      AnimationOptionDefinition.boolean(
        MyCustomAnimationOptions.netForce,
        "Show net force",
        true,
      ),
    ];
  }
}
```

Now hook that class up with your animation type:

```ts
// File: animation-types/my-custom-animation/my-custom-animation.ts

import { AnimationOptions } from "../animation-options";
import { AnimationType } from "../animation-type";
import { MyCustomAnimationRenderer } from "./my-custom-animation-renderer";

//                                                    Using MyCustomAnimationOptions
//                                                                  V
export class MyCustomAnimationType extends AnimationType<MyCustomAnimationOptions> {
  constructor(
    title: string,
    description: string | null,
    href: string,
    duration: number,
    autoLoop: boolean,
    options: MyCustomAnimationOptions,
    renderer: MyCustomAnimationRenderer,
  ) {
    super(title, description, href, duration, autoLoop, options, renderer);
  }

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,
  }: {
    title: string;
    description: string | null;
    href: string;
    duration: number;
    autoLoop: boolean;
  }) {
    return new BlankAnimationType(
      title,
      description,
      href,
      duration,
      autoLoop,
      new MyCustomAnimationOptions(), // <-- Using MyCustomAnimationOptions
      new MyCustomAnimationRenderer(),
    );
  }
}
```

And being using it in your renderer:

```ts
// File: animation-types/my-custom-animation/my-custom-animation-renderer.ts

import { AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { red } from "../utils/colors";
import { centerFrame } from "../utils/framing";

const width = 250;
const height = 200;

const circleColor = red;
const circleRadius = 20;
const oscillationWidth = 50;
const oscillationPeriod = 5;

//                                                            Using MyCustomAnimationOptions
//                                                                          V
export class MyCustomAnimationRenderer extends AnimationRenderer<MyCustomAnimationOptions> {
  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    //                          Using MyCustomAnimationOptions
    //                                        V
    options: AnimationOptionValues<MyCustomAnimationOptions>,
  ): void {
    const showNetForce = options.requireBoolean(
      MyCustomAnimationOptions.netForce,
    );

    ctx.save();
    centerFrame(ctx, metrics, width, height);
    ctx.translate(width / 2, height / 2);

    // Draw a circle that oscillates horizontally!
    const x =
      Math.sin((time / oscillationPeriod) * Math.PI * 2) * oscillationWidth;
    ctx.fillStyle = circleColor;
    ctx.beginPath();
    ctx.ellipse(x, 0, circleRadius, circleRadius, 0, 0, Math.PI * 2);
    ctx.fill();

    if (showNetForce) {
      // ...
    }

    ctx.restore();
  }
}
```

And that's it! You should now have a simple animation that allows for some customisation, and a base to build something much cooler upon! Don't forget you can always [look at the existing animation types](https://github.com/dan-schel/physics-animations/tree/master/animation-types) for more examples of how animations are put together.

## A note about animation types

You'll notice that not every animation need implement its own animation type class. If some animations are similar enough that they can reuse each other's rendering code, then can be implemented as different instances of their animation type class, but with different values passed into the constructor.

For example, [the wave animation type](https://github.com/dan-schel/physics-animations/blob/master/animation-types/wave-animation/wave-animation.ts) allows different waveforms to be supplied in its `fromObject` method, which it then passes on to [the renderer](https://github.com/dan-schel/physics-animations/blob/master/animation-types/wave-animation/wave-animation-renderer.ts).

```ts
// File: animation-types/wave-animation/wave-animation.ts

// [...] Imports omitted for brevity.

export class WaveAnimationType extends AnimationType<WaveAnimationOptions> {
  // [...] Constructor omitted for brevity.

  static fromObject({
    title,
    description,
    href,
    duration,
    autoLoop,

    // Additional data
    //        V
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

      // Which is passed on to the renderer.
      //                  V
      new WaveAnimationRenderer(waves, leftEnd, rightEnd, rulers),
    );
  }
}
```

You'll also notice that in the example above the same goes for the options class. You can have the output of its `define` function depend on parameters passed to the constructor.

Before implementing your own animation type, perhaps consider if it might be easier to piggyback off code that already exists!

## Step 5 - Publishing your animation

**TODO:** Linting, formatting, opening a pull request, etc.
