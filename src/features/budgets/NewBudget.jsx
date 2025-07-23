import { useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { addBudget } from "./budgetReducer";
import { buildProject, updateProject } from '../projects/projectReducer';
import useError from './../../hooks/useError';

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ErrorPanel from '../../ui/ErrorPanel';

import budgetModel from "./budgetModel";
import validate from '../../utils/validation/form-validation';
import { goTop } from '../../utils/layout/scroll-management';

function NewBudget() {
    const { setIsLoading } = useContext(LoaderContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, msg, handleError } = useError();
    const currentProject = useSelector((store) => store.projects.current);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newBudget = {...budgetModel, id: currentProject.name + '-' + uuidv4()};
        formData.forEach((value, key) => {
            switch(key) {
                case 'name':
                    newBudget[key] = value.toLowerCase();
                    break;
                case 'initialBalance':
                    newBudget[key] = Number(value).toFixed(2) * 1;
                    newBudget['currentBalance'] = Number(value).toFixed(2) * 1;
                    break;
                case 'startDate':
                case 'endDate':
                    const localizedDate = value.split('-').reverse().join('-');
                    newBudget[key] = localizedDate;
                    break;
                default:
                    newBudget[key] = value;
            }
        });

        const validation = validate('Budget', newBudget, currentProject);
        if (validation.validationError) {
            handleError(true, validation.validationMsg);
            return;
        }
        if (newBudget.initialBalance > currentProject.availableAllowance) {
            handleError(true, "Budget initial balance cannot be higher than the current project's non-allocated amount.");
            return;
        }

        handleError(false);
        setTimeout(() => {
            setIsLoading((curr) => !curr);
        }, 500);
        goTop();
        setTimeout(() => {
            setIsLoading((curr) => !curr);
            navigate('/budgets?new=true')
        }, 2500);

        dispatch(addBudget({ parentProject: currentProject.name, budget: newBudget }));
        dispatch(buildProject({ name: newBudget.name, id: newBudget.id }));
        dispatch(updateProject(newBudget.initialBalance));
    }

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Type in a name for the budget">Name</Input>
            <Input type="number" step="0.01" name="initialBalance" placeholder="Assign an initial balance">Initial balance</Input>
            <Input type="date" name="startDate" placeholder="Select start date">Start date</Input>
            <Input last={true} type="date" name="endDate">End date</Input>

            {error && <ErrorPanel content={msg} onClosePanel={handleError} />}

            <Button>Create Budget</Button>
        </form>
    );
}

export default NewBudget;