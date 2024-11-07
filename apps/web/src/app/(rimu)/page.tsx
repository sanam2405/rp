import dynamic from "next/dynamic";

const LandingPage = dynamic(
  () => {
    return import("../../screens/Landing");
  },
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
