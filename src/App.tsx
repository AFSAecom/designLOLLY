import { Routes, Route, Navigate } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import Home from '@/components/home';
import LoginPage from '@/components/LoginPage';
import CreateAccountPage from '@/components/CreateAccountPage';
import ClientDashboard from '@/components/ClientDashboard';
import ConseillereDashboard from '@/components/ConseillereDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/client/login" element={<LoginPage userType="client" />} />
      <Route path="/conseillere/login" element={<LoginPage userType="conseillere" />} />
      <Route path="/admin/login" element={<LoginPage userType="admin" />} />
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
