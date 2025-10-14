import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Bem-vindo ao seu Painel de Tarefas!</h1>
      <p>Esta é a sua área autenticada.</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default DashboardPage;