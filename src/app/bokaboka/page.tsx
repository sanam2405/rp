import { Leaf } from "../components";
import { Carousal } from "../screens";

export default function KigoTumi() {
  return (
    <>
      <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
        <Carousal />
      </Leaf>
    </>
  );
}
