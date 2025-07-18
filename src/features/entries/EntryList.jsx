import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";

import MessagePanel from "../../ui/MessagePanel";
import Button from './../../ui/Button';
import EntryItem from "./EntryItem";

import { getUrlParams } from "../../utils/navigation/navigation-management";

function EntryList() {
    const { budgetId } = useParams();
    const params = getUrlParams();
    const currentProject = useSelector((state) => state.projects.current.name);
    const entries = useSelector((state) => state.entries[budgetId]);
    let lastEntry = null;
    if (entries) {
        lastEntry = entries[entries.length-1];
    }
    const relevantBudget = useSelector((state) => state.budgets[currentProject].find((el) => {
        if (el.id === budgetId) return el;
    }))

    if (!entries || entries.length === 0) {
        return (
            <div className="relative top-50">
                <p>No entries found</p>
                <p className="mb-[1rem]">Please add a new entry</p>
                <Link to={`/budgets/${budgetId}/create-entry`}>
                    <Button margin={true}>Add</Button>
                </Link>
            </div>
        )
    }

    return (
        <>
            {params.get('new') === 'true' && 
            <MessagePanel messages={[
                { body: 'New entry added with ID: ', data: lastEntry.id }
            ]} />
            }
            
            <ul className="md:max-w-7xl m-auto">
                <li className="border-gray-500 bg-gray-300 border-solid border-2 py-2 px-4 mt-4">
                    <span className="font-bold">Initial budget allowance as of {relevantBudget.startDate}: </span>
                    <span>{relevantBudget.initialBalance}€</span>
                </li>
                {entries.map((entry, index) => {
                    let last = false;
                    if (index === entries.length-1) {
                        last = true;
                    }
                    return <EntryItem key={entry.id} entryData={entry} last={last} />;
                })}
            </ul>
            <Link to={`/budgets/${budgetId}/create-entry`}>
                <Button margin={true}>Add +</Button>
            </Link>
        </>
    );
}

export default EntryList;