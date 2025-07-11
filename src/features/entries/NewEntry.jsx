import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addEntry } from "./entryReducer";
import { updateBudget } from './../budgets/budgetReducer';

import Input from "../../ui/Input";
import Radio from "../../ui/Radio";
import Select from '../../ui/Select';
import Button from "../../ui/Button";

import entriesModel from "./entriesModel";
import { incomeCategories, expenditureCategories } from "./../../data/categories";

function NewEntry() {
    const [categoryList, setCategoryList] = useState(expenditureCategories);
    const dispatch = useDispatch();
    const { budgetId } = useParams();
    const lastEntryId = useSelector((state) => {
        const relevantEntries = state.entries[budgetId];
        return relevantEntries ? relevantEntries[relevantEntries.length-1].id : 0;
    });

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newEntry = { ...entriesModel, id: lastEntryId+1 };
        formData.forEach((value, key) => {
            if (key === 'type') {
                value === 'expense' ? newEntry.isExpense = true : newEntry.isExpense = false;
            } else {
                newEntry[key] = value;
            }
        });

        console.log(newEntry)

        dispatch(addEntry({ parentBudget: budgetId, entry: newEntry }));
        dispatch(updateBudget({ 
            budgetId, 
            entries: 1, 
            income: newEntry.isExpense ? 0 : Number(newEntry.amount), 
            expenses: newEntry.isExpense ? Number(newEntry.amount) : 0 
        }));
    }

    function handleCategories(value) {
        if (value === 'income') {
            setCategoryList(incomeCategories);
        } else {
            setCategoryList(expenditureCategories);
        }
    }

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input type="text" name="description" placeholder="Type in a description for the entry">Description</Input>
            <Input type="number" step="0.0000001" name="amount" placeholder="Type in the entry amount">Amount</Input>
            <Input type="date" name="inputDate" title="Select input date">Date</Input>
            <Radio type="radio" name="type" onChange={(e) => handleCategories(e.target.value)} options={['income', 'expense']}>Type</Radio>
            <Select name="category" categories={categoryList} last={true}>Category</Select>

            <Button>Add New Entry</Button>
        </form>
    )
}

export default NewEntry;