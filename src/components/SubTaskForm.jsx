import { useState } from "react";

export default function SubtaskForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onSubmit({ title });
            setTitle("");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Subtask title"
                className="flex-1 p-1 border border-gray-300 rounded"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
            <button type="button" onClick={onClose} className="px-2 py-1">X</button>
        </form>
    );
}