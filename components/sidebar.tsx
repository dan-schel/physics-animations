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
import { UilAngleRightB } from "./icons/uil-angle-right-b";
import { TextIcon } from "./icons/text-icon";
import { AnimationIcon } from "./icons/animation-icon";
import clsx from "clsx";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        "bg-background-raised border-r border-r-subtle-border max-lg:shadow-mobile-sidebar min-h-0",
        className,
      )}
    >
      <div className="mt-(--extra-margin,0rem) py-8 overflow-y-auto h-full">
        <p className="text-xl font-bold mb-2 text-foreground-strong px-4">
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
          "relative grid grid-cols-[1rem_1fr] gap-2 items-center pr-4 pl-[calc(1rem+var(--depth)*1rem)] h-8 w-full hover:bg-soft-hover active:bg-soft-active",
          {
            'bg-soft after:content-[""] after:absolute after:bg-accent after:left-0 after:top-0 after:bottom-0 after:w-1':
              selected,
          },
        )}
        href={node.href}
      >
        {node.type === "animation" && <AnimationIcon></AnimationIcon>}
        {node.type === "document" && <TextIcon></TextIcon>}
        <p
          className={clsx(
            "overflow-hidden whitespace-nowrap text-ellipsis shrink min-w-0",
            { "font-bold text-foreground-strong": selected },
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
      className="relative before:content-[''] before:block before:absolute before:border-l before:border-l-soft-border before:top-8 before:bottom-2 before:left-[calc(1.25rem+var(--depth)*1rem)]"
      style={{ "--depth": depth } as React.CSSProperties}
    >
      <button
        className={clsx(
          "relative grid grid-cols-[1rem_1fr] gap-2 items-center pr-4 pl-[calc(1rem+var(--depth)*1rem)] h-8 w-full hover:bg-soft-hover active:bg-soft-active",
          {
            'after:content-[""] after:absolute after:bg-accent after:left-0 after:top-0 after:bottom-0 after:w-1':
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
            "overflow-hidden whitespace-nowrap text-ellipsis shrink min-w-0 text-left",
            { "font-bold text-foreground-strong": selected && !open },
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
