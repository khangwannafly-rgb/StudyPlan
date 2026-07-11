import React, { memo } from "react";
import Progress from "./ui/Progress";

function ProgressBar({ title, value, max }) {
  return (
    <Progress
      title={title}
      value={value}
      max={max}
      showPercentage
      className="p-1"
    />
  );
}

export default memo(ProgressBar);
