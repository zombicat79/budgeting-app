import Button from './../../ui/Button';

function UpdatingEntry({ entryData, tools }) {
    const { id, name, description, inputDate, amount, isExpense, category } = entryData;

    return (
        <li className={tools.buildCSSClasses('relative border-solid border-2 py-2 px-4 mt-4 w-[70%] sm:w-[50%] max-w-2xl animate-pulse')}>
            <form className="flex max-[360px]:flex-col max-[360px]:gap-[.5rem] justify-between items-center">
                <div className="flex flex-col flex-3 items-start max-[360px]:self-start">
                    <div className="flex items-start flex-wrap">
                        <input className="border-b" type="text" value={name} />
                        <span>&nbsp;|&nbsp;</span>
                        <input type="date" value={inputDate} />
                    </div>      
                    <select>
                        <option>polla</option>
                    </select>
                    <textarea value={description}></textarea>
                    <input type="number" value={isExpense ? -amount : amount} />
                </div>
                <div className="flex-1">
                    <div onClick={() => tools.setUpdating(false)}>
                        <Button type="danger">Cancel</Button>
                    </div>
                    <Button>Proceed</Button>
                </div>
            </form>
        </li>
    );
}

export default UpdatingEntry;