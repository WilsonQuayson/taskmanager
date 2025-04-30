import { useState } from "react";
import { TaskItem } from "../../types";


type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
};
  
const Modal = ({ isVisible, onClose }: ModalProps) => {
    const [Title, SetTitle] = useState("");
    const [Description, SetDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        fetch("http://localhost:3000/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: Title,
            description: Description || "", // Optional field, corresponds to string? in C#
            isCompleted: false,
            createdAt: new Date().toISOString(), // DateTime in C# corresponds to string in JSON (ISO 8601 format)
            dueDate: null
          }),
        });
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        {/* Background overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isVisible ? 'opacity-50 pointer-events-auto' : 'opacity-0'
          }`}
          onClick={onClose}
        />
      
        {/* Modal content */}
        <div
          className={`relative bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()} // prevents closing when clicking the modal
        >
          <div className="flex justify-end">
            <button className="hover:cursor-pointer" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col w-[90%] justify-self-center gap-2 h-full">
            <div className="flex flex-col gap-2 overflow-hidden">
              <label htmlFor="Title" className="text-black font-medium">Title:</label>
              <input type="text" name="Title" className="border-gray-300 border-2" onChange={(e) => SetTitle(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Description" className="text-black font-medium">Description:</label>
              <textarea name="Description" className="border-gray-300 border-2" onChange={(e) => SetDescription(e.target.value)}></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    
    );
}

export default Modal;
  