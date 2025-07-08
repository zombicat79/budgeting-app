import { useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { addBudget } from "./budgetReducer";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import budgetModel from "./budgetModel";

function NewBudget() {
    const { setIsLoading } = useContext(LoaderContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading((curr) => !curr);
        setTimeout(() => {
            setIsLoading((curr) => !curr);
            navigate('/budgets')
        }, 3000);

        const formData = new FormData(event.target);
        const newBudget = {...budgetModel, id: uuidv4()};
        formData.forEach((value, key) => {
            switch(key) {
                case 'initialBalance':
                    newBudget[key] = Number(value);
                    newBudget['currentBalance'] = Number(value);
                    break;
                default:
                    newBudget[key] = value;
            }
        });

        dispatch(addBudget(newBudget));
    }

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Type in a name for the budget" required >Id</Input>
            <Input type="number" name="initialBalance" placeholder="Assign an initial balance" required >Initial balance</Input>
            <Input type="date" name="startDate" placeholder="Select start date" required >Start date</Input>
            <Input last={true} type="date" name="endDate" required >Start date</Input>

            <Button>Create Budget</Button>
        </form>
    );
}

export default NewBudget;