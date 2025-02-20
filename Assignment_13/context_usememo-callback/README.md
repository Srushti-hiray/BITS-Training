### Task Manager
1️⃣ Create Context and Reducer for Task Management
Use useContext to create a TaskContext for global state management.
Use useReducer to handle actions like adding, deleting, and toggling tasks.
Task Actions:
ADD_TASK → Adds a new task
REMOVE_TASK → Removes a task
TOGGLE_TASK → Marks a task as completed/incomplete

2️⃣ Use useMemo to Optimize Task Filtering
Display total completed tasks using useMemo.
Memoize calculations so they don’t re-run unnecessarily.

3️⃣ Use useCallback to Optimize Event Handlers
Optimize addTask and toggleTask functions using useCallback.
Ensure that these functions don’t unnecessarily re-render child components

https://github.com/user-attachments/assets/c297470b-05df-47f9-97c8-efc9add1069c

