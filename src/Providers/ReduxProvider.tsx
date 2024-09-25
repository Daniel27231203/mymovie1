"use client";
import { store } from "@/redux/store";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface IReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: FC<IReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
