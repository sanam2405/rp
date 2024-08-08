import { Leaf } from "../components";
import { Audio } from "../screens";

export default function Home() {
  return (
    <>
      <Leaf numberOfLeaves={7} leafPath="/thelastleaf.png">
        <Audio />
      </Leaf>
    </>
  );
}
