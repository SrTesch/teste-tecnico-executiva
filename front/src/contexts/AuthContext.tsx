import { createContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextData {
  signed: boolean;
  token: string | null;
  loading: boolean;
  login(token: string): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false); 
  }, []);

  function login(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    setToken(tokenValue);
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;