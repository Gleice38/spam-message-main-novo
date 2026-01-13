import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Onboarding from './pages/onboarding'
import Dashboard from './pages/dashboard'
import Contacts from './pages/contacts/Contacts'
import AppLayout from './layouts/AppLayout'
import NewContact from "./pages/contacts/NewContact";

import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />

  <Route
    path="/onboarding"
    element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    }
  />

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
            <AppLayout>
              <NewContact />
            </AppLayout>
          }
        />
        
</Routes>

    </BrowserRouter>
  )
}
