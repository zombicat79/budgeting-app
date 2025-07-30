function Input({ children, type, last, title, ...props }) {
    let wrapperStyles = "flex flex-col w-full sm:max-w-md";
    if (last) {
        wrapperStyles += " mb-[5rem]"; 
    } else {
        wrapperStyles += " mb-[2rem]";
    }

    if (type === "textarea") {
        return (
            <div className={wrapperStyles}>
                <label htmlFor={props.id} title={title} className="text-[2rem] text-cyan-700 uppercase">{children}</label>
                <textarea
                    id={props.id}
                    className="border border-solid border-transparent outline-none border-b-cyan-700 placeholder:text-gray-400 focus:py-[1rem] focus:text-[1.75rem] focus:placeholder:text-[1.75rem] transition-all" 
                    {...props}
                />
            </div>
        );
    }

    return (
        <div className={wrapperStyles}>
            <label htmlFor={props.id} title={title} className="text-[2rem] text-cyan-700 uppercase">{children}</label>
            <input
                id={props.id}
                type={type}
                title={title} 
                className="border border-solid border-transparent outline-none border-b-cyan-700 placeholder:text-gray-400 focus:py-[1rem] focus:text-[1.75rem] focus:placeholder:text-[1.75rem] transition-all" 
                {...props}
            />
        </div>
    )
}

export default Input;