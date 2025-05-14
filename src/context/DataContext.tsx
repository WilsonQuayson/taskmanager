import React, { useEffect, useState } from "react";
import { TaskItem } from "../../types";


interface IDataContext {
    tasks: TaskItem[];
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenu: boolean;
    setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
    handleComplete: (id: number) => Promise<void>;
    handleSubmit: (title: string, dueDate: string, description?: string) => Promise<void>;
}

export const DataContext = React.createContext<IDataContext>({
    tasks: [],
    isModalOpen: false,
    setIsModalOpen: () => {},
    mobileMenu: false,
    setMobileMenu: () => {},
    fetchData: async () => Promise.resolve(),
    handleDelete: async () => Promise.resolve(),
    handleComplete: async () => Promise.resolve(),
    handleSubmit: function ( title: string, dueDate: string, description?: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleSubmit = async ( title: string, dueDate: string, description?: string ): Promise<void> => {

        try {
          const response = await fetch("/api/task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description: description || "",
              isCompleted: false,
              createdAt: new Date().toISOString(),
              dueDate: new Date(dueDate).toISOString(),
            }),
          });
      
          if (response.ok) {
            alert("Task added!");
            fetchData(); // Refresh the list
          } else {
            alert("Error adding task");
          }
        } catch (error) {
          console.error("Error submitting task:", error);
          alert("Failed to add task");
        }
    };
      

    const fetchData = async() => {
        try{
        const response = await fetch('/api/task')
        if(response.ok){
            const data = await response.json();
            const users: TaskItem[] = data;
            setTasks(users);
        }
        }catch(e){
            console.log(e);
        }
    }
    
    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/task?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Student deleted successfully");
                fetchData();
            } else {
                alert("Error deleting student");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Failed to delete student");
        }
    };

    const handleComplete = async (id: number) => {
        try {
            const response = await fetch(`/api/task?id=${id}`, {
                method: 'PATCH',
            });

            if (response.ok) {
                alert('Task marked as completed!');
                fetchData();
            } else {
                alert('Failed to update task.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('Something went wrong.');
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{
            tasks: tasks,
            fetchData: fetchData,
            handleDelete: handleDelete,
            handleComplete: handleComplete,
            handleSubmit: handleSubmit,
            isModalOpen: isModalOpen,
            setIsModalOpen: setIsModalOpen,
            mobileMenu: mobileMenu,
            setMobileMenu: setMobileMenu}}>
            {children}
        </DataContext.Provider>
    )
}