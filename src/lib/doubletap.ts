export const detectDoubleTap = (doubleTapMs: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastTap = 0;

  return function handleDoubleTap(event: PointerEvent) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength > 0 && tapLength < doubleTapMs) {
      event.preventDefault();
      const doubleTap = new CustomEvent("doubletap", {
        bubbles: true,
        detail: event,
      });
      window.dispatchEvent(doubleTap); // dispatching doubletap event globally
    } else {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => clearTimeout(timeout), doubleTapMs);
    }

    lastTap = currentTime;
  };
};

// utility function to initialize the double tap listener on the window
export const initializeDoubleTapListener = (doubleTapMs: number) => {
  const doubleTapHandler = detectDoubleTap(doubleTapMs);

  try {
    // attaching the pointerup listener globally
    window.addEventListener("pointerup", doubleTapHandler);

    // returns a function to remove the global listener when needed
    return () => {
      window.removeEventListener("pointerup", doubleTapHandler);
    };
  } catch {
    console.log("window is not defined.");
  } finally {
    console.log(
      "doubletap eventListener could not be dispatched across window.",
    );
  }
};

/*
--------------------------------------------------------------------
                            USAGE
--------------------------------------------------------------------

import { initializeDoubleTapListener } from '@/lib';

useEffect(() => {

    // initialize the double tap detection with a 500ms threshold
    initializeDoubleTapListener(500);
    
    try {
      // listen for 'doubletap' events globally on the window
      window.addEventListener('doubletap', (event: any) => {
        // any custom logic here

        alert('Double tapped');
        console.log(event);
      });
    } catch {
      console.log('Unable to capture the Double tap event.');
    }
  }, []);


*/
