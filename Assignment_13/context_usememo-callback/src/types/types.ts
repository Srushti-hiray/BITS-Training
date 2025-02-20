export interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  }
  
  export type TaskAction =
    | { type: 'ADD_TASK'; payload: { text: string } }
    | { type: 'REMOVE_TASK'; payload: { id: string } }
    | { type: 'TOGGLE_TASK'; payload: { id: string } }
    | { type: 'SET_FILTER'; payload: { filter: string } }
  
  export interface TaskState {
    tasks: Task[];
    filter: string;
  }