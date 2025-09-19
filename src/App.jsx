import { useState } from 'react'

import './App.css'
import CustomCard from './components/CustomCard';
import { taskLists as initialList } from './dataJson/TasksList';
import Task from './components/Task';
import TaskForm from './components/TaskForm';

function App() {
  
  const [taskLists, setTaskLists] = useState(
    initialList.map(list=>({...list, tasks : list.tasks || []}))
  );

  const [editingTask, setEditingTask] = useState(null);

  const [openFormId, setOpenFormId] = useState(null);

  


  const handleAddTask = (listId) => {
    setOpenFormId(listId);
  };

  const handleSubmitTask = (listId, newTask) => {
    setTaskLists(prev => prev.map(list => 
      list.id === listId
        ? {
          ...list, tasks: [...list.tasks, newTask]
        }
        : list
    ));
    setOpenFormId(null)
    
  }

  const handleUpdateTask = (listId, taskId, updatedTask) => { 
    setTaskLists(prev => prev.map(list =>
      list.id === listId
        ? {
          ...list, tasks: list.tasks.map((task, index) =>
            index === taskId ? updatedTask : task
          )
        }
        : list
    ));
    setEditingTask(null);
    setOpenFormId(null);
  }

  const handleDeleteTask = (listId, taskId) => {
    setTaskLists(prev => prev.map(list => list.id === listId
      ? {
        ...list, tasks: list.tasks.filter((_, index) => index !== taskId)
      }
      : list
      
    ))
  }
  

  return (
    <>
      <div className="w-full p-4 flex gap-4 justify-center items-start ">
      {taskLists.map(list => (
        <CustomCard
          key={list.id}
          title={list.title}
          onAdd={() => handleAddTask(list.id)}
          
        >
          {/* Render tasks */}
          {list.tasks.map((task, index) => (
            <Task
              key={index}
              title={task.title}
              description={task.description}
              onEdit={() => setEditingTask({ listId: list.id, taskId: index })}
              onDelete={()=>handleDeleteTask(list.id, index)}
            />
          ))}

          {/* Show form if this card's form is open */}
          {openFormId === list.id && (
            <TaskForm
              onSubmit={(task) => handleSubmitTask(list.id, task)}
              onClose={()=>setOpenFormId(null)}

            />
          )}
          {/* Show edit form if a task is being edited */}
          {editingTask?.listId === list.id && (
            <TaskForm
              initialTask = {list.tasks[editingTask.taskId]}
              onSubmit={(updatedTask) => handleUpdateTask(list.id, editingTask.taskId, updatedTask)}
              onClose={()=>setEditingTask(null)}
            />
          ) }
        </CustomCard>
      ))}
    </div>
    </>
  )
}

export default App
