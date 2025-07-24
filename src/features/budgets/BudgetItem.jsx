import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteBudget } from "./budgetReducer";
import { curtailProject, updateProject } from "../projects/projectReducer";
import { Link } from 'react-router';

import Button from './../../ui/Button'

import { getUrlParams } from './../../utils/navigation/navigation-management';

function BudgetItem({ budgetData, currentProjectName, last }) {
    const params = getUrlParams();
    const dispatch = useDispatch();
    const { id, name, startDate, endDate, expired, outOfBounds, initialBalance } = budgetData;

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

    function handleDelete() {
        console.log('delete request!')
        dispatch(updateProject({ updateType: 'subtraction', amount: initialBalance }));
        dispatch(curtailProject(id));
        dispatch(deleteBudget({ currentProjectName, budgetId: id }));
    }

    return (
        <li className={buildCSSClasses("relative border-solid border-2 border-cyan-600 py-2 px-4 mt-4")}>
            {last && params.get('new') === 'true' && 
            <div className="absolute -top-4 left-[50%] -translate-x-[50%] bg-lime-300 py-2 px-4"
                >New!
            </div>
            }
            <div className="flex flex-col sm:flex-row justify-between items-center gap-[1rem]">
                <div className="flex flex-col items-start self-start">
                    <p className="uppercase font-bold">{name}</p>
                    <p>from {startDate} to {endDate}</p> 
                </div>
                <div className="flex justify-between items-center gap-[1rem]">
                    <Link to={`/budgets/${id}`}>
                        <Button>See</Button>
                    </Link>
                    <Button type="alert">Update</Button>
                    <div onClick={handleDelete}>
                        <Button type="danger">Delete</Button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default BudgetItem;