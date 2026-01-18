import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "./pages/login";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastContainer } from "./components/Toast/ToastContainer";
import { ThemeProvider } from "./contexts/ThemeContext";

// Lazy loaded pages
const Onboarding = lazy(() => import("./pages/onboarding"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Contacts = lazy(() => import("./pages/contacts/Contacts"));
const NewContact = lazy(() => import("./pages/contacts/NewContact"));
const EditContact = lazy(() => import("./pages/contacts/EditContact"));
const NewCampaign = lazy(() => import("./pages/campaigns/NewCampaign"));
const Configuracoes = lazy(() => import("./pages/configuracoes"));

// Loading component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    Carregando...
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<PageLoader />}>
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
          path="/contacts/edit/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EditContact />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NewCampaign />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Configuracoes />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
