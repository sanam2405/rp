import dynamic from "next/dynamic";

const Landing = dynamic(() => import("@/screens").then((mod) => mod.Landing), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Landing />
    </>
  );
}
