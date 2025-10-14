import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';

export class AuthService {
  // O AuthService depende do UsersService para encontrar usuários
  constructor(private usersService: UsersService) {}

  /**
   * Autentica um usuário e retorna um token JWT.
   * @param credentials Email e senha do usuário.
   * @returns Um objeto contendo o token JWT.
   */
  public async signin(
    credentials: Pick<User, 'email' | 'password'>
  ): Promise<{ token: string }> {
    // 1. Encontra o usuário pelo e-mail
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      // Usamos uma mensagem genérica para não informar se o e-mail existe ou não
      throw new Error('Credenciais inválidas');
    }

    // 2. Compara a senha fornecida com a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(
      credentials.password as string,
      user.password as string
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // 3. Se as credenciais estiverem corretas, gera o token JWT
    
    // O 'payload' são as informações que queremos armazenar dentro do token.
    // NUNCA armazene informações sensíveis como senhas aqui.
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Pega a chave secreta do .env
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      // Falha de segurança se a chave não estiver configurada
      throw new Error('Chave secreta JWT não configurada no servidor.');
    }

    // Gera o token
    const token = jwt.sign(payload, secretKey, {
      expiresIn: '8h', // O token expirará em 8 horas
    });

    // 4. Retorna o token gerado
    return { token };
  }
}