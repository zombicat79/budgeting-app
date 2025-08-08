import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function Balance() {
    const { budgetId } = useParams();
    const currentProject = useSelector((state) => state.projects.current);
    const relevantBudgets = useSelector((store) => store.budgets[currentProject.name]);

    if (budgetId) {
        let budgetName, initial, income, expenses, available;
        for (let budget in relevantBudgets) {
            if (relevantBudgets[budget].id === budgetId) {
                budgetName = relevantBudgets[budget].name;
                initial = relevantBudgets[budget].initialBalance;
                income = relevantBudgets[budget].income;
                expenses = relevantBudgets[budget].expenses;
                available = relevantBudgets[budget].currentBalance;
            }
        }

        return (
            <div>
                <h3 className="text-[2rem] md:text-[2.5rem] font-bold">
                    <span title='Current budget accounting status'>{`${budgetName.toUpperCase()} budget entries`}</span>
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 
                        className="order-1 md:order-0 text-[1.5rem] text-emerald-800 font-bold md:flex-[1] md:text-left">
                        <span title="Income attained during current budget">{`Income: ${income.toFixed(2)} €`}</span>
                    </h3>
                    <h3 
                        className="order-0 md:order-1 border-b-2 border-t-2 px-4 md:border-none md:p-0 text-[1.5rem] 
                            font-bold md:flex-[1] lg:text-[2rem]">
                        <span
                            className="before:content-['*'] after:content-['*'] before:mr-2 after:ml-2 md:before:hidden md:after:hidden"
                            title="Budget internal accounting state">
                                {`${available.toFixed(2)} € available out of ${initial.toFixed(2)} €`}
                        </span>
                    </h3>
                    <h3 
                        className="order-2 text-[1.5rem] text-red-700 font-bold md:flex-[1] md:text-right">
                        <span title="Expenses incurred during current budget">{`Expenses: ${expenses.toFixed(2)} €`}</span>
                    </h3>
                </div>
            </div>
        );
    } else {
        const { name, cashAllowance, allocatedAllowance, availableAllowance, expiryDate } = currentProject;

        return (
            <div>
                <h3 
                    className="uppercase text-[2.5rem] font-bold">
                    <span title='Current money tracking project'>{name}</span>
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 
                        className="order-1 md:order-0 text-[1.5rem] text-emerald-800 font-bold md:flex-[1] md:text-left">
                        <span title="Money awaiting allocation to 1 or more budgets">{`Non-allocated: ${availableAllowance.toFixed(2)} €`}</span>
                    </h3>
                    <h3 
                        className="order-0 md:order-1 border-b-2 border-t-2 px-4 md:border-none md:p-0 text-[1.5rem] 
                            font-bold md:flex-[1] lg:text-[2rem] before:content-['*'] after:content-['*'] before:mr-2 
                            after:ml-2 md:before:hidden md:after:hidden">
                        <span title="Total amount of money to be tracked">{cashAllowance.toFixed(2)} € </span>
                        <span title="Date of current project's end">up to {expiryDate}</span>
                    </h3>
                    <h3 
                        className="order-2 text-[1.5rem] text-red-700 font-bold md:flex-[1] md:text-right">
                        <span title="Money already allocated to 1 or more budgets">{`Allocated: ${allocatedAllowance.toFixed(2)} €`}</span>
                    </h3>
                </div>
            </div>
        );
    }
}

export default Balance;