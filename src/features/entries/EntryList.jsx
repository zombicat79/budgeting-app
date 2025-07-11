import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";

import Button from './../../ui/Button';
import EntryItem from "./EntryItem";

function EntryList() {
    const { budgetId } = useParams();
    const entries = useSelector((state) => state.entries[budgetId]);

    if (!entries || entries.length === 0) {
        return (
            <div className="relative top-50">
                <p>No entries found</p>
                <p className="mb-[1rem]">Please add a new entry</p>
                <Link to={`/budgets/${budgetId}/create-entry`}>
                    <Button>Add</Button>
                </Link>
            </div>
        )
    }

    return (
        <ul className="entry-list">
        {entries.map((entry) => {
            return <EntryItem key={entry.id} entryData={entry} />;
        })}
        </ul>
    );
}

export default EntryList;