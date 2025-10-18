
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bots from "./pages/Bots";
import Dashboard from "./pages/Dashboard";
import FamilyBotManagement from "./pages/FamilyBotManagement";
import TournamentBotManagement from "./pages/TournamentBotManagement";
import TournamentAccounts from "./pages/TournamentAccounts";
import TournamentServers from "./pages/TournamentServers";
import TournamentTasks from "./pages/TournamentTasks";
import Contacts from "./pages/Contacts";
import Changelog from "./pages/Changelog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bots" element={<Bots />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/family-bot" element={<FamilyBotManagement />} />
          <Route path="/tournament-bot" element={<TournamentBotManagement />} />
          <Route path="/tournament-bot/accounts" element={<TournamentAccounts />} />
          <Route path="/tournament-bot/servers" element={<TournamentServers />} />
          <Route path="/tournament-bot/tasks" element={<TournamentTasks />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/changelog" element={<Changelog />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;