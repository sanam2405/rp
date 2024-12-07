import { Leaf, Myxomycete } from "@/components";
import { Audio } from "@/screens";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Landing: FC = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start the transition
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false); // Transition has been completed
      }, 5000); // Wait for the transition to finish

      return () => clearTimeout(transitionTimer);
    }, 0); // Optional delay before the animation starts

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className={isTransitioning ? "animate-fade-out" : ""}>
        {isTransitioning && <Myxomycete />}
      </div>

      <div className={!isTransitioning ? "animate-fade-in" : ""}>
        {!isTransitioning && (
          <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
            <Audio />
          </Leaf>
        )}
      </div>
    </>
  );
};
