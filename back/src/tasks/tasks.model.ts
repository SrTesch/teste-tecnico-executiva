export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pendente' | 'em andamento' | 'concluída';
  created_at: string;
  conclusion_at?: string;
  user_id: number;
}