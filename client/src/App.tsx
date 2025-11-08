// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import Agencies from "./pages/agencies/Agencies";
// import AgencyDetails from "./pages/agencies/AgencyDetails";
// import Tenants from "./pages/tenants/Tenants";
// import TenantDetails from "./pages/tenants/TenantDetails";
// import TenantLocations from "./pages/tenants/TenantLocations";
// import LocationDetails from "./pages/locations/LocationDetails";
// import Locations from "./pages/locations/Locations";
// // import SignIn from "./pages/auth/SignIn";
// // import SignUp from "./pages/auth/SignUp";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           {/* <Route path="/" element={<Index />} /> */}
//           {/* <Route path="/agencies" element={<Agencies />} /> */}
//           {/* <Route path="/agencies/:id" element={<AgencyDetails />} /> */}
//           <Route path="/tenants" element={<Tenants />} />
//           {/* <Route path="/tenants/:tenantId" element={<TenantDetails />} /> */}
//           {/* <Route path="/agencies/:agencyId/tenants/:tenantId" element={<TenantDetails />} /> */}
//           {/* <Route path="/agencies/:agencyId/tenants/:tenantId/locations" element={<TenantLocations />} /> */}
//           {/* <Route path="/agencies/:agencyId/tenants/:tenantId/locations/:locationId" element={<LocationDetails />} /> */}
//           <Route path="/locations" element={<Locations />} />
//           -------------------------------
//           <Route path="/" element={<Index />} />
//           {/* Agencies */}
//           <Route path="/agencies" element={<Agencies />} />
//           <Route path="/agencies/:agencyId" element={<AgencyDetails />} />
//           {/* Tenants under an agency */}
//           <Route
//             path="/agencies/:agencyId/tenants/:tenantId"
//             element={<TenantDetails />}
//           />
//           {/* Tenant Locations (under agency + tenant) */}
//           <Route
//             path="/agencies/:agencyId/tenants/:tenantId/locations"
//             element={<TenantLocations />}
//           />
//           {/* Specific Location details */}
//           <Route
//             path="/agencies/:agencyId/tenants/:tenantId/locations/:locationId"
//             element={<LocationDetails />}
//           />
//           {/* <Route path="/auth/signin" element={<SignIn />} /> */}
//           {/* <Route path="/auth/signup" element={<SignUp />} /> */}
//           {/* Catch-all */}
//           <Route path="*" element={<NotFound />} />
//           -------------------------
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
// --------------------------------- Revised Code ---------------------------------

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "./api";

// Pages
import Index from "./pages/Index";
import Agencies from "./pages/agencies/Agencies";
import AgencyDetails from "./pages/agencies/AgencyDetails";
import Tenants from "./pages/tenants/Tenants";
import TenantDetails from "./pages/tenants/TenantDetails";
import TenantLocations from "./pages/tenants/TenantLocations";
import Locations from "./pages/locations/Locations";
import LocationDetails from "./pages/locations/LocationDetails";
import NotFound from "./pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = () => {
  // ----------------------
  // 🔒 Authentication State
  // ----------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ----------------------
  // 🔍 Check user session
  // ----------------------
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("jwt_token");

        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Validate token with backend
        await api.get("/dashboard", { headers: { token } });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth check failed:", err.message);
        setIsAuthenticated(false);
        toast.info("Session expired. Please log in again.");
        localStorage.removeItem("jwt_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ----------------------
  // 📢 Notification Helper
  // ----------------------
  const notify = (
    msg: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // ----------------------
  // ⏳ Loading Spinner
  // ----------------------
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Checking session...</p>
      </div>
    );
  }

  // ----------------------
  // 🧭 App Routes
  // ----------------------
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/register"
              element={
                <Register setAuth={setIsAuthenticated} notify={notify} />
              }
            />
            <Route
              path="/login"
              element={<Login setAuth={setIsAuthenticated} notify={notify} />}
            />

            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                {/* Default Dashboard */}
                <Route path="/" element={<Index />} />

                {/* Agencies */}
                <Route path="/agencies" element={<Agencies />} />
                <Route path="/agencies/:agencyId" element={<AgencyDetails />} />

                {/* Tenants */}
                <Route path="/tenants" element={<Tenants />} />
                <Route
                  path="/agencies/:agencyId/tenants/:tenantId"
                  element={<TenantDetails />}
                />
                <Route
                  path="/agencies/:agencyId/tenants/:tenantId/locations"
                  element={<TenantLocations />}
                />

                {/* Locations */}
                <Route path="/locations" element={<Locations />} />
                <Route
                  path="/agencies/:agencyId/tenants/:tenantId/locations/:locationId"
                  element={<LocationDetails />}
                />
              </>
            ) : (
              <>
                {/* Redirect unauthenticated users */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
