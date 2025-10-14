import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage'; // Importe a nova página

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Rota Raiz que decide para onde ir */}
      <Route path="/" element={<HomePage />} />

      {/* Rota Privada */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Rota de fallback: redireciona para a página inicial */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};