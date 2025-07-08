import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";

import Button from './../../ui/Button';
import EntryItem from "./EntryItem";

function EntryList() {
    const { name } = useParams();
    const entries = useSelector((state) => state.entries[name]);

    if (!entries || entries.length === 0) {
        return (
            <div>
                <p>No entries found</p>
                <p className="mb-[1rem]">Please create a new entry</p>
                <Link to={`/budgets/${name}/create-entry`}>
                    <Button>Create</Button>
                </Link>
            </div>
        )
    }

    return (
        <ul className="entry-list">
        {entries.map((entry) => {
            return <EntryItem key={entry.name} entryData={entry} />;
        })}
        </ul>
    );
}

export default EntryList;