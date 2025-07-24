import { useRef, useEffect } from 'react';

import { capitaliseFirst } from "../utils/conversion/string-management";

function Radio({ children, last, options, ...props }) {
    const inputRef = useRef();
    
    useEffect(() => {
        if (inputRef.current.value === 'expense') {
            inputRef.current.checked = true;
        }
    }, [])

    let wrapperStyles = "flex flex-col w-full sm:max-w-md";
    if (last) {
        wrapperStyles += " mb-[5rem]"; 
    } else {
        wrapperStyles += " mb-[2rem]";
    }

    return (
        <div className={wrapperStyles}>
            <label className="text-[2rem] text-cyan-700 uppercase">{children}</label>
            <fieldset id={props.name} className="flex justify-center gap-8 mt-[1rem]">
            {options.map((el => {
                return (
                    <label key={el} className="flex items-center gap-2">
                        <span>{capitaliseFirst(el)}</span>
                        <input ref={inputRef} value={el} {...props} />
                    </label>
                )
            }))}
            </fieldset>
        </div>
    )
}

export default Radio;