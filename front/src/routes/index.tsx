import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

// Vamos criar estas páginas no próximo passo, por enquanto apenas importamos os nomes
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SignupPage from '../pages/SignupPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Rota Privada */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        {/* O 'Outlet' da PrivateRoute renderizará este elemento */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      {/* Rota Padrão: Redireciona para o dashboard se logado, ou para o login se não */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};