"use client";

import Link from "next/link";
import {
  AnimationList,
  AnimationTreeNode,
  AnimationEntry,
  AnimationCollection,
} from "./animation-list";
import styles from "./sidebar.module.scss";
import { useState } from "react";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <nav className={`${className} ${styles.sidebar}`}>
      <div className={styles.content}>
        <p className={styles.title}>Animations for VCE Physics</p>
        <ul>
          {AnimationList.map((node, i) => {
            return (
              <SidebarTreeNode key={i} node={node} depth={0}></SidebarTreeNode>
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
}: {
  node: AnimationTreeNode;
  depth: number;
}) {
  if ("children" in node) {
    return (
      <SidebarAnimationCollection
        node={node}
        depth={depth}
      ></SidebarAnimationCollection>
    );
  } else {
    return <SidebarEntry node={node} depth={depth}></SidebarEntry>;
  }
}

function SidebarEntry({
  node,
  depth,
}: {
  node: AnimationEntry;
  depth: number;
}) {
  return (
    <li style={{ "--depth": depth } as React.CSSProperties}>
      <Link href={node.href} className={styles.entry}>
        {node.type == "animation" && <AnimationIcon></AnimationIcon>}
        {node.type == "document" && <DocumentIcon></DocumentIcon>}
        <p>{node.title}</p>
      </Link>
    </li>
  );
}

function SidebarAnimationCollection({
  node,
  depth,
}: {
  node: AnimationCollection;
  depth: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={styles.collection}
      style={{ "--depth": depth } as React.CSSProperties}
    >
      <button
        className={styles.collectionButton}
        onClick={() => setOpen((open) => !open)}
      >
        <ChevronIcon
          className={open ? styles.open : styles.closed}
        ></ChevronIcon>
        <p>{node.title}</p>
      </button>
      {open && (
        <ul>
          {node.children.map((item, i) => {
            return (
              <SidebarTreeNode
                key={i}
                node={item}
                depth={depth + 1}
              ></SidebarTreeNode>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`icon ${className ?? ""}`}
    >
      <path
        fill="currentColor"
        d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="icon"
    >
      <path
        fill="currentColor"
        d="M13 16H3a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2ZM3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2Zm18 3H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}

function AnimationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="icon"
    >
      <path
        fill="currentColor"
        d="M15 2a6.998 6.998 0 0 0-6.88 5.737a6 6 0 0 1 8.143 8.143A6.997 6.997 0 0 0 15 2z"
        opacity=".25"
      />
      <circle cx="7" cy="17" r="5" fill="currentColor" />
      <path
        fill="currentColor"
        d="M11 7a6 6 0 0 0-5.97 5.406a4.997 4.997 0 0 1 6.564 6.564A6 6 0 0 0 11 7z"
        opacity=".5"
      />
    </svg>
  );
}
