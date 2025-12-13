"use client";

import Link from "next/link";
import { navTree } from "../app/nav-tree";
import {
  NavTreeNode,
  NavPage,
  NavCollection,
  isPathnameWithin,
} from "../app/nav-tree-utils";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { UilAngleRightB } from "./icons/UilAngleRightB";
import { TextIcon } from "./icons/TextIcon";
import { AnimationIcon } from "./icons/AnimationIcon";
import clsx from "clsx";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "bg-background-raised border-r-subtle-border max-lg:shadow-mobile-sidebar min-h-0 border-r",
        className,
      )}
    >
      <div className="mt-(--extra-margin,0rem) h-full overflow-y-auto py-8">
        <p className="text-foreground-strong mb-2 px-4 text-xl font-bold">
          Navigation
        </p>
        <ul>
          {navTree.map((node, i) => {
            return (
              <SidebarTreeNode
                key={i}
                node={node}
                depth={0}
                pathname={pathname}
              ></SidebarTreeNode>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function SidebarTreeNode({
  node,
  depth,
  pathname,
}: {
  node: NavTreeNode;
  depth: number;
  pathname: string;
}) {
  if ("children" in node) {
    return (
      <SidebarAnimationCollection
        node={node}
        depth={depth}
        pathname={pathname}
      ></SidebarAnimationCollection>
    );
  } else {
    return (
      <SidebarEntry
        node={node}
        depth={depth}
        pathname={pathname}
      ></SidebarEntry>
    );
  }
}

function SidebarEntry({
  node,
  depth,
  pathname,
}: {
  node: NavPage;
  depth: number;
  pathname: string;
}) {
  const selected = useMemo(
    () => isPathnameWithin(node, pathname),
    [node, pathname],
  );

  return (
    <li style={{ "--depth": depth } as React.CSSProperties}>
      <Link
        className={clsx(
          "hover:bg-soft-hover active:bg-soft-active relative grid h-8 w-full grid-cols-[1rem_1fr] items-center gap-2 pr-4 pl-[calc(1rem+var(--depth)*1rem)]",
          {
            'bg-soft after:bg-accent after:absolute after:top-0 after:bottom-0 after:left-0 after:w-1 after:content-[""]':
              selected,
          },
        )}
        href={node.href}
      >
        {node.type === "animation" && <AnimationIcon></AnimationIcon>}
        {node.type === "document" && <TextIcon></TextIcon>}
        <p
          className={clsx(
            "min-w-0 shrink overflow-hidden text-ellipsis whitespace-nowrap",
            { "text-foreground-strong font-bold": selected },
          )}
        >
          {node.title}
        </p>
      </Link>
    </li>
  );
}

function SidebarAnimationCollection({
  node,
  depth,
  pathname,
}: {
  node: NavCollection;
  depth: number;
  pathname: string;
}) {
  // TODO: If there's lot of animations, maybe set this to false (collasped) by
  // default, or set it to something like depth < 1 (only the first level open).
  const [open, setOpen] = useState(true);

  const selected = useMemo(
    () => isPathnameWithin(node, pathname),
    [node, pathname],
  );

  return (
    <li
      className="before:border-l-soft-border relative before:absolute before:top-8 before:bottom-2 before:left-[calc(1.25rem+var(--depth)*1rem)] before:block before:border-l before:content-['']"
      style={{ "--depth": depth } as React.CSSProperties}
    >
      <button
        className={clsx(
          "hover:bg-soft-hover active:bg-soft-active relative grid h-8 w-full grid-cols-[1rem_1fr] items-center gap-2 pr-4 pl-[calc(1rem+var(--depth)*1rem)]",
          {
            'after:bg-accent after:absolute after:top-0 after:bottom-0 after:left-0 after:w-1 after:content-[""]':
              selected && !open,
          },
        )}
        onClick={() => setOpen((open) => !open)}
      >
        <UilAngleRightB
          className={clsx("transition-transform duration-100", {
            "rotate-90": open,
          })}
        ></UilAngleRightB>
        <p
          className={clsx(
            "min-w-0 shrink overflow-hidden text-left text-ellipsis whitespace-nowrap",
            { "text-foreground-strong font-bold": selected && !open },
          )}
        >
          {node.title}
        </p>
      </button>
      {open && (
        <ul>
          {node.children.map((item, i) => {
            return (
              <SidebarTreeNode
                key={i}
                node={item}
                depth={depth + 1}
                pathname={pathname}
              ></SidebarTreeNode>
            );
          })}
        </ul>
      )}
    </li>
  );
}
