import { useState, useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { addEntry } from "./entryReducer";
import { updateBudget } from './../budgets/budgetReducer';
import { updateLog } from '../projects/projectReducer';
import useError from './../../hooks/useError';
import useLog from '../../hooks/useLog';

import Input from "../../ui/Input";
import Radio from "../../ui/Radio";
import Select from '../../ui/Select';
import Button from "../../ui/Button";
import ErrorPanel from '../../ui/ErrorPanel';

import entriesModel from "./entriesModel";
import validate from "./../../utils/validation/form-validation";
import { goTop } from '../../utils/layout/scroll-management';
import { incomeCategories, expenditureCategories } from "./../../data/categories";

function NewEntry() {
    const { setIsLoading } = useContext(LoaderContext);
    const [categoryList, setCategoryList] = useState(expenditureCategories);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { budgetId } = useParams();
    const { error, msg, handleError } = useError();
    const newLogEntry = useLog('created', 'entry');
    const currentProject = useSelector((state) => state.projects.current);
    const currentBudget = useSelector((state) => {
        const allBudgets = state.budgets[currentProject.name];
        return allBudgets.find((el) => el.id === budgetId);
    });
    const relevantEntries = useSelector((state) => state.entries[budgetId]);
    const lastEntryId = !relevantEntries || relevantEntries.length === 0 ? 0 : relevantEntries[relevantEntries.length-1].id;

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newEntry = { ...entriesModel, id: lastEntryId+1 };
        formData.forEach((value, key) => {
            switch(key) {
                case 'amount':
                    newEntry[key] = Number(value).toFixed(2) * 1;
                    break;
                case 'inputDate':
                    const localizedDate = value.split('-').reverse().join('-');
                    newEntry[key] = localizedDate;
                    break;
                case 'type':
                    value === 'expense' ? newEntry.isExpense = true : newEntry.isExpense = false;
                    break;
                default:
                    newEntry[key] = value;
            }
        });

        const validation = validate('Entry', 'create', newEntry, currentProject, currentBudget, newEntry.isExpense);
        if (validation.validationError) {
            handleError(true, validation.validationMsg);
            return;
        }

        handleError(false);
        setTimeout(() => {
            setIsLoading((curr) => !curr);
        }, 500);
        goTop();
        setTimeout(() => {
            setIsLoading((curr) => !curr);
            navigate(`/budgets/${budgetId}?new=true`);
        }, 2500);

        dispatch(addEntry({ parentBudget: budgetId, entry: newEntry }));
        dispatch(updateBudget({
            updateType: 'addition',
            currentProject: currentProject.name, 
            budgetId, 
            income: newEntry.isExpense ? 0 : Number(newEntry.amount), 
            expenses: newEntry.isExpense ? Number(newEntry.amount) : 0 
        }));
        newLogEntry.assetData = newEntry;
        dispatch(updateLog(newLogEntry));
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
            <Input id="name" type="text" name="name" placeholder="Type in a short name for the entry">Name</Input>
            <Input id="description" type="textarea" name="description" placeholder="Type in a detailed description for the entry (optional)">Description</Input>
            <Input id="amount" type="number" step="0.01" name="amount" placeholder="Type in the entry amount">Amount</Input>
            <Input id="date" type="date" name="inputDate" title="Select input date">Date</Input>
            <Radio id="entry-type" type="radio" name="type" onChange={(e) => handleCategories(e.target.value)} options={['income', 'expense']}>Type</Radio>
            <Select id="entry-category" name="category" categories={categoryList} last={true}>Category</Select>

            {error && <ErrorPanel content={msg} onClosePanel={handleError} />}

            <Button>Add New Entry</Button>
        </form>
    )
}

export default NewEntry;