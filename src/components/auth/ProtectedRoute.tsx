import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../contants/routes';
import { useAppSelector } from '../../store/hooks';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} replace />;
};
