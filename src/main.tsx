import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import AiAnalysis from "./pages/AiAnalysis";
import Main from "./pages/Main";
import BazinValuation from "./pages/BazinValuation";
import PeterLynchValuation from "./pages/PeterLynchValuation";
import B3 from "./pages/B3";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "ai-analysis",
        element: <AiAnalysis />,
      },
      {
        path: "bazin-valuation",
        element: <BazinValuation />,
      },
      {
        path: "peter-lynch-valuation",
        element: <PeterLynchValuation />,
      },
      {
        path: "b3",
        element: <B3 />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
