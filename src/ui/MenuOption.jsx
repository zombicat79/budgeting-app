function MenuOption({ children }) {
    return (
        <button className="min-w-2xs py-[1rem] px-[2rem] rounded-xl text-white bg-teal-600 
        hover:bg-teal-400 hover:cursor-pointer hover:translate-x-5 uppercase transition-all">
            {children}
        </button>
    )
}

export default MenuOption;