import { useState, useContext, useCallback } from "react";
import { DialogContext } from "../../contexts/DialogContext";
import { useDispatch } from "react-redux";
import { Link } from 'react-router';

import Button from './../../ui/Button'
import DialogBox from "../../ui/DialogBox";
import UpdatingBudget from "./UpdatingBudget";

import { getUrlParams } from './../../utils/navigation/navigation-management';

function BudgetItem({ budgetData, currentProjectName, last }) {
    const [updating, setUpdating] = useState(false);
    const params = getUrlParams();
    const dispatch = useDispatch();
    const { setDialogShown, setDialogContent } = useContext(DialogContext);
    const { id, name, entries, startDate, endDate, expired, outOfBounds, initialBalance } = budgetData;

    const buildCSSClasses = useCallback((baseClass) => {
        let classes = baseClass;
        if (expired) {
            classes += ' disabled';
        }
        if (outOfBounds) {
            classes += ' disallowed';
        }
        return classes;
    }, [expired, outOfBounds]);

    function confirmDeletion(itemCategory) {
        setDialogContent(DialogBox({
            title: 'Warning', 
            msg: [
                { msgId: 1, body: `You are about to delete ${name.toUpperCase()} budget and all its associated entries.` },
                { msgId: 2, body: 'Are you sure you want to proceed?' }
            ],
            actions: [{ actionId: 1, type: 'regular', text: 'Cancel' }, { actionId: 2, type: 'danger', text: 'Confirm' }],
            tools: { setDialogShown, dispatch },
            metadata: { itemCategory, id, currentProjectName, initialBalance }
        }));
        setDialogShown((prev) => !prev);
    }

    if (updating) {
        return <UpdatingBudget budgetData={budgetData} tools={{ buildCSSClasses, setUpdating }} />
    }

    return (
        <li className={buildCSSClasses("relative border-solid border-2 border-cyan-600 py-2 px-4 mt-4")}>
            {last && params.get('new') === 'true' && 
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-lime-300 py-2 px-4"
                >New!
            </div>
            }
            {params.get('updated') === 'true' && params.get('budgetID') === id.toString() &&
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-orange-300 py-2 px-4"
                >Updated!
            </div>
            }
            <div className="flex flex-row max-[360px]:flex-col justify-between items-center gap-[1rem]">
                <div className="flex flex-1 flex-col items-start self-start">
                    <p className="uppercase font-bold">{name}</p>
                    <p className="text-left">
                        <span className="font-semibold">tracks {initialBalance}€ | </span>
                        <span>from {startDate} to {endDate}</span>
                        <span> | </span>
                        <span className="font-semibold">{entries === 1 ? 'holding 1 entry' : `holding ${entries} entries`}</span>
                    </p> 
                </div>
                <div className="flex justify-between items-center max-[360px]:self-start gap-[1rem]">
                    <div className="hidden sm:block">
                        <Link to={`/budgets/${id}`}>
                            <Button>See</Button>
                        </Link>
                    </div>
                    <div className="sm:hidden">
                        <Link to={`/budgets/${id}`}>
                            <img className="w-[2rem] h-[2rem]" src="/icons/eye_icon.png" alt="see" />
                        </Link>
                    </div>
                    <div className="hidden sm:block" onClick={() => setUpdating(true)}>
                        <Button type="alert">Update</Button>
                    </div>
                    <div className="sm:hidden" onClick={() => setUpdating(true)}>
                        <img className="w-[2rem] h-[2rem]" src="/icons/edit_icon.png" alt="edit" />
                    </div>
                    <div className="hidden sm:block" onClick={() => confirmDeletion('budget')}>
                        <Button type="danger">Delete</Button>
                    </div>
                    <div className="sm:hidden" onClick={() => confirmDeletion('budget')}>
                        <img className="w-[1.5rem] h-[1.5rem]" src="/icons/cross_icon.png" alt="close" />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default BudgetItem;