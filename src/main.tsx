import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/index.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          theme="light"
          richColors
          closeButton
          duration={4000}
          toastOptions={{
            style: {
              fontSize: "1.1rem",
              padding: "14px 18px",
              borderRadius: "10px",
              fontWeight: "500",
            },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
