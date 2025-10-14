import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
// import api from '../services/api';

// Define a "forma" dos dados que o nosso contexto irá fornecer
interface AuthContextData {
  signed: boolean;
  token: string | null;
  login(token: string): void;
  logout(): void;
}

// Cria o contexto com um valor padrão
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Cria o "Provider", o componente que irá abraçar nossa aplicação e fornecer os dados de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Este efeito roda uma vez quando o componente é montado
  useEffect(() => {
    // Busca o token salvo no localStorage para manter o usuário logado
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Função para realizar o login
  function login(tokenValue: string) {
    setToken(tokenValue);
    localStorage.setItem('token', tokenValue);
  }

  // Função para realizar o logout
  function logout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;