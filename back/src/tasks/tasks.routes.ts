import { Router } from 'express';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { authMiddleware } from '../middleware/auth.middleware'; // O Guardião!

const tasksRoutes = Router();

const tasksService = new TasksService();
const tasksController = new TasksController(tasksService);

tasksRoutes.use(authMiddleware);

tasksRoutes.get('/', tasksController.getAll);
tasksRoutes.post('/', tasksController.create);
tasksRoutes.put('/:id', tasksController.update);
tasksRoutes.delete('/:id', tasksController.delete);

export default tasksRoutes;