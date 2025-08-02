import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/LoginPage";
import CreateAccountPage from "./components/CreateAccountPage";
import ClientDashboard from "./components/ClientDashboard";
import ConseillereDashboard from "./components/ConseillereDashboard";
import AdminDashboard from "./components/AdminDashboard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Tempo routes must come first */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Client Routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route
            path="/client/login"
            element={<LoginPage userType="client" />}
          />
          <Route
            path="/client/create-account"
            element={<CreateAccountPage />}
          />

          {/* Conseillère Routes */}
          <Route
            path="/conseillere/login"
            element={<LoginPage userType="conseillere" />}
          />
          <Route
            path="/conseillere/dashboard"
            element={<ConseillereDashboard />}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage userType="admin" />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Tempo route fallback */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
