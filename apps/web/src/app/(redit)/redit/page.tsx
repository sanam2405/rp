import dynamic from "next/dynamic";

const RPEditor = dynamic(
  () => {
    return import("../../../components/RPEditor");
  },
  { ssr: false }
);

export default function RPEdit() {
  return (
    <>
      <div className="flex w-screen h-screen p-0 m-0">
        <RPEditor />
      </div>
    </>
  );
}
