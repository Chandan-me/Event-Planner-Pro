import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { UserProvider } from "@/lib/user-context";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import BookEvents from "./pages/BookEvents";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardPage = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

const App = () => (
  <ThemeProvider>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<DashboardPage><Dashboard /></DashboardPage>} />
              <Route path="/dashboard/events" element={<DashboardPage><BookEvents /></DashboardPage>} />
              <Route path="/dashboard/bookings" element={<DashboardPage><MyBookings /></DashboardPage>} />
              <Route path="/dashboard/payment" element={<DashboardPage><Payment /></DashboardPage>} />
              <Route path="/dashboard/favorites" element={<DashboardPage><Favorites /></DashboardPage>} />
              <Route path="/dashboard/contact" element={<DashboardPage><Contact /></DashboardPage>} />
              <Route path="/dashboard/profile" element={<DashboardPage><Profile /></DashboardPage>} />
              <Route path="/dashboard/admin" element={<DashboardPage><AdminPanel /></DashboardPage>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </UserProvider>
  </ThemeProvider>
);

export default App;
