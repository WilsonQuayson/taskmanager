import React, { useEffect, useState } from "react";
import { TaskItem } from "../../types";


interface IDataContext {
    tasks: TaskItem[];
    fetchData: () => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
    handleSubmit: (title: string, description?: string) => Promise<void>;
}

export const DataContext = React.createContext<IDataContext>({
    tasks: [],
    fetchData: async () => Promise.resolve(),
    handleDelete: async () => Promise.resolve(),
    handleSubmit: function ( title: string, description?: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);

    const handleSubmit = async ( title: string, description?: string ): Promise<void> => {
        try {
          const response = await fetch("http://localhost:3000/api/task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description: description || "",
              isCompleted: false,
              createdAt: new Date().toISOString(),
              dueDate: null,
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
        const response = await fetch('http://localhost:3000/api/task')
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
            const response = await fetch(`http://localhost:5113/api/TaskItems/${id}`, {
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
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{tasks: tasks, fetchData: fetchData, handleDelete: handleDelete, handleSubmit: handleSubmit}}>
            {children}
        </DataContext.Provider>
    )
}