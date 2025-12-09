import clsx from "clsx";
import styles from "./switch.module.css";

export default function Switch({
  className,
  label,
  checked,
  onChange,
}: {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={clsx(className, styles.switch)}>
      <input
        type="checkbox"
        autoComplete="off"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div>
        <svg viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="a">
              <rect width="32" height="20" rx="10" />
            </clipPath>
          </defs>
          <rect
            width="32"
            height="20"
            rx="10"
            strokeWidth="4"
            clipPath="url(#a)"
          />
          <circle r="1" />
        </svg>
        <div>
          <p>{label}</p>
        </div>
      </div>
    </label>
  );
}
