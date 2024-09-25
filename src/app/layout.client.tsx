"use client";
import ReduxProvider from "@/Providers/ReduxProvider";
import React, { FC } from "react";
interface ILayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;
