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
      { ...newTask, id: Date.now(), status, subtasks : [], },
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

  const handleAddSubtask = (taskId, subtask) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? { ...task, subtasks: [...task.subtasks, { text: subtask.title, done: false }] }
        : task
    )
  );
};

  const handleToggleSubtask = (taskId, subtaskIndex) => {
  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map((sub, idx) =>
              idx === subtaskIndex ? { ...sub, done: !sub.done } : sub
            )
          }
        : task
    )
  );
};
  const handleDeleteSubtask = (taskId, subtaskIndex) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
            ...task,
            subtasks: task.subtasks.filter((_,idx) =>
            idx !== subtaskIndex)
      
        } : task
      )
    )
  }

  

  return (
    <>
      <div className="min-h-screen w-full p-8 flex gap-6 justify-start items-start overflow-x-auto bg-gradient-to-br from-blue-100 to-blue-200">
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
                task={task}
                description={task.description}
                onEdit={() => setEditingTask(task)}
                onMove={() => handleMoveTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onAddSub={(subtask) => handleAddSubtask(task.id, subtask)}
                onDeleteSub={(subtaskIndex)=>handleDeleteSubtask(task.id,subtaskIndex)}
                onToggleSub={(subIndex) => handleToggleSubtask(task.id, subIndex)}
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
