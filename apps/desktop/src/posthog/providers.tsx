import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export default function PHProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "", {
      api_host: "/ingest",
      ui_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "",
      person_profiles: "identified_only",
      capture_pageview: false, // false disables automatic page view capture
      capture_pageleave: true, // true enables page leave capture
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
