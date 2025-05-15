import { useContext, useEffect, useRef, useState } from "react";
import { TaskItem } from "../../types";
import Modal from "@/components/Modal";
import { DataContext } from "@/context/DataContext";
import { CSSTransition } from 'react-transition-group';
import React from "react";
import NavMobile from "@/components/NavMobile";
import NavDesktop from "@/components/NavDesktop";



const CompletedTasks = () => {
  const { tasks, fetchData, handleDelete, isModalOpen, setIsModalOpen, mobileMenu, handleComplete, subMenu, setSubMenu } = useContext(DataContext);
  const [taskMenuIndex, SetTaskMenuIndex] = useState<number | null>(null);
  const nodeRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const subMenuRef = useRef(null);
  const backdropRef = useRef(null);

  if (nodeRefs.current.length !== tasks.length) {
    // Ensure refs array matches tasks length
    nodeRefs.current = Array(tasks.length)
      .fill(null)
      .map((_, i) => nodeRefs.current[i] || React.createRef<HTMLDivElement>());
  }

  const toggleMenu = (index: number) => {
    SetTaskMenuIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-200">
      <CSSTransition
        in={subMenu}
        timeout={200}
        classNames="backdrop"
        unmountOnExit
        nodeRef={backdropRef}
      >
        <div
          ref={backdropRef}
          onClick={() => setSubMenu(false)}
          className="bg-black h-full w-full z-40 absolute opacity-20"
        ></div>
      </CSSTransition>
      {/* MODAL */}
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* NAV */}
      <NavMobile />
      <CSSTransition
        in={subMenu}
        timeout={200}
        classNames="menu"
        unmountOnExit
        nodeRef={subMenuRef}
      >
        <div ref={subMenuRef} className="fixed bg-white shadow-md p-2 rounded-xl z-40 top-[25rem] left-16">
          <div>
            <ul>
              <li>
                <a href="/" className="uppercase font-medium text-sm">home</a>
              </li>
              <li>
                <a href="/completed" className="uppercase font-medium text-sm">completed</a>
              </li>
            </ul>
          </div>
        </div>
      </CSSTransition>
      <NavDesktop />
      {/* INDEX */}
      <ul className="flex flex-col gap-6 ml-auto mr-auto mt-4">
        { tasks
          .filter(task => task.isCompleted)
          .map((task, index) => (
            <li key={index} className="bg-white drop-shadow-xl p-6 rounded-2xl w-60 h-60 flex flex-col justify-between relative">
              <div>
                <div className="flex justify-between">
                  { task.isCompleted === true &&
                    <h2 className="uppercase font-medium bg-green-400 text-white rounded-md px-2 py-1 text-xs font-[roboto] opacity-70">Completed</h2>
                  }
                  { task.isCompleted === !true &&
                    <h2 className="uppercase font-medium bg-purple-400 text-white rounded-md px-2 py-1 text-xs font-[roboto]">In Progress</h2>
                  }
                  <button onClick={() => toggleMenu(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>
                </div>
                <h1 className="font-bold text-2xl mt-2">{task.title}</h1>
              </div>
              <div>
                <p className="uppercase font-medium text-sm opacity-60">deadline</p>
                <h3 className="font-bold text-xl">{task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}) : "No deadline"}</h3>
              </div>

              <CSSTransition
                in={taskMenuIndex === index}
                timeout={200}
                classNames="menu"
                unmountOnExit
                nodeRef={nodeRefs.current[index]}
              >
                <div ref={nodeRefs.current[index]} className="absolute bg-white left-[15.75rem] top-0 rounded-xl flex flex-col gap-2 p-2">
                  <button className="hover:cursor-pointer" onClick={() => handleDelete(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                  <button className="hover:cursor-pointer" onClick={() => handleComplete(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>
                </div>
              </CSSTransition>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CompletedTasks;