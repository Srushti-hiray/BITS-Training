import React, { createContext, useContext, useReducer } from 'react';
import { Task, TaskAction, TaskState } from "../types/types";

const initialState: TaskState = {
  tasks: [],
  filter: 'all'
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};