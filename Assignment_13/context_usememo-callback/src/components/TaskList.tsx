import React, { useMemo, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

export const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const handleToggle = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id } });
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TASK', payload: { id } });
  }, [dispatch]);

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-content">
            <button
              onClick={() => handleToggle(task.id)}
              className={`toggle-button ${task.completed ? 'completed' : ''}`}
            >
              {task.completed ? (
                <CheckCircle2 size={24} />
              ) : (
                <Circle size={24} />
              )}
            </button>
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="delete-button"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      {filteredTasks.length === 0 && (
        <p className="empty-message">No tasks found.</p>
      )}
    </div>
  );
};