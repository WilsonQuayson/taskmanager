const Nav = () => {
    return (
        <div className="bg-slate-200 h-14 w-full fixed bottom-0 z-50 p-2 flex justify-center">
            <nav className="bg-slate-300 opacity-50 h-full w-4/5 rounded-2xl">
                <ul className="flex justify-center">
                    <li>
                        <button className="bg-slate-300 rounded-full h-6 w-6 fixed bottom-4 z-50" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;