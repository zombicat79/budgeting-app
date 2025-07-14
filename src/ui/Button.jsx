function Button({ children, margin }) {
    let classes = "py-[1rem] px-[2rem] rounded-xl bg-teal-600 text-white hover:bg-teal-400 hover:cursor-pointer";
    if (margin) classes += ' my-[5rem]'

    return (
        <button className={classes}>
            {children}
        </button>
    )
}

export default Button;