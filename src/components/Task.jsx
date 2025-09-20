import TabButton from "./TabButton";
import TaskForm from "./TaskForm";
import { useState } from "react";
import SubTask from "./SubTask";

export default function Task({task, onEdit, onDelete, onMove,  onAddSub, onToggleSub, onDeleteSub   }) { 
    const [openSubTaskForm, setOpenSubTaskForm] = useState(false)
    const { title, description, subtasks } = task;
    
    return (
        <div className="bg-gray-100 p-3 rounded shadow mb-2">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-base truncate">{title}</h3>
            </div>
            <p className="text-xs text-gray-600 break-words mb-2">{description}</p>
            <div className="flex gap-1 mb-2">
                <TabButton onClick={onEdit} className="!px-2 !py-1 !text-xs">Edit</TabButton>
                <TabButton onClick={onDelete} className="!px-2 !py-1 !text-xs">Delete</TabButton>
                <TabButton onClick={()=>setOpenSubTaskForm(true)} className="!px-2 !py-1 !text-xs">+Sub</TabButton>
                <TabButton onClick={onMove} className="!px-2 !py-1 !text-xs">
                    <span className="material-icons text-base">check</span>
                </TabButton>
            </div>
            <div className="space-y-1">
                {subtasks.map((subtask, index) => <SubTask
                    key={index}
                    text={subtask.text}
                    done={subtask.done}
                    onToggle={() => onToggleSub(index)}
                    onDelete={()=>onDeleteSub(index)}
                />)}
            </div>
            {openSubTaskForm && (
                <TaskForm 
                    onSubmit={(subtask) => {
                        onAddSub({ title: subtask.title, done: false });          
                        setOpenSubTaskForm(false);    
                    }}
                    onClose={() => setOpenSubTaskForm(false)}
                />
            )}
        </div>
    );
}