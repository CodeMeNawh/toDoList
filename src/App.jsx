

import './App.css'
import CustomCard from './components/CustomCard';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import TaskContextProvider from './store/TaskContext';
import { TaskContext } from './store/TaskContext.jsx'
import { useContext } from 'react';

function App() { 
   return (
    <TaskContextProvider>
      <Board />
    </TaskContextProvider>
  )
}
  
 function Board() {
  const { tasks, openForm, setOpenForm, editingTask, setEditingTask, editTask } = useContext(TaskContext);

  return (
    <div className="min-h-screen w-full p-8 flex gap-6 justify-start items-start overflow-x-auto bg-gradient-to-br from-blue-100 to-blue-200">
      {["to do", "doing", "done"].map((status) => (
        <CustomCard
          key={status}
          title={status.toLocaleUpperCase()}
          onAdd={() => setOpenForm(status)}
        >
          {tasks.filter((task) => task.status === status).map((task) =>
            <Task
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)} // still need edit here
            />)}    
          {openForm === status && (
            <TaskForm
              onClose={() => setOpenForm(null)}
            />
          )}
          {editingTask?.status === status && (
            <TaskForm
              task={editingTask}
              onSubmit={(updatedTask) =>
                editTask(editingTask.id, updatedTask)
              }
              onClose={() => setEditingTask(null)}
            />
          )}
        </CustomCard>
      ))}
    </div>
  )
}


export default App
