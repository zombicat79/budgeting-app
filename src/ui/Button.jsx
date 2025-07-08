function Button({ children }) {
    return (
        <button className="py-[1rem] px-[2rem] rounded-xl bg-teal-600 
        text-white hover:bg-teal-400 hover:cursor-pointer">
            {children}
        </button>
    )
}

export default Button;