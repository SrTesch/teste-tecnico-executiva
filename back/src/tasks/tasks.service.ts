import db from '../config/database';
import { Task } from './tasks.model';

export class TasksService {

  public async findAllByUser(userId: number): Promise<Task[]> {
    const tasks = await db('tasks').where({ user_id: userId }).orderBy('created_at', 'desc');
    return tasks;
  }

  public async create(taskData: Omit<Task, 'id' | 'created_at'>): Promise<Task> {
    const [newTask] = await db('tasks').insert(taskData).returning('*');
    return newTask;
  }

  public async update(taskId: number, userId: number, taskData: Partial<Omit<Task, 'id' | 'user_id'>>): Promise<Task | undefined> {
    const [updatedTask] = await db('tasks')
      .where({ id: taskId, user_id: userId }) // Garante que o usuário só pode atualizar suas próprias tarefas
      .update(taskData)
      .returning('*');
    return updatedTask;
  }

  public async delete(taskId: number, userId: number): Promise<number> {
    // Retorna o número de linhas deletadas
    const deletedRows = await db('tasks')
      .where({ id: taskId, user_id: userId }) // Garante que o usuário só pode deletar suas próprias tarefas
      .delete();
    return deletedRows;
  }
}