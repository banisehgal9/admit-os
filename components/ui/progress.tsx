import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Progress({
  value = 0,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value?: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={twMerge("h-2 w-full overflow-hidden rounded bg-neutral-200", className)}
      {...props}
    >
      <div className="h-full bg-black transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
