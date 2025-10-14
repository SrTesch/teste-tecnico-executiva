import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import Footer from '../components/footer';
const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/signin', { email, password });
            const { token } = response.data;

            login(token);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('ERRO ao chamar a API:', err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar fazer login.');
            }
        }
    };

    return (
        <div className="form-container">
            <div className="loginCont">
                
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        name='email'
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
                {error && <p className="message error">{error}</p>}
                <p>
                    Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;