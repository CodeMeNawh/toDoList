import TabButton from "./TabButton";
import TaskForm from "./TaskForm";
import { useState, useContext } from "react";
import SubTask from "./SubTask";
import { TaskContext } from "../store/TaskContext";
import SubtaskForm from "./SubtaskForm";


export default function Task({task}) { 
    const [openSubTaskForm, setOpenSubTaskForm] = useState(false)
    const { title, description, subtasks } = task;
    console.log("Task:", task);
    const {
    deleteTask,
    moveTask,
    addSubTask,
    toggleSubTask,
    deleteSubTask,
    setEditingTask
  } = useContext(TaskContext);
    
    return (
        <div className="bg-gray-100 p-3 rounded shadow mb-2">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-base truncate">{title}</h3>
            </div>
            <p className="text-xs text-gray-600 break-words mb-2">{description}</p>
            <div className="flex gap-1 mb-2">
                <TabButton onClick={() => setEditingTask(task)} className="!px-2 !py-1 !text-xs">Edit</TabButton>
                <TabButton onClick={()=>deleteTask(task.id)} className="!px-2 !py-1 !text-xs">Delete</TabButton>
                <TabButton onClick={()=>setOpenSubTaskForm(true)} className="!px-2 !py-1 !text-xs">+Sub</TabButton>
                <TabButton onClick={()=>moveTask(task.id)} className="!px-2 !py-1 !text-xs">
                    <span className="material-icons text-base">check</span>
                </TabButton>
            </div>
            <div className="space-y-1">
                {subtasks.map((subtask, index) => <SubTask
                    key={index}
                    text={subtask.text}
                    done={subtask.done}
                    onToggle={() => toggleSubTask(task.id,index)}
                    onDelete={()=>deleteSubTask(task.id,index)}
                />)}
            </div>
            {openSubTaskForm && (
                <SubtaskForm
                    onSubmit={(subtask) => {
                        console.log("Adding subtask:", subtask);
                        addSubTask(task.id, { text: subtask.title, done: false });          
                        setOpenSubTaskForm(false);    
                    }}
                    onClose={() => setOpenSubTaskForm(false)}
                />
            )}
        </div>
    );
}