import { useEffect, useState } from "react";
import { TaskItem } from "../../types";
import Modal from "@/components/Modal";

const Home = () => {
  const [Tasks, SetTasks] = useState<TaskItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Title, SetTitle] = useState<string>("")
  const [Description, SetDescription] = useState<string>("")

  const fetchData = async() => {
    try{
    const response = await fetch('http://localhost:3000/api/task')
    if(response.ok){
        const data = await response.json();
        const users: TaskItem[] = data;
        SetTasks(users);
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
    <div className="min-h-screen w-screen flex justify-center bg-slate-200">
      {/* MODAL */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button className="bg-slate-300 rounded-full h-6 w-6 fixed bottom-5" onClick={() => setIsModalOpen(!isModalOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {/* INDEX */}
      <ul className="flex flex-col gap-4 w-[80%] bg-red-400 rounded-2xl p-4">
        { Tasks.map((Task, index) => (
            <li key={index} className="bg-yellow-200 p-4 rounded-2xl w-7/8 ml-auto mr-auto">
              <div className="flex justify-between">
                <h2 className="font-semibold uppercase">{Task.title}</h2>
                <button onClick={() => handleDelete(Task.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2">{Task.description}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home;