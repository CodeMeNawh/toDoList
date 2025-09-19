import TabButton from "./TabButton";

export default function Task({ title, description, onEdit, onDelete,  children }) { 
    return (<div className="bg-white p-2 rounded shadow  ">
        <div className="flex items-center justify-between">
             <h3 className="font-medium">{ title}</h3>
            <TabButton onClick={onEdit}>Edit</TabButton>
            <TabButton onClick={onDelete}>Delete</TabButton>
        </div>
       
        <p className="text-sm text-gray-600">{description}</p>
        
            
        
        
        {children}

    </div>);
}