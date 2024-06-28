"use client";

import Link from "next/link";
import { navTree } from "../app/nav-tree";
import {
  NavTreeNode,
  NavPage,
  NavCollection,
  isPathnameWithin,
} from "../app/nav-tree-utils";
import styles from "./sidebar.module.scss";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { UilAngleRightB } from "./icons/uil-angle-right-b";
import { TextIcon } from "./icons/text-icon";
import { AnimationIcon } from "./icons/animation-icon";

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`${className} ${styles.sidebar}`}>
      <div className={styles.content}>
        <p className={styles.title}>Navigation</p>
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
        href={node.href}
        className={`${styles.entry} ${selected ? styles.selected : ""}`}
      >
        {node.type === "animation" && <AnimationIcon></AnimationIcon>}
        {node.type === "document" && <TextIcon></TextIcon>}
        <div className="oneLine">
          <p>{node.title}</p>
        </div>
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
      className={styles.collection}
      style={{ "--depth": depth } as React.CSSProperties}
    >
      <button
        className={
          styles.collectionButton +
          (selected && !open ? ` ${styles.selected}` : "")
        }
        onClick={() => setOpen((open) => !open)}
      >
        <UilAngleRightB className={open ? styles.open : ""}></UilAngleRightB>
        <div className="oneLine">
          <p>{node.title}</p>
        </div>
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
