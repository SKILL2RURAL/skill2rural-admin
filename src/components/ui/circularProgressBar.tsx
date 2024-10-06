import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#333",
          pathColor: "#4B9CD3", // Circle color
          trailColor: "#ddd", // Background circle color
          textSize: "16px", // Text size
          pathTransitionDuration: 0.5, // Animation duration
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
