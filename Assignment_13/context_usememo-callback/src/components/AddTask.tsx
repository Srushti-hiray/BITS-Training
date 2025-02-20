import React, { useState, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { PlusCircle } from 'lucide-react';

export const AddTask: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTaskContext();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: { text: text.trim() } });
      setText('');
    }
  }, [text, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-button">
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
};