import {  RouterProvider } from "react-router-dom";
import "./assets/css/route.css";
import { reactRoutes } from "./components/routes/router";

export default function Start() {
  return (
      <RouterProvider router={reactRoutes} />
  );
}
