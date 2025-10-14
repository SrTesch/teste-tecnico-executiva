import { Router } from 'express';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service'; 

const authRoutes = Router();

const usersService = new UsersService();
const authService = new AuthService(usersService);
const authController = new AuthController(usersService, authService);

authRoutes.post('/signup', authController.signup.bind(authController));

authRoutes.post('/signin', authController.signin.bind(authController));

export default authRoutes;