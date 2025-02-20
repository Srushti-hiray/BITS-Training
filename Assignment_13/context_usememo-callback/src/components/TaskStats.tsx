import React, { useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export const TaskStats: React.FC = () => {
  const { state } = useTaskContext();

  const stats = useMemo(() => {
    const completed = state.tasks.filter(task => task.completed).length;
    const total = state.tasks.length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, pending, completionRate };
  }, [state.tasks]);

  return (
    <div className="task-stats">
      <div className="stat-item">
        <CheckCircle2 size={20} />
        <span>Completed: {stats.completed}</span>
      </div>
      <div className="stat-item">
        <Circle size={20} />
        <span>Pending: {stats.pending}</span>
      </div>
      <div className="stat-item">
        <Clock size={20} />
        <span>Completion Rate: {stats.completionRate}%</span>
      </div>
    </div>
  );
};