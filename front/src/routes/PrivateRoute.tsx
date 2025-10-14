import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export const PrivateRoute = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return signed ? <Outlet /> : <Navigate to="/login" />;
};