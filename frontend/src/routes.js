import { Navigate, useRoutes } from "react-router-dom";
// layouts

import Login from "./pages/Login";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";
import Home from "./layouts/Home/Home";
import Plans from "./pages/Plans";
import Page404 from "./pages/404";
// import "./default.css";

// ----------------------------------------------------------------------

export default function Router() {
  const user = useLocalStorage();
  const routes = useRoutes([
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/login" />,
      children: [
      ],
    },
    {
      path: "login",
      element: !user ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "plans",
      element: user ? <Plans /> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/404",
      element: <Page404 />,
    },
  ]);

  return routes;
}
