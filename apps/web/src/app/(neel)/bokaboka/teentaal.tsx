"use client";

import { Leaf, Loader } from "@/components";
import { Carousal } from "@/screens";
import { useEffect, useState } from "react";

export default function Teentaal() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // time for media assets to load

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="animate-fade-in">
      <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
        <Carousal />
      </Leaf>
    </div>
  );
}
