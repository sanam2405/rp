import dynamic from "next/dynamic";

const RPEditor = dynamic(
  () => {
    return import("../../../components/RPEditor");
  },
  { ssr: false },
);

export default function RPEdit() {
  return (
    <div className="w-full h-screen">
      <RPEditor />
    </div>
  );
}
