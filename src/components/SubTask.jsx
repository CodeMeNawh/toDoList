import TabButton from "./TabButton"

export default function SubTask({ text, done, onToggle, onDelete }) {
    return (
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={onToggle}
                    className="w-4 h-4"
                />
                <span className={done ? "line-through text-gray-600" : ""}>
                    {text}
                </span>
                <TabButton onClick={onDelete} className="!px-2 !py-1 !text-xs">Delete</TabButton>
            </label>
        </div>
    )
}