import bcrypt from 'bcryptjs';
import db from '../config/database'; // Nossa conexão Knex
import { User } from './user.model';

export class UsersService {
  /**
   * Procura um usuário pelo email.
   * @param email O email do usuário a ser encontrado.
   * @returns O usuário encontrado ou undefined.
   */
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await db('users').where({ email }).first();
    return user;
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @param userData Os dados do usuário (email e senha).
   * @returns O usuário criado, sem a senha.
   */
  public async create(userData: Pick<User, 'email' | 'password'>): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(userData.password as string, 10);

    const [newUser] = await db('users')
      .insert({
        email: userData.email,
        password: hashedPassword,
      })
      .returning(['id', 'email', 'created_at']);
    return newUser;
  }
}