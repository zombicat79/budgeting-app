import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import useError from './../../hooks/useError';

import Button from '../../ui/Button';

import validate from './../../utils/validation/form-validation';
import { reverseDateFormat } from '../../utils/conversion/string-management';

function UpdatingBudget({ budgetData, tools }) {
    const { name, initialBalance, startDate, endDate, entries, id } = budgetData;
    const firstInput = useRef(null);
    const currentProject = useSelector(store => store.projects.current);
    const { error, msg, handleError } = useError();

    useEffect(() => {
        firstInput.current.focus();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const currentBudget = {...budgetData};
        formData.forEach((value, key) => {
            switch(key) {
                case 'name':
                    currentBudget[key] = value.toLowerCase();
                    break;
                case 'initialBalance':
                    currentBudget[key] = Number(value).toFixed(2) * 1;
                    break;
                case 'startDate':
                case 'endDate':
                    const localizedDate = value.split('-').reverse().join('-');
                    currentBudget[key] = localizedDate;
                    break;
                default:
                    currentBudget[key] = value;
            }
        });

        const validation = validate('Budget', currentBudget, currentProject);
        if (validation.validationError) {
            handleError(true, validation.validationMsg);
            return;
        }
        if (currentBudget.initialBalance > currentProject.availableAllowance) {
            handleError(true, "Budget initial balance cannot be higher than the current project's non-allocated amount.");
            return;
        }

        /* handleError(false);
        setTimeout(() => {
            setIsLoading((curr) => !curr);
        }, 500);
        goTop();
        setTimeout(() => {
            setIsLoading((curr) => !curr);
            navigate('/budgets?new=true')
        }, 2500);

        dispatch(addBudget({ parentProject: currentProject.name, budget: currentBudget }));
        dispatch(growProject({ name: currentBudget.name, id: currentBudget.id }));
        dispatch(updateProject({ updateType: 'addition', amount: currentBudget.initialBalance })); */
    }

    return (
        <li className={tools.buildCSSClasses("relative border-solid border-2 border-orange-300 bg-orange-50 py-2 px-4 mt-4 animate-pulse")}>
            <form className="flex flex-1 flex-col sm:flex-row justify-between items-center gap-[1rem]" onSubmit={handleSubmit}>
                <div className="flex flex-1 flex-col items-start self-start">
                    <input ref={firstInput} className="border px-1" type="text" name="name" defaultValue={name} />
                    <p className="text-left">
                        <span className="font-semibold mr-2">tracks</span>
                        <input className="border px-1" type="number" name="initialBalance" defaultValue={initialBalance} />
                        <span className="font-semibold ml-2">€ | </span>
                        <span className="mr-2">from</span>
                        <input className="border px-1" type="date" name="startDate" defaultValue={reverseDateFormat(startDate)} />
                        <span className="mx-2">to</span>
                        <input className="border px-1" type="date" name="endDate" defaultValue={reverseDateFormat(endDate)} />
                        <span> | </span>
                        <span className="font-semibold">{entries === 1 ? 'holding 1 entry' : `holding ${entries} entries`}</span>
                    </p> 
                </div>
                <div className="flex gap-[1rem]">
                    <div onClick={() => tools.setUpdating(false)}>
                        <Button type="danger" width={'full'}>Cancel</Button>
                    </div>
                    <div>
                        <Button width={'full'}>Proceed</Button>
                    </div>
                </div>
            </form>

            {error && <p className="mt-4 mb-2 text-red-900 font-bold">{msg} !!!</p>}
        </li>
    )
}

export default UpdatingBudget;