import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addProject } from './projectReducer';
import { LoaderContext } from '../../contexts/LoaderContext';
import useError from './../../hooks/useError';

import Input from '../../ui/Input';
import Button from '../../ui/Button';
import ErrorPanel from '../../ui/ErrorPanel';

import projectsModel from './projectsModel';
import validate from './../../utils/validation/form-validation';
import { goTop } from './../../utils/layout/scroll-management';

function NewProject() {
    const { setIsLoading } = useContext(LoaderContext);
    const { error, msg, handleError } = useError();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newProject = { ...projectsModel };
        formData.forEach((value, key) => {
            switch(key) {
                case 'cashAllowance':
                    newProject[key] = Number(value).toFixed(2) * 1;
                    newProject['availableAllowance'] = Number(value).toFixed(2) * 1;
                    break;
                default:
                    newProject[key] = value;
            }
        });

        const validation = validate('Project', newProject);
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
            navigate('/');
        }, 2500);

        dispatch(addProject(newProject));
    }

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input id="name" type="text" name="name" placeholder="Type in a name for your new project">Name</Input>
            <Input id="cash-allowance" type="number" step="0.01" name="cashAllowance" placeholder="State how much cash you want to track">Amount</Input>
            <Input id="expiry-date" type="date" name="expiryDate" title="Add an end date to your money tracking project">Time Scope</Input>

            {error && <ErrorPanel content={msg} onClosePanel={handleError} />}

            <Button>Initialize</Button>
        </form>
    )
}

export default NewProject;