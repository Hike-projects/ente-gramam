import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home"; // Home page
import Autorickshaw from "./pages/Autorickshaw"; // Existing page
import Addadr from "./pages/Addadr"; // For adding an Autorickshaw driver
import Auth from "./pages/Auth"; // Auth (Login/Signup) page
import Upload from "./pages/Upload"; // Upload component
import LandingPage from "./pages/LandingPage"; // New landing page component
import Support from "./pages/Support"; // New support page

// Protected Route Component
const ProtectedRoute = ({ component: Component, session, isLoading }) => {
  if (isLoading) return <div>Loading...</div>; // Loading indicator
  return session ? <Component /> : <Navigate to="/auth" replace />;
};

// Pages Component
const Pages = ({ session, isLoading }) => {
  return (
    <Router>
      <Routes>
        {/* If authenticated, show Home at root path, otherwise show LandingPage */}
        <Route
          path="/"
          element={
            session ? <Home /> : <LandingPage />
          }
        />

        {/* Public Route: Auth (Login/Signup) */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Route: Autorickshaw */}
        <Route
          path="/autorickshaw"
          element={
            <ProtectedRoute
              component={Autorickshaw}
              session={session}
              isLoading={isLoading}
            />
          }
        />

        {/* Protected Route: Add Autorickshaw Driver */}
        <Route
          path="/addadr"
          element={
            <ProtectedRoute
              component={Addadr}
              session={session}
              isLoading={isLoading}
            />
          }
        />

        {/* Public Route: Upload Page */}
        <Route path="/upload" element={<Upload />} />

        {/* Public Route: Support Page */}
        <Route path="/support" element={<Support />} />

        {/* Redirect "/home" to "/" */}
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default Pages;
