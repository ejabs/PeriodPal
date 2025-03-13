import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CycleProvider } from "@/context/CycleContext"; // Import CycleProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Health from "./pages/Health";
import Locator from "./pages/Locator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Wrap the entire app in CycleProvider */}
      <CycleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/health" element={<Health />} />
            <Route path="/locator" element={<Locator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CycleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
