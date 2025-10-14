export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'Pendente' | 'Fazendo' | 'Concluído';
  created_at: string;
  due_date?: string; 
  conclusion_at?: string; 
  user_id: number;
}