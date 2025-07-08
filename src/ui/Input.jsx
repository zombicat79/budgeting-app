function Input({ children, last, ...props }) {
    let wrapperStyles = "flex flex-col w-full sm:max-w-md";
    if (last) {
        wrapperStyles += " mb-[5rem]"; 
    } else {
        wrapperStyles += " mb-[2rem]";
    }

    return (
        <div className={wrapperStyles}>
            <label className="text-[2rem] text-cyan-700 uppercase">{children}</label>
            <input 
                className="border border-solid border-transparent outline-none border-b-cyan-700 placeholder:text-gray-400 focus:py-[1rem] focus:text-[1.75rem] focus:placeholder:text-[1.75rem] transition-all" 
                {...props}
            />
        </div>
    )
}

export default Input;