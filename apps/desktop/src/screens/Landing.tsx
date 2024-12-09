import { Leaf } from "@/components";
import { Audio } from "@/screens";
import { FC } from "react";

export const Landing: FC = () => {
  return (
    <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
      <Audio />
    </Leaf>
  );
};
