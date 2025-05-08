import { useContext, useEffect, useState } from "react";
import { TaskItem } from "../../types";
import Modal from "@/components/Modal";
import { DataContext } from "@/context/DataContext";
import Nav from "@/components/Nav";

const Home = () => {
  const { tasks, fetchData, handleDelete } = useContext(DataContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Title, SetTitle] = useState<string>("")
  const [Description, SetDescription] = useState<string>("")

  return (
    <div className="min-h-screen w-screen flex justify-center p-4 bg-slate-200">
      {/* MODAL */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button className="bg-slate-300 rounded-full h-6 w-6 fixed bottom-4 z-50" onClick={() => setIsModalOpen(!isModalOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {/* INDEX */}
      <ul className="flex flex-col gap-6">
        { tasks.map((task, index) => (
            <li key={index} className="bg-white drop-shadow-xl p-4 rounded-2xl w-7/8 ml-auto mr-auto">
              <div className="flex justify-between">
                <h2 className="font-semibold uppercase">{task.title}</h2>
                <button onClick={() => handleDelete(task.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2">{task.description}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home;