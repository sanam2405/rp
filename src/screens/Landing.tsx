"use client";

import { Myxomycete } from "@/components";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

export const Landing: FC = () => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start the transition
      const transitionTimer = setTimeout(() => {
        router.push("/ilu"); // Navigate after the animation
      }, 7000); // Wait for the transition to finish

      return () => clearTimeout(transitionTimer);
    }, 0); // Optional delay before the animation starts

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={isTransitioning ? "animate-fade-out" : ""}>
      <Myxomycete />
    </div>
  );
};
