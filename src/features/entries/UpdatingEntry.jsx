import { useRef, useEffect } from 'react';

import Button from './../../ui/Button';

import { incomeCategories, expenditureCategories } from './../../data/categories';
import { capitaliseFirst, reverseDateFormat } from './../../utils/conversion/string-management';

function UpdatingEntry({ entryData, tools }) {
    const { id, name, description, inputDate, amount, isExpense, category } = entryData;
    const firstInput = useRef(null)

    useEffect(() => {
        firstInput.current.focus();
    }, [])

    function handleSubmit(event) {
        /* event.preventDefault();
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

        const validation = validate('Entry', currentEntry, currentProject, currentBudget, currentEntry.isExpense);
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
            navigate(`/budgets/${budgetId}?updated=true`);
        }, 2500);

        dispatch(addEntry({ parentBudget: budgetId, entry: currentEntry }));
        dispatch(updateBudget({
            updateType: 'addition',
            currentProject: currentProject.name, 
            budgetId, 
            income: currentEntry.isExpense ? 0 : Number(currentEntry.amount), 
            expenses: currentEntry.isExpense ? Number(currentEntry.amount) : 0 
        })); */
    }

    return (
        <li className={tools.buildCSSClasses('relative border-solid border-2 py-2 px-4 mt-4 w-[70%] sm:w-[50%] max-w-2xl animate-pulse')}>
            <form className="flex max-[360px]:flex-col gap-4 max-[360px]:gap-[.5rem] justify-between items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col flex-3 items-start max-[360px]:self-start gap-2">
                    <div className="flex items-start flex-wrap w-full">
                        <div className="flex w-full gap-[1rem] mb-[.5rem]">
                            <span className="uppercase font-bold text-left">{id}. </span>
                            <input ref={firstInput} className="border px-1 flex-1" type="text" name="name" defaultValue={name} />
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
                <div className="flex-1 flex flex-col gap-[1rem]">
                    <div onClick={() => tools.setUpdating(false)}>
                        <Button type="danger" width={'full'}>Cancel</Button>
                    </div>
                    <div>
                        <Button width={'full'}>Proceed</Button>
                    </div>
                </div>
            </form>
        </li>
    );
}

export default UpdatingEntry;