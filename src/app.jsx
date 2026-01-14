import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Onboarding from "./pages/onboarding";
import Dashboard from "./pages/dashboard";

import Contacts from "./pages/contacts/Contacts";
import NewContact from "./pages/contacts/NewContact";

import NewCampaign from "./pages/campaigns/NewCampaign";

import Perfil from "./pages/perfil";
import Preferencias from "./pages/preferencias";
import Notificacoes from "./pages/notificacoes";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* PROTEGIDA (SEM NAVBAR) */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* PROTEGIDAS (COM NAVBAR) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Contacts />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/new"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NewContact />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns/new"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NewCampaign />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* PROTEGIDAS (SEM NAVBAR) */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Perfil />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/preferencias"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Preferencias />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notificacoes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Notificacoes />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
