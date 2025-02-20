import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Filter } from 'lucide-react';

export const TaskFilter: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  return (
    <div className="task-filter">
      <Filter size={20} />
      <select
        value={state.filter}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: { filter: e.target.value } })}
        className="filter-select"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};