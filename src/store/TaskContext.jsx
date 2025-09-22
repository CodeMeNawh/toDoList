import { createContext, useState, useReducer, act } from "react";

export const TaskContext = createContext({
    tasks: [],
    addTask: () => {},
    deleteTask: () => {},
    editTask: () => {},
    moveTask: () => {},
    addSubTask: () => {},
    deleteSubTask: () => {},
    toggleSubTask: () => {},
    openForm: null,
    setOpenForm: () => {},
    editingTask: null,
    setEditingTask: () => {},
});

function TaskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload.newTask,
            id: Date.now(),
            status: action.payload.status,
            subtasks: []
          }
        ]
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(task=>task.id !== action.payload.taskId)

      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.taskId
          ? { ...task, ...action.payload.updatedTask }
          :task
        )
         
      }
    case "ADD_SUBTASK":
      console.log("Reducer ADD_SUBTASK:", action.payload, state.tasks);
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.taskId
          ? {
            ...task,
            subtasks:[...(task.subtasks || []), action.payload.subtask]
          }
          : task
        )
      }
    
    case "DELETE_SUBTASK":
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.taskId
          ? {
            ...task,
            subtasks : task.subtasks.filter((_,idx)=> idx !== action.payload.subtaskIndex)
        }  : task
        )
      }
    case "MOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task => {
      if (task.id === action.payload.taskId) {
        let newStatus = task.status;
        if (task.status === "to do") newStatus = "doing";
        else if (task.status === "doing") newStatus = "done";
        return { ...task, status: newStatus };
      }
      return task;
    })
       
      }
    case "TOGGLE_SUBTASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                subtasks: task.subtasks.map((sub, idx) =>
                  idx === action.payload.subtaskIndex ? { ...sub, done: !sub.done } : sub
                )
              }
            : task
        )
      }
  default:
      return state;
  }
}

export default function TaskContextProvider({children}) {
    
  const [taskState, dispatchTask] = useReducer(TaskReducer, {
      tasks : [],
    })
    
    const [editingTask, setEditingTask] = useState(null);
    
    const [openForm, setOpenForm] = useState(null);
    
      
    
    
      const handleAddTask = (newTask, status) => {
        dispatchTask({ type: "ADD_TASK", payload: { newTask, status } })
        setOpenForm(null);
      }
    
      const handleUpdateTask = (taskId, updatedTask) => {
        dispatchTask({ type: "UPDATE_TASK", payload: {taskId, updatedTask} } )
        setEditingTask(null)
      }
    
      const handleDeleteTask = (taskId) => {
        
        dispatchTask({ type: "DELETE_TASK", payload: { taskId } })
      };
    
      const handleMoveTask = (taskId) => {
        dispatchTask({ type: "MOVE_TASK", payload: { taskId } })
        setEditingTask(null);
      };
    
      const handleAddSubtask = (taskId, subtask) => {
      dispatchTask({type : "ADD_SUBTASK", payload:{taskId, subtask}})
    };
    
      const handleToggleSubtask = (taskId, subtaskIndex) => {
      dispatchTask({type: "TOGGLE_SUBTASK", payload: {taskId,subtaskIndex}})
    };
      const handleDeleteSubtask = (taskId, subtaskIndex) => {
        dispatchTask({ type: "DELETE_SUBTASK", payload : {taskId,subtaskIndex} })
    }

    const ctxValue = {

        tasks: taskState.tasks,
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        editTask: handleUpdateTask,
        moveTask: handleMoveTask,
        addSubTask: handleAddSubtask,
        deleteSubTask: handleDeleteSubtask,
        toggleSubTask: handleToggleSubtask,
        openForm,          
        setOpenForm,       
        editingTask,        
        setEditingTask 
        
    }
    
    return(
    <TaskContext.Provider value={ctxValue}>
        {children}
        </TaskContext.Provider>
    )
}