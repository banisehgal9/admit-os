import * as React from "react";
import { twMerge } from "tailwind-merge";
export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={twMerge("text-sm font-medium", props.className)} />;
}
