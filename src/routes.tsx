import React from "react";
import { IRoute } from "./types";
import { Example1 } from "./components/Example1/Example1";

export const ROUTES: IRoute[] = [
  {
    title: "Простейшая сцена",
    pathname: "*",
    element: <Example1 />,
  },
];
