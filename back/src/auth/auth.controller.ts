import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service'; // Importamos o AuthService

export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  public signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }

      const user = await this.usersService.create({ email, password });
      return res.status(201).json(user);

    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: string }).message;
        if (message === 'Este e-mail já está em uso.') {
          return res.status(409).json({ message });
        }
      }

      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };

  public signin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }

      const { token } = await this.authService.signin({ email, password });
      
      return res.status(200).json({ token });

    } catch (error) {
      if ( //copilot criou esse if para resolver um problema com a tipagem da variavel "error"
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        (error as { message: string }).message === 'Credenciais inválidas'
      ) {
        return res.status(401).json({ message: (error as { message: string }).message }); // 401 Unauthorized
      }
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };
}