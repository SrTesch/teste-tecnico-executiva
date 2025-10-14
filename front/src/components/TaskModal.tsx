import { useState, useEffect } from 'react';
import type { Task } from '../pages/DashboardPage';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdateTask: (taskId: number, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: number) => void;
}

// A FUNÇÃO DE FORMATAR DATA AGORA FICA AQUI
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';

  // Cria um objeto de data interpretando a string como UTC
  const date = new Date(dateString);

  // Extrai os componentes da data em UTC para evitar problemas de fuso horário
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() é base 0 (Janeiro=0)
  const year = date.getUTCFullYear();

  // Retorna a string no formato garantido
  return `${day}/${month}/${year}`;
};

const TaskModal = ({ task, onClose, onUpdateTask, onDeleteTask }: TaskModalProps) => {
  // Estado local para edições, inicializado com a tarefa recebida
  const [localTask, setLocalTask] = useState<Task>(task);
  const [hasChanges, setHasChanges] = useState(false);

  // Sincroniza o estado local se a tarefa externa mudar
  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalTask({ ...localTask, [e.target.name]: e.target.value });
    setHasChanges(true);
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  const handleSaveChanges = () => {
    onUpdateTask(task.id, { description: localTask.description });
    setHasChanges(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{localTask.title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem' }}>&times;</button>
        </div>
        <div className="modal-body">
          {/* TEXTAREA PARA A DESCRIÇÃO */}
          <textarea
            name="description"
            value={localTask.description || ''}
            onChange={handleInputChange}
            placeholder="Adicionar uma descrição..."
            rows={4}
            style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#333', color: 'white', fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical', marginBottom: '1rem' }}
          />
          {hasChanges && (
            <button onClick={handleSaveChanges} style={{ marginBottom: '1rem' }}>
              Salvar Descrição
            </button>
          )}

          <hr style={{ borderColor: '#444' }}/>
          <div className="modal-details">
            <p>Criada em: <span>{formatDate(localTask.created_at)}</span></p>
            <p>Previsão de Conclusão: <span>{formatDate(localTask.due_date)}</span></p>
            <p>Entregue em: <span>{formatDate(localTask.conclusion_at)}</span></p>
          </div>
          <div className="modal-status-selector">
            <p>Alterar status:</p>
            <div className='buttons'>
              {(['Pendente', 'Fazendo', 'Concluído'] as const).map(status => (
                <button 
                  key={status} 
                  onClick={() => handleStatusChange(status)}
                  className={localTask.status === status ? 'active' : ''}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '2rem', borderTop: '1px solid #444', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => onDeleteTask(task.id)} style={{ backgroundColor: '#ef4444', color: 'white' }}>
              Excluir Tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;