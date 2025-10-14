import { Request, Response } from 'express';
import { TasksService } from './tasks.service';

export class TasksController {
  constructor(private tasksService: TasksService) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    const userId = req.user.id;
    const tasks = await this.tasksService.findAllByUser(userId);
    return res.status(200).json(tasks);
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    const userId = req.user.id;
    const { title, description, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'O título é obrigatório.' });
    }

    const task = await this.tasksService.create({ 
      title, 
      description, 
      due_date, 
      user_id: userId, 
      status: 'Pendente'
    });
    return res.status(201).json(task);
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    const userId = req.user.id;
    const taskId = parseInt(req.params.id);
    const taskData = req.body;
    const updatedTask = await this.tasksService.update(taskId, userId, taskData);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence ao usuário.' });
    }
    return res.status(200).json(updatedTask);
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    const userId = req.user.id;
    const taskId = parseInt(req.params.id);
    const deletedRows = await this.tasksService.delete(taskId, userId);
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence ao usuário.' });
    }
    return res.status(204).send();
  }
}