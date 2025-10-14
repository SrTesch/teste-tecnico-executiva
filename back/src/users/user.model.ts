export interface User {
  id: number;
  email: string;
  password?: string; // A senha é opcional aqui pois não queremos retorná-la em toda ocasião
  created_at: string;
}