import { DataContext } from "@/context/DataContext";
import { useContext, useState } from "react";

const Nav = () => {
    const { isModalOpen, setIsModalOpen, mobileMenu, setMobileMenu } = useContext(DataContext);
    const [menu, setMenu] = useState<boolean>(false);

    return (
        <nav className="fixed top-[45%] bg-white rounded-xl flex flex-col gap-2 p-2">
            <button className="hover:cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <button className="hover:cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </nav>

    )
}

export default Nav;