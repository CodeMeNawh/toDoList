import TabButton from "./TabButton";

export default function CustomCard({ title, onAdd, children }) { 

    
    return (
        <div className="bg-blue-100 rounded-lg shadow-md p-4 flex-wrap min-w-[18rem] max-w-[36rem] w-full">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <TabButton onClick={onAdd}>+ Add Task</TabButton>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
}