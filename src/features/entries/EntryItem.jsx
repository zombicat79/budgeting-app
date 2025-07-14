import { useCallback } from "react";

import { getUrlParams } from "../../utils/navigation/navigation-management";

function EntryItem({ entryData, last }) {
    const params = getUrlParams();
    const { description, inputDate, amount, isExpense } = entryData;

    const buildCSSClasses = useCallback((baseClass) => {
        let classes = baseClass;
        if (isExpense) {
            classes += ' border-red-500 bg-red-100 ml-auto';
        } else {
            classes += ' border-green-600 bg-green-100 mr-auto';
        }
        return classes;
    }, [isExpense]);   

    return (
        <li className={buildCSSClasses('relative border-solid border-2 py-2 px-4 mt-4 w-[70%] sm:w-[50%] max-w-2xl')}>
            {last && params.get('new') === 'true' && 
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-lime-300 py-2 px-4"
                >New!
            </div>
            }
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <div className="flex items-start">
                        <span className="uppercase font-bold">{description}</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span>{inputDate}</span> 
                    </div>
                    <p>{isExpense ? -amount : amount}€</p> 
                </div>
            </div>
        </li>
    );
}

export default EntryItem;