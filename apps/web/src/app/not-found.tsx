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
      <Myxomycete />
    </>
  );
}
