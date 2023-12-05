import Link from "next/link";
import {
  AnimationList,
  AnimationTreeNode,
  AnimationEntry,
  AnimationCollection,
} from "./animation-list";
import styles from "./sidebar.module.scss";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <nav className={`${className} ${styles.sidebar}`}>
      <p>Animations</p>
      <ul>
        {AnimationList.map((item, i) => {
          return <SidebarTreeNode key={i} {...item}></SidebarTreeNode>;
        })}
      </ul>
    </nav>
  );
}

function SidebarTreeNode(node: AnimationTreeNode) {
  if ("children" in node) {
    return SidebarAnimationCollection(node);
  } else {
    return SidebarEntry(node);
  }
}

function SidebarEntry(node: AnimationEntry) {
  return (
    <li>
      <Link className="link" href={node.href}>
        {node.title}
      </Link>
    </li>
  );
}

function SidebarAnimationCollection(node: AnimationCollection) {
  return (
    <li>
      <h3>{node.title}</h3>
      <ul>
        {node.children.map((item, i) => {
          return <SidebarTreeNode key={i} {...item}></SidebarTreeNode>;
        })}
      </ul>
    </li>
  );
}
