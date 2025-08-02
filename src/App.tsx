import { Routes, Route, Navigate } from 'react-router-dom';
import Catalogue from '@/pages/Catalogue';
import Home from '@/components/home';
import Login from '@/pages/Login';
import CreateAccountPage from '@/components/CreateAccountPage';
import ClientDashboard from '@/components/ClientDashboard';
import ConseillereDashboard from '@/components/ConseillereDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

// Application routes protected by user role

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/login" element={<Login />} />
      <Route path="/client/create-account" element={<CreateAccountPage />} />
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute roles={['client']}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/conseillere/dashboard"
        element={
          <ProtectedRoute roles={['advisor']}>
            <ConseillereDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
