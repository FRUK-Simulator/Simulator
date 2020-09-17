import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import "./DraggableContainer.css";

type Coordinates = {
  x: number;
  y: number;
};

function withinWindow(coordinates: Coordinates, boundingRect: DOMRect) {
  return {
    x: Math.max(
      Math.min(coordinates.x, window.innerWidth - boundingRect.width),
      0
    ),
    y: Math.max(
      Math.min(coordinates.y, window.innerHeight - boundingRect.height),
      80
    ),
  };
}

/**
 * Component for the game controller
 */
export const DraggableContainer: FunctionComponent<{
  className?: string;
}> = ({ children, className = "" }) => {
  const elementRef = useRef<HTMLElement | null>();
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if (!elementRef.current) {
        return;
      }
      // Ensure the container doesn't get hidden by shrinking the window
      const elementRect = elementRef.current.getBoundingClientRect();
      const newCoordinates = withinWindow(elementRect, elementRect);

      elementRef.current.style.left = `${newCoordinates.x}px`;
      elementRef.current.style.top = `${newCoordinates.y}px`;
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  });

  const onDragStart = useCallback((e: React.DragEvent) => {
    if (!elementRef.current) {
      return;
    }

    const elementRect = elementRef.current.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - elementRect.x,
      y: e.clientY - elementRect.y,
    };
  }, []);

  const onDragEnd = useCallback((e) => {
    if (!elementRef.current || !dragOffsetRef.current) {
      return;
    }

    const startPos = dragOffsetRef.current || { x: 0, y: 0 };
    const x = e.clientX - startPos.x;
    const y = e.clientY - startPos.y;
    const newCoordinates = withinWindow(
      { x, y },
      elementRef.current.getBoundingClientRect()
    );

    elementRef.current.style.left = `${newCoordinates.x}px`;
    elementRef.current.style.top = `${newCoordinates.y}px`;
  }, []);

  const onRef = useCallback((e: HTMLElement | null) => {
    elementRef.current = e;

    if (e) {
      const elementRect = e.getBoundingClientRect();
      // Put the element in the middle of the page
      const startingCoordinates = withinWindow(
        {
          x: window.innerWidth / 2 - elementRect.width / 2,
          y: window.innerHeight / 2 - elementRect.height / 2,
        },
        elementRect
      );

      e.style.left = `${startingCoordinates.x}px`;
      e.style.top = `${startingCoordinates.y}px`;
    }
  }, []);

  return (
    // original svg image is from https://www.svgrepo.com/svg/95376/game-controller LICENSE: CC0 License
    <div
      className={`${className} draggable-container`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      ref={onRef}
    >
      {children}
    </div>
  );
};
