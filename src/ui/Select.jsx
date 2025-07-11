import { capitaliseFirst } from "../utils/conversion/string-management";

function Select({ children, last, categories, ...props }) {
    let wrapperStyles = "flex flex-col w-full sm:max-w-md";
    if (last) {
        wrapperStyles += " mb-[5rem]"; 
    } else {
        wrapperStyles += " mb-[2rem]";
    }

    return (
        <div className={wrapperStyles}>
            <label className="text-[2rem] text-cyan-700 uppercase">{children}</label>
            <select className="border border-solid border-transparent outline-none border-b-cyan-700" {...props}>
            {categories.map((el) => {
                return <option value={el}>{capitaliseFirst(el)}</option>
            })}
            </select>
        </div>
    )
}

export default Select;