import { useState } from "react";

export default function TaskFrom({ onSubmit, onClose }) {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description });
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
                Add Task
            </button>
            <button 
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={onClose}
            >
                Close
            </button>
            </div>
            
        </form>
    );
    
}