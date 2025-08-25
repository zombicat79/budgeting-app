import { useRef, useEffect, useContext } from 'react';
import { LoaderContext } from '../../contexts/LoaderContext';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { modifyEntry } from './entryReducer';
import { updateLog } from '../projects/projectReducer';
import { updateBudget } from '../budgets/budgetReducer';
import useAllegiance from '../../hooks/useAllegiance';
import useError from '../../hooks/useError';
import useLog from '../../hooks/useLog';

import Button from './../../ui/Button';

import { incomeCategories, expenditureCategories } from './../../data/categories';
import validate from './../../utils/validation/form-validation';
import { capitaliseFirst, reverseDateFormat } from './../../utils/conversion/string-management';
import { goTop } from '../../utils/layout/scroll-management';
import compareObjects from '../../utils/validation/obj-comparison';

function UpdatingEntry({ entryData, tools }) {
    const { setIsLoading } = useContext(LoaderContext);
    const { currentProject, currentBudget } = useAllegiance();
    const { id, name, description, inputDate, amount, isExpense, category } = entryData;
    const { error, msg, handleError } = useError();
    const newLogEntry = useLog('updated', 'entry');
    const firstInput = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        firstInput.current.focus();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const currentEntry = { ...entryData };
        formData.forEach((value, key) => {
            switch(key) {
                case 'amount':
                    currentEntry[key] = Number(value).toFixed(2) * 1;
                    break;
                case 'inputDate':
                    const localizedDate = value.split('-').reverse().join('-');
                    currentEntry[key] = localizedDate;
                    break;
                default:
                    currentEntry[key] = value;
            }
        });

        const validation = validate('Entry', 'update', currentEntry, currentProject, currentBudget, currentEntry.isExpense);
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
            tools.setUpdating(false);
            setIsLoading((curr) => !curr);
            navigate(`/budgets/${currentBudget.id}?updated=true&entryID=${id}`);
        }, 2500);

        dispatch(modifyEntry({ parentBudget: currentBudget.id, modifyId: id, modifiedEntry: currentEntry }))
        dispatch(updateBudget({
            updateType: 'modification',
            currentProject: currentProject.name, 
            budgetId: currentBudget.id, 
            isExpense,
            oldAmount: amount, 
            newAmount: Number(currentEntry.amount) 
        }));

        // PROJECT LOG UPDATE
        newLogEntry.assetData = { 
            ...currentEntry,
            parentBudget: { id: currentBudget.id, name: currentBudget.name },
            updateDetails: compareObjects(entryData, currentEntry)
        };
        dispatch(updateLog(newLogEntry));
    }

    return (
        <li className={tools.buildCSSClasses('relative border-solid border-2 py-2 px-4 mt-4 w-[70%] sm:w-[50%] max-w-2xl animate-pulse')}>
            <form className="flex flex-col sm:flex-row gap-4 max-[360px]:gap-[1rem] justify-between items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col flex-3 items-start w-full max-[360px]:self-start gap-2">
                    <div className="flex items-start flex-wrap w-full">
                        <div className="flex flex-wrap w-full gap-[1rem] mb-[.5rem]">
                            <span className="uppercase font-bold text-left">{id}. </span>
                            <input ref={firstInput} className="border px-1 flex-1 max-[360px]:w-full" type="text" name="name" defaultValue={name} />
                        </div>
                        <select className="border px-1 w-full" name="category">
                            {isExpense
                            ? expenditureCategories.map((el) => <option key={el} value={el}>{capitaliseFirst(el)}</option>)
                            : incomeCategories.map((el) => <option key={el} value={el}>{capitaliseFirst(el)}</option>)
                            }
                        </select>
                    </div>      
                    <textarea className="border px-1 w-full" name="description" defaultValue={description}></textarea>
                    <input className="border px-1 w-full" type="date" name="inputDate" defaultValue={reverseDateFormat(inputDate)} />
                    <input className="border px-1 w-full" type="number" name="amount" defaultValue={amount} />
                </div>
                <div className="flex-1 flex flex-row max-[360px]:flex-col sm:flex-col gap-[1rem]">
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
    );
}

export default UpdatingEntry;