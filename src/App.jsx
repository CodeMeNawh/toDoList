import { useState } from 'react'

import './App.css'
import CustomCard from './components/CustomCard';
import Task from './components/Task';
import TaskForm from './components/TaskForm';

function App() {
  
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);

  const [openForm, setOpenForm] = useState(null);

  


  const handleAddTask = (newTask, status) => {
    setTasks((prev) => [
      ...prev,
      { ...newTask, id: Date.now(), status },
    ]);
    setOpenForm(null)
  }

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks((prev) => (
      prev.map((task) => task.id === taskId 
        ? {...task, ...updatedTask} : task
      )
    ))
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleMoveTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          let newStatus = task.status;
          if (task.status === "to do") newStatus = "doing";
          else if (task.status === "doing") newStatus = "done";
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  

  return (
    <>
      <div className="w-full p-4 flex gap-4 justify-center items-start ">
        {["to do", "doing", "done"].map((status) => (
          <CustomCard
            key={status}
            title={status.toLocaleUpperCase()}
            onAdd={()=>setOpenForm(status)}
          >
            {tasks.filter((task) => task.status === status).map((task) =>
              <Task
                key={task.id}
                title={task.title}
                description={task.description}
                onEdit={() => setEditingTask(task)}
                onMove={() => handleMoveTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />)}    
            {openForm === status && (
            <TaskForm
              onSubmit={(task) => handleAddTask(task, status)}
              onClose={() => setOpenForm(null)}
            />
            )}
            {editingTask?.status === status && (
            <TaskForm
              initialTask={editingTask}
              onSubmit={(updatedTask) =>
                handleUpdateTask(editingTask.id, updatedTask)
              }
              onClose={() => setEditingTask(null)}
            />
          )}
        </CustomCard>
      ))}
    </div>
    </>
  )
}

export default App
