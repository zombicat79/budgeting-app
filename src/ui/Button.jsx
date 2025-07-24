function Button({ children, type, margin, minWidth }) {
    let classes = "py-[1rem] px-[2rem] rounded-xl bg-teal-600 text-white hover:bg-teal-400 hover:cursor-pointer";
    if (margin) classes += ' my-[5rem]';
    if (minWidth) classes += ' min-w-[12rem]';
    if (type) {
        switch(type) {
            case 'alert':
                classes += " bg-orange-400! hover:bg-orange-300!";
                break;
            case 'danger':
                classes += " bg-red-700! hover:bg-red-400!";
                break;
            default:
                return;
        }
    }

    return (
        <button className={classes}>
            {children}
        </button>
    )
}

export default Button;