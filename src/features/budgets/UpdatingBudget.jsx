import { useRef, useEffect, useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';
import { useSelector, useDispatch } from 'react-redux';
import { modifyBudget } from './budgetReducer';
import { updateProject, updateLog } from '../projects/projectReducer';
import { useNavigate } from 'react-router';
import useError from './../../hooks/useError';
import useLog from '../../hooks/useLog';

import Button from '../../ui/Button';

import validate from './../../utils/validation/form-validation';
import { reverseDateFormat } from '../../utils/conversion/string-management';
import { goTop } from '../../utils/layout/scroll-management';
import compareObjects from '../../utils/validation/obj-comparison';

function UpdatingBudget({ budgetData, tools }) {
    const { name, initialBalance, income, expenses, startDate, endDate, entries, id } = budgetData;
    const firstInput = useRef(null);
    const currentProject = useSelector(store => store.projects.current);
    const allBudgets = useSelector(store => store.budgets);
    const { error, msg, handleError } = useError();
    const newLogEntry = useLog('updated', 'budget');
    const { setIsLoading } = useContext(LoaderContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        firstInput.current.focus();
    }, [])

    useEffect(() => {
        dispatch(updateProject({ updateType: 'modification', currentProject, allBudgets }));
    }, [allBudgets])

    async function handleSubmit(event) {
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

        const validation = validate('Budget', 'update', currentBudget, currentProject);
        if (validation.validationError) {
            handleError(true, validation.validationMsg);
            return;
        }
        if (currentBudget.initialBalance > currentProject.availableAllowance) {
            handleError(true, "Budget initial balance cannot be higher than the current project's non-allocated amount.");
            return;
        }

        handleError(false);
        setTimeout(() => {
            setIsLoading((curr) => !curr);
        }, 500);
        goTop();
        setTimeout(() => {
            tools.setUpdating(false);
            setIsLoading((curr) => !curr);
            navigate(`/budgets?updated=true&budgetID=${id}`);
        }, 2500)

        dispatch(modifyBudget({ 
            parentProject: currentProject.name, 
            budget: currentBudget, 
            priorBalance: budgetData.expenses - budgetData.income 
        }))

        // PROJECT LOG UPDATE
        newLogEntry.assetData = currentBudget;
        newLogEntry.assetData.updateDetails = compareObjects(budgetData, currentBudget);
        dispatch(updateLog(newLogEntry));
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