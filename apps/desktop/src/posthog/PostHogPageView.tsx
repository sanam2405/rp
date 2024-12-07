import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

export default function PostHogPageView(): null {
  const posthog = usePostHog();

  useEffect(() => {
    // Track pageviews
    if (posthog) {
      const handleLocationChange = () => {
        const url = window.location.href;
        posthog.capture("$pageview", {
          $current_url: url,
        });
      };

      // Capture initial pageview
      handleLocationChange();

      // Listen for route changes
      window.addEventListener("popstate", handleLocationChange);

      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }
  }, [posthog]);

  return null;
}
