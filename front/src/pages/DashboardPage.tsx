import { useState, useEffect, useContext, type FormEvent } from 'react';
import AuthContext from '../contexts/AuthContext';
import api from '../services/api';
import TaskModal from '../components/TaskModal';
import Footer from '../components/footer';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'Pendente' | 'Fazendo' | 'Concluído';
  created_at: string;
  due_date?: string;
  conclusion_at?: string;
}

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Não foi possível carregar as tarefas.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      await api.post('/tasks', { ...newTask });
      setNewTask({ title: '', description: '', due_date: '' }); 
      fetchTasks(); 
    } catch (err) {
      setError('Não foi possível criar a tarefa.');
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updates);
      const updatedTaskFromServer = response.data;

      setTasks(tasks.map(task => (task.id === taskId ? updatedTaskFromServer : task)));

      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(updatedTaskFromServer);
      }
    } catch (err) {
      setError('Não foi possível atualizar a tarefa.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      try {
        await api.delete(`/tasks/${taskId}`);

        setTasks(tasks.filter(task => task.id !== taskId));

        setSelectedTask(null);
      } catch (err) {
        setError('Não foi possível excluir a tarefa.');
        console.error(err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Minha Lista de Tarefas</h1>
        <button onClick={logout}>Sair</button>
      </div>
      <div className="dashContent">
        
        <form className="new-task-form" onSubmit={handleCreateTask}>
          <div className="form-row">
            <div className="form-group" style={{ flex: '1 1 0%' }}>
              <label>Título da Tarefa *</label>
              <input
                name="title"
                type="text"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="O que precisa ser feito?"
                required
              />
            </div>
            <div className="form-group" style={{ flex: '2 1 0%' }}>
              <label>Descrição</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Adicionar mais detalhes..."
                className='desc'
              />
            </div>
          </div>
          <div className="form-row" id='dataRow'>
            <div className="form-group">
              <label>Data de Entrega Prevista</label>
              <input
                name="due_date"
                type="date"
                value={newTask.due_date}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Adicionar Tarefa</button>
          </div>
        </form>
        {error && <p className="message error">{error}</p>}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card" onClick={() => setSelectedTask(task)}>
              <h3>{task.title}</h3>
              <span className={`task-status status-${task.status}`}>{task.status}</span>
            </div>
          ))}
        </div>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;