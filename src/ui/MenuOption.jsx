function MenuOption({ children, type }) {
    let styles = 'min-w-2xs py-[1rem] px-[2rem] rounded-xl text-white bg-teal-600 hover:bg-teal-400 hover:cursor-pointer hover:translate-x-5 uppercase transition-all';
    if (type) {
        switch(type) {
            case 'danger':
                styles = 'min-w-2xs py-[1rem] px-[2rem] rounded-xl text-white bg-red-400 hover:bg-red-600 hover:cursor-pointer hover:translate-x-5 uppercase transition-all';
                break;
            default:
                break;
        }
    }

    return (
        <button className={styles}>
            {children}
        </button>
    )
}

export default MenuOption;