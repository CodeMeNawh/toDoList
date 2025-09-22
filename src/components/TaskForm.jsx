import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../store/TaskContext";


export default function TaskForm({  onClose, task  }) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { addTask, editTask, openForm, setOpenForm } = useContext(TaskContext);

    
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            editTask(task.id, { title, description });
            setOpenForm(null);
        } else {
            addTask({ title, description }, openForm);
            setOpenForm(null);
        }
        setTitle("");
        setDescription("");
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-center items-center gap-4">
                <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                {task ? "Save" : "+Task"}
            </button>
           
            <button 
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onClose}
            >
                X
            </button>
            </div>
            
        </form>
    );
    
}