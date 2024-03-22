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

import { AnimationOptions, AnimationOptionValues } from "../animation-options";
import { AnimationRenderer, CanvasMetrics } from "../animation-renderer";
import { red } from "../utils/colors";
import { centerFrame } from "../utils/framing";

const width = 250;
const height = 200;

const circleColor = red;
const circleRadius = 20;
const oscillationWidth = 50;
const oscillationPeriod = 5;

export class MyCustomAnimationRenderer extends AnimationRenderer<AnimationOptions> {
  render(
    ctx: CanvasRenderingContext2D,
    time: number,
    metrics: CanvasMetrics,
    options: AnimationOptionValues<AnimationOptions>,
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

export class MyCustomAnimationType extends AnimationType<AnimationOptions> {
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

And switch our `animation.ts` file from being a `BlankAnimationType` to a `MyCustomAnimationType`:

```ts
// File: app/topic/my-custom-animation/animation.ts

import { MyCustomAnimationType } from "@/animation-types/my-custom-animation/my-custom-animation";

export const myCustomAnimation = MyCustomAnimationType.fromObject({
  title: "My custom animation",
  description: "This is an animation I made, wow!",
  href: "/topic/my-custom-animation",
  duration: 5,
  autoLoop: true,
});
```

**TODO:** Point towards other animation types for examples.

## Step 4 - Allowing for customisation

## Step 5 - Publishing your animation

**TODO:** Linting, formatting, opening a pull request, etc.
