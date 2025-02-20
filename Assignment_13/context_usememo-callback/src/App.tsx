import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { TaskFilter } from './components/TaskFilter';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <div className="task-card">
          <div className="header">
            <CheckSquare size={32} />
            <h1>Task Manager</h1>
          </div>
          <TaskStats />
          <br></br>
          <AddTask />
          <TaskFilter />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;