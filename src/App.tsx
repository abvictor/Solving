import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";

import { queryClient } from "./lib/react-query";

import { Toaster } from "sonner";
import { router } from "./routes";

function App() {
  return (
    <ThemeProvider storageKey="the.tickets-theme" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

export default App;
