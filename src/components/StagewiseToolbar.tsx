"use client";

import { StagewiseToolbar as StagewiseToolbarComponent } from "@stagewise/toolbar-next";

export default function StagewiseToolbar() {
  const stagewiseConfig = {
    plugins: [],
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <StagewiseToolbarComponent config={stagewiseConfig} />;
}
