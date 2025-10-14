import db from '../config/database';
import { Task } from './tasks.model';

export class TasksService {
  public async findAllByUser(userId: number): Promise<Task[]> {
    const tasks = await db('tasks').where({ user_id: userId }).orderBy('created_at', 'desc');
    return tasks;
  }

  public async create(taskData: Omit<Task, 'id' | 'created_at' | 'conclusion_at'>): Promise<Task> {
    const [newTask] = await db('tasks').insert(taskData).returning('*');
    return newTask;
  }

  public async update(taskId: number, userId: number, taskData: Partial<Omit<Task, 'id' | 'user_id'>>): Promise<Task | undefined> {
    if (taskData.status === 'Concluído') {
      taskData.conclusion_at = new Date().toISOString();
    } else if (taskData.status) {
      taskData.conclusion_at = undefined;
    }
    
    const [updatedTask] = await db('tasks')
      .where({ id: taskId, user_id: userId })
      .update(taskData)
      .returning('*');
    return updatedTask;
  }

  public async delete(taskId: number, userId: number): Promise<number> {
    const deletedRows = await db('tasks').where({ id: taskId, user_id: userId }).delete();
    return deletedRows;
  }
}