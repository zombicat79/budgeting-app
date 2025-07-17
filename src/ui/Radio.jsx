import { capitaliseFirst } from "../utils/conversion/string-management";

function Radio({ children, last, options, ...props }) {
    let wrapperStyles = "flex flex-col w-full sm:max-w-md";
    if (last) {
        wrapperStyles += " mb-[5rem]"; 
    } else {
        wrapperStyles += " mb-[2rem]";
    }

    return (
        <div className={wrapperStyles}>
            <label className="text-[2rem] text-cyan-700 uppercase">{children}</label>
            <div className="flex justify-center gap-8 mt-[1rem]">
            {options.map((el => {
                return (
                    <div key={el} className="flex items-center gap-2">
                        <label>{capitaliseFirst(el)}</label>
                        <input value={el} {...props} />
                    </div>
                )
            }))}
            </div>
        </div>
    )
}

export default Radio;