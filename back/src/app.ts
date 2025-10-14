import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './auth/auth.routes';
import tasksRoutes from './tasks/tasks.routes'; // Importamos as rotas de tarefas

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'API do To-Do App está funcionando!' });
    });

    this.app.use('/auth', authRoutes);
    this.app.use('/tasks', tasksRoutes); // Usamos as rotas de tarefas com o prefixo '/tasks'
  }
}

export default new App().app;