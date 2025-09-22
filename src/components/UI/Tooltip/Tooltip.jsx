import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";

const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 300,
  disabled = false,
  className = "",
  portalTarget = null,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const calculatePosition = (triggerRect, preferredPosition) => {
    const tooltip = {
      width: 200, // Estimated tooltip width
      height: 40, // Estimated tooltip height
    };

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const spacing = 10; // Distance from trigger element
    let x, y, finalPosition;

    // Calculate position based on preference
    switch (preferredPosition) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - spacing;
        finalPosition = "top";

        // Check if tooltip would go off top of screen
        if (y - tooltip.height < 0) {
          y = triggerRect.bottom + spacing;
          finalPosition = "bottom";
        }
        break;

      case "bottom":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + spacing;
        finalPosition = "bottom";

        // Check if tooltip would go off bottom of screen
        if (y + tooltip.height > viewport.height) {
          y = triggerRect.top - spacing;
          finalPosition = "top";
        }
        break;

      case "left":
        x = triggerRect.left - spacing;
        y = triggerRect.top + triggerRect.height / 2;
        finalPosition = "left";

        // Check if tooltip would go off left side of screen
        if (x - tooltip.width < 0) {
          x = triggerRect.right + spacing;
          finalPosition = "right";
        }
        break;

      case "right":
        x = triggerRect.right + spacing;
        y = triggerRect.top + triggerRect.height / 2;
        finalPosition = "right";

        // Check if tooltip would go off right side of screen
        if (x + tooltip.width > viewport.width) {
          x = triggerRect.left - spacing;
          finalPosition = "left";
        }
        break;

      default:
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - spacing;
        finalPosition = "top";
    }

    // Ensure tooltip doesn't go off horizontal edges
    if (finalPosition === "top" || finalPosition === "bottom") {
      if (x - tooltip.width / 2 < 0) {
        x = tooltip.width / 2;
      } else if (x + tooltip.width / 2 > viewport.width) {
        x = viewport.width - tooltip.width / 2;
      }
    }

    // Ensure tooltip doesn't go off vertical edges
    if (finalPosition === "left" || finalPosition === "right") {
      if (y - tooltip.height / 2 < 0) {
        y = tooltip.height / 2;
      } else if (y + tooltip.height / 2 > viewport.height) {
        y = viewport.height - tooltip.height / 2;
      }
    }

    return { x, y, position: finalPosition };
  };

  const showTooltip = () => {
    if (disabled || !content) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const {
          x,
          y,
          position: calculatedPosition,
        } = calculatePosition(rect, position);

        setTooltipPosition({ x, y });
        setActualPosition(calculatedPosition);
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get transform based on position
  const getTransform = (pos) => {
    switch (pos) {
      case "top":
        return "translateX(-50%) translateY(-100%)";
      case "bottom":
        return "translateX(-50%) translateY(0%)";
      case "left":
        return "translateX(-100%) translateY(-50%)";
      case "right":
        return "translateX(0%) translateY(-50%)";
      default:
        return "translateX(-50%) translateY(-100%)";
    }
  };

  // Get arrow styles based on position
  const getArrowStyles = (pos) => {
    const base = {
      position: "absolute",
      width: 0,
      height: 0,
    };

    switch (pos) {
      case "top":
        return {
          ...base,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid var(--tooltip-bg, #1f2937)",
        };
      case "bottom":
        return {
          ...base,
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "5px solid var(--tooltip-bg, #1f2937)",
        };
      case "left":
        return {
          ...base,
          top: "50%",
          left: "100%",
          transform: "translateY(-50%)",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: "5px solid var(--tooltip-bg, #1f2937)",
        };
      case "right":
        return {
          ...base,
          top: "50%",
          right: "100%",
          transform: "translateY(-50%)",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderRight: "5px solid var(--tooltip-bg, #1f2937)",
        };
      default:
        return {
          ...base,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid var(--tooltip-bg, #1f2937)",
        };
    }
  };

  const target = portalTarget || document.body;

  return (
    <>
      <div
        ref={triggerRef}
        className={`${styles.tooltipTrigger} ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        {children}
      </div>

      {isVisible &&
        content &&
        createPortal(
          <div
            className={`${styles.tooltip} ${styles[actualPosition]}`}
            style={{
              position: "fixed",
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: getTransform(actualPosition),
              zIndex: 2147483647,
              "--tooltip-bg": "#1f2937",
            }}
            role="tooltip"
            aria-live="polite"
          >
            <div className={styles.tooltipContent}>{content}</div>
            <div
              className={styles.tooltipArrow}
              style={getArrowStyles(actualPosition)}
            />
          </div>,
          target
        )}
    </>
  );
};

export default Tooltip;
