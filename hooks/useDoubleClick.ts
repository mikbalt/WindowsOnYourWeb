import { useCallback, useRef } from "react";
import { TRANSITIONS_IN_MILLISECONDS } from "utils/constants";
import { hasFinePointer } from "utils/functions";

const MAX_MOVES = 12;

const useDoubleClick = (
  handler: React.MouseEventHandler,
  singleClick = false
): {
  onClick: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
} => {
  const timer = useRef(0);
  const moveCount = useRef(0);
  const onClick: React.MouseEventHandler = useCallback(
    (event) => {
      const runHandler = (): void => {
        event.stopPropagation();
        handler(event);
      };
      const clearTimer = (): void => {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = 0;
        }
      };
      const clearWhenPointerMoved = (): void => {
        if (moveCount.current >= MAX_MOVES) {
          clearTimer();
        }

        if (timer.current === 0) {
          event.target.removeEventListener(
            "pointermove",
            clearWhenPointerMoved
          );
          moveCount.current = 0;
        } else {
          moveCount.current += 1;
        }
      };

      if (singleClick) {
        runHandler();
      } else if (timer.current === 0) {
        // Use longer timeout for mobile/touch devices
        const doubleClickTimeout = hasFinePointer()
          ? TRANSITIONS_IN_MILLISECONDS.DOUBLE_CLICK
          : TRANSITIONS_IN_MILLISECONDS.DOUBLE_CLICK * 1.5;

        timer.current = window.setTimeout(clearTimer, doubleClickTimeout);
        event.target.addEventListener("pointermove", clearWhenPointerMoved, {
          passive: true,
        });
      } else {
        clearTimer();
        runHandler();
      }
    },
    [handler, singleClick]
  );

  // Touch event handler for mobile devices
  const onTouchEnd: React.TouchEventHandler = useCallback(
    (event) => {
      // Convert touch event to mouse-like event for consistency
      const syntheticEvent = {
        ...event,
        stopPropagation: event.stopPropagation.bind(event),
        target: event.target,
      } as unknown as React.MouseEvent;

      onClick(syntheticEvent);
    },
    [onClick]
  );

  return {
    onClick,
    ...(!hasFinePointer() && { onTouchEnd }),
  };
};

export default useDoubleClick;
