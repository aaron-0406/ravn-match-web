import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

const themeOverride = createTheme({
  primaryColor: "grape",
  colors: {
    grape: [
      "#f4eaff",
      "#e1d2ff",
      "#c0a2fa",
      "#9c6ef5",
      "#7f43f1",
      "#6c27ef",
      "#6219ef",
      "#520dd5",
      "#4809bf",
      "#3d03a9",
    ],
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 5000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider theme={themeOverride}>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
