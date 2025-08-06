import { useState, useContext, useCallback } from "react";
import { DialogContext } from "../../contexts/DialogContext";
import { useDispatch } from "react-redux";

import DialogBox from "../../ui/DialogBox";
import UpdatingEntry from "./UpdatingEntry";

import { getUrlParams } from "../../utils/navigation/navigation-management";

function EntryItem({ entryData, currentProjectName, parentBudget, last }) {
    const params = getUrlParams();
    const [updating, setUpdating] = useState(false);
    const { id, name, description, inputDate, amount, isExpense, category } = entryData;
    const { setDialogContent, setDialogShown } = useContext(DialogContext);
    const dispatch =  useDispatch();

    const buildCSSClasses = useCallback((baseClass) => {
        let classes = baseClass;
        if (isExpense) {
            classes += ' border-red-500 bg-red-100 ml-auto';
        } else {
            classes += ' border-green-600 bg-green-100 mr-auto';
        }
        return classes;
    }, [isExpense]);

    function confirmDeletion(itemCategory) {
        setDialogContent(DialogBox({
            title: 'Warning', 
            msg: [
                { msgId: 1, body: `You are about to delete ${name.toUpperCase()} entry.` },
                { msgId: 2, body: 'Are you sure you want to proceed?' }
            ],
            actions: [{ actionId: 1, type: 'regular', text: 'Cancel' }, { actionId: 2, type: 'danger', text: 'Confirm' }],
            tools: { setDialogShown, dispatch },
            metadata: { itemCategory, id, parentProject: currentProjectName, parentBudget, amount, isExpense }
        }));
        setDialogShown((prev) => !prev);
    }

    if (updating) {
        return <UpdatingEntry entryData={entryData} tools={{ buildCSSClasses, setUpdating }} />
    }

    return (
        <li className={buildCSSClasses('relative border-solid border-2 py-2 px-4 mt-4 w-[70%] sm:w-[50%] max-w-2xl')}>
            {last && params.get('new') === 'true' && 
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-lime-300 py-2 px-4"
                >New!
            </div>
            }
            {params.get('updated') === 'true' && params.get('entryID') === id.toString() &&
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-orange-300 py-2 px-4"
                >Updated!
            </div>
            }
            <div className="flex max-[360px]:flex-col max-[360px]:gap-[.5rem] justify-between items-center">
                <div className="flex flex-col items-start max-[360px]:self-start">
                    <div className="flex items-start flex-wrap">
                        <span className="uppercase font-bold text-left">{id}. {name}</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span className="text-left">{inputDate}</span> 
                    </div>
                    <p className="font-bold italic">{category}</p>
                    <p className="text-left max-w-[40vw] sm:max-w-[95%] md:max-w-none">{description}</p>
                    <p>{isExpense ? -amount : amount}€</p>
                </div>
                <div className="flex justify-between items-center max-[360px]:self-start gap-[1rem]">
                    <div className="hover:cursor-pointer" title="Modify this entry" onClick={() => setUpdating(true)}>
                        <img className="w-[2rem] h-[2rem]" src="/icons/edit_icon.png" alt="edit" />
                    </div>
                    <div className="hover:cursor-pointer" title="Delete this entry" onClick={() => confirmDeletion('entry')}>
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/cross_icon.png" alt="close" />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default EntryItem;