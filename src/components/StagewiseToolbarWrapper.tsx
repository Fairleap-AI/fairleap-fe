"use client";

import dynamic from "next/dynamic";

const StagewiseToolbar = dynamic(
  () => import("@stagewise/toolbar-next").then((mod) => mod.StagewiseToolbar),
  { ssr: false }
);

interface StagewiseToolbarWrapperProps {
  config?: any;
}

export default function StagewiseToolbarWrapper({
  config,
}: StagewiseToolbarWrapperProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <StagewiseToolbar config={config} />;
}
