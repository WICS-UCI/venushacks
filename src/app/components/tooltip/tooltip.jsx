import React, { useState } from "react";
import "./tooltip.scss";

// Taken from:
// https://dev.to/vtrpldn/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-3pnk

const Tooltip = props => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <span className={`tooltip-tip ${props.direction || "bottom"}`}>
          {/* Content */}
          {props.content}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
