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
import { BlankAnimationType } from "@/animation-types/blank-animation/blank-animation";

export const myCustomAnimation = BlankAnimationType.fromObject({
  title: "My custom animation",
  description: "This is an animation I made, wow!",
  href: "/topic/my-custom-animation",
  duration: 5,
  autoLoop: true,
});
```

Be sure to set `href` to match the location of the subfolder you created (without the `app`), i.e. the above example's subfolder should be `app/topic/my-custom-animation`.

### The `page.tsx` file

The `page.tsx` file is just boilerplate code which hooks your animation up with the NextJS router. It imports your animation object from `animation.ts` and passes it to an `AnimationPage` component to render it:

```tsx
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
import { getMetadataForAnimation } from "@/app/nav-tree-utils";
import { myCustomAnimation } from "./animation";

export const metadata = getMetadataForAnimation(myCustomAnimation);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Again, all `layout.tsx` files should look identical, aside from name of the `myCustomAnimation` constant.

### Good to go!

By this point you should be able to navigate to `http://localhost:3000/topic/my-custom-animation` to see our blank animation page.
