import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={twMerge("rounded-xl border bg-white", props.className)} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={twMerge("p-6 pb-0", props.className)} />;
}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={twMerge("text-lg font-semibold leading-none", props.className)} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={twMerge("p-6 pt-4", props.className)} />;
}
