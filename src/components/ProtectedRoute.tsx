import { Navigate, Outlet } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Role } from '@/context/AuthProvider';

interface ProtectedRouteProps {
  roles?: Role[];
  children?: ReactNode;
}

const roleToPath: Record<Role, string> = {
  client: '/client/dashboard',
  advisor: '/conseillere/dashboard',
  admin: '/admin/dashboard',
};

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  if (loading) return null;
  if (!user) {
    return <Navigate to="/client/login" replace />;
  }

  if (roles && profile && !roles.includes(profile.role)) {
    return <Navigate to={roleToPath[profile.role]} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
