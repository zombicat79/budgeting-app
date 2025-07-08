import { useCallback } from "react";
import { Link } from 'react-router';

import Button from './../../ui/Button'

function BudgetItem({ budgetData }) {
    const { 
        id, name, entries, intitialBalance, 
        currentBalance, startDate, endDate, 
        expired, outOfBounds 
    } = budgetData;

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

    return (
        <li className={buildCSSClasses("relative border-solid border-2 border-cyan-600 py-2 px-4 mt-4")}>
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="uppercase font-bold">{name}</p>
                    <p>from {startDate} to {endDate}</p> 
                </div>
                <Link to={`/budgets/${name}`}>
                    <Button>See</Button>
                </Link>
            </div>
        </li>
    );
}

export default BudgetItem;