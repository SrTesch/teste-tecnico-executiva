import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const HomePage = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default HomePage;