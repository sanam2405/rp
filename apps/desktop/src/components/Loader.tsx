import { CSSProperties, useEffect, useState } from "react";
import { Hearts } from "react-loader-spinner";

const LoaderStyle: CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f1f5f9",
  zIndex: 9999,
};

export const Loader = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssetsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!assetsLoaded) {
    return (
      <div style={LoaderStyle}>
        <Hearts
          height={80}
          width={80}
          color="#ef4444"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return null;
};
