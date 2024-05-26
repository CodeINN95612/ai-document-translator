import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TestPage } from "./pages/TestPage";
import { NavLayout } from "./shared/NavLayout";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { LogOutPage } from "./pages/LogOutPage";
import { OcrPage } from "./pages/OcrPage";

const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/logout",
        element: <LogOutPage />,
      },
      {
        path: "/ocr",
        element: <OcrPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <MsalProvider instance={msalInstance}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </MsalProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
