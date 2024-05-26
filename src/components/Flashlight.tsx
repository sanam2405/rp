/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useEffect,
  useRef,
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  RefObject,
} from "react";
// import PropTypes from 'prop-types';
import ResizeObserver from "resize-observer-polyfill";

interface Position {
  x: number;
  y: number;
}

interface FlashlightProps {
  enabled?: boolean;
  children: ReactElement | ReactElement[];
  showCursor?: boolean;
  size?: number;
  initialPosition: Position;
  moveTo?: Position | null;
  speed?: number;
  enableMouse: boolean;
  darkness: number;
}

interface FlashlightElement {
  light: RefObject<HTMLDivElement>;
  container: RefObject<HTMLDivElement>;
}

// const propTypes =
//   {
//     enabled: PropTypes.bool,
//     children: PropTypes.node,
//     showCursor: PropTypes.bool,
//     size: PropTypes.number,
//     initialPosition: PropTypes.shape({
//       x: PropTypes.number,
//       y: PropTypes.number,
//     }),
//     moveTo: PropTypes.shape({
//       x: PropTypes.number,
//       y: PropTypes.number,
//     }),
//     speed: PropTypes.number,
//     contain: PropTypes.bool,
//     enableMouse: PropTypes.bool,
//     darkness: PropTypes.number,
//   };

const defaultProps = {
  enabled: true,
  children: <div></div>,
  showCursor: false,
  size: 150,
  initialPosition: { x: 0, y: 0 },
  moveTo: null,
  speed: 1000,
  enableMouse: true,
  darkness: 0.9,
};

export const Flashlight: React.FC<FlashlightProps> = (props) => {
  const {
    enabled,
    children,
    showCursor,
    size,
    initialPosition,
    moveTo,
    speed,
    enableMouse,
    darkness,
  } = props;

  const lightStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    background: `radial-gradient(transparent 0%, rgba(0, 0, 0, ${darkness}) ${size}px, rgba(0, 0, 0, ${darkness + 0.1}) 80%)`,
    transition: "none",
    pointerEvents: "none",
    willChange: "transform",
  };

  const elements: FlashlightElement[] = Children.map(children, () => ({
    light: useRef<HTMLDivElement>(null),
    container: useRef<HTMLDivElement>(null),
  })) as FlashlightElement[];

  useEffect(() => {
    let last_known_scroll_position = 0;
    let ticking = false;

    elements.forEach((element) => {
      const container = element.container.current;
      if (container) {
        container.style.overflow = "hidden";
        container.style.position = "relative";
        if (!showCursor) container.style.cursor = "none";
      }
    });

    const resizeLights = () => {
      elements.forEach((element) => {
        resizeLight(element);
      });
    };

    const resizeLight = (element: FlashlightElement) => {
      const light = element.light.current;
      if (light) {
        const maskSize = Math.max(window.innerWidth, window.innerHeight);

        light.style.width = `${maskSize * 2}px`;
        light.style.height = `${maskSize * 2}px`;

        light.style.left = `${initialPosition.x - maskSize}px`;
        light.style.top = `${initialPosition.y - maskSize}px`;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e: any) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          elements.forEach((element) => {
            const light = element.light.current;
            const container = element.container.current;
            if (light && container) {
              const lightStyle = window.getComputedStyle(light);
              const containerRect = container.getBoundingClientRect();
              light.style.transition = `opacity ease-in-out ${speed}ms`;
              light.style.left = `${e.clientX - containerRect.left - parseInt(lightStyle.width) / 2}px`;
              light.style.top = `${e.clientY - containerRect.top - parseInt(lightStyle.height) / 2}px`;
            }
          });
        });
        ticking = true;
      }
    };

    const handleScroll = () => {
      const increment = window.scrollY - last_known_scroll_position;
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          elements.forEach((element) => {
            const light = element.light.current;
            if (light) {
              light.style.transition = `opacity ease-in-out ${speed}ms`;
              light.style.top = `${parseInt(light.style.top) + increment}px`;
            }
          });
        });
        ticking = true;
      }
    };

    resizeLights();

    const resizeObservers = elements.map(
      () => new ResizeObserver(resizeLights),
    );

    elements.forEach((element, i) => {
      const container = element.container.current;
      if (container) {
        resizeObservers[i].observe(container);
      }
    });

    if (enableMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("resize", resizeLights);

    return () => {
      if (enableMouse) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", resizeLights);
      resizeObservers.forEach((observer) => observer.disconnect());
    };
  }, [
    enableMouse,
    initialPosition.x,
    initialPosition.y,
    showCursor,
    speed,
    elements,
  ]);

  useEffect(() => {
    if (moveTo) {
      elements.forEach((element) => {
        const light = element.light.current;
        if (light) {
          light.style.transition = `all ease-in-out ${speed}ms`;
          const lightStyle = window.getComputedStyle(light);
          light.style.left = `${moveTo.x - parseInt(lightStyle.width) / 2}px`;
          light.style.top = `${moveTo.y - parseInt(lightStyle.height) / 2}px`;
        }
      });
    }
  }, [moveTo, speed, elements]);

  useEffect(() => {
    elements.forEach((element) => {
      const light = element.light.current;
      if (light) {
        light.style.transition = `opacity ease-in-out ${speed}ms`;
        light.style.opacity = enabled ? "1" : "0";
      }
    });
  }, [enabled, speed, elements]);

  return (
    <>
      {Children.map(children, (child, i) =>
        cloneElement(child, {
          ref: elements[i].container,
          children: (
            <>
              <div
                data-testid="react-flashlight"
                style={lightStyle}
                ref={elements[i].light}
              />
              {child.props.children}
            </>
          ),
        }),
      )}
    </>
  );
};

// Flashlight.propTypes = propTypes;
Flashlight.defaultProps = defaultProps;
