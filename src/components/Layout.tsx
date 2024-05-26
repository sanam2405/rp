import { FC, ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="bg-wallpaper h-screen overflow-auto">{children}</div>;
};
