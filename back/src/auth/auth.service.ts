import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';

export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Autentica um usuário e retorna um token JWT.
   * @param credentials Email e senha do usuário.
   * @returns Um objeto contendo o token JWT.
   */
  public async signin(
    credentials: Pick<User, 'email' | 'password'>
  ): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password as string,
      user.password as string
    );

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('Chave secreta JWT não configurada no servidor.');
    }

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '8h', 
    });

    return { token };
  }
}