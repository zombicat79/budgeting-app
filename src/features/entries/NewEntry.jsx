import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addEntry } from "./entryReducer";
import entriesModel from "./entriesModel";

function NewEntry() {
    const dispatch = useDispatch();
    const { name } = useParams();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newEntry = { ...entriesModel };
        formData.forEach((value, key) => {
            newEntry[key] = value;
        });

        dispatch(addEntry({ 'budget': name, 'entry': newEntry }));
        event.target.reset(); // Reset the form after submission
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter name:</label>
            <input type="text" name="name" placeholder="Entry Name" required />

            <label>Amount:</label>
            <input type="number" name="amount" placeholder="Amount" required />

            <label>Expense / Income</label>
            <input type="radio" name="isExpense" />

            <button type="submit">Create Entry</button>
        </form>
    )
}

export default NewEntry;