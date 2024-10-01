import { Sorry } from "@/components";
import { MEDIA } from "@/constants";
import dynamic from "next/dynamic";

const Myxomycete = dynamic(
  () => import("@/components").then((mod) => mod.Myxomycete),
  {
    ssr: false,
  },
);

export default function NotFound() {
  return (
    <>
      {/* <Myxomycete /> */}
      <div className="w-3/4 h-[60vh] px-1 md:px-8 flex items-center justify-center [perspective:800px] [transform-style:preserve-3d]">
        <div
          style={{
            transform: "rotateX(15deg) translateZ(80px)",
          }}
          className="p-1 md:p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 mx-auto w-3/4 h-1/2 md:h-3/4"
        >
          <Sorry
            firstImage={MEDIA.PY_SANAM}
            secondImage={MEDIA.PY_RP}
            firstImageClassName="object-cover object-left-top w-full"
            secondImageClassname="object-cover object-left-top w-full"
            className="w-full h-full rounded-[22px] md:rounded-lg"
            slideMode="hover"
            autoplay={true}
          />
        </div>
      </div>
    </>
  );
}
