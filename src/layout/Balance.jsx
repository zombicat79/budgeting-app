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

        /* available = relevantBudgets.reduce((sum, curr) => {
            return sum + curr.currentBalance;
        }, 0);
        income = relevantBudgets.reduce((sum, curr) => {
            return sum + curr.income;
        }, 0);
        expenses = relevantBudgets.reduce((sum, curr) => {
            return sum + curr.expenses;
        }, 0); */

        return (
            <div>
                <h3 className="text-[2.5rem] font-bold">
                    <span title='Current budget accounting status'>{`${budgetName.toUpperCase()} budget entries`}</span>
                </h3>
                <div className="flex justify-between items-center">
                    <h3 className="text-[1.5rem] text-emerald-800 font-bold">{income.toFixed(2)} €</h3>
                    <h3 className="text-[2rem] font-bold">{available.toFixed(2)} / {initial.toFixed(2)} €</h3>
                    <h3 className="text-[1.5rem] text-red-700 font-bold">{expenses.toFixed(2)} €</h3>
                </div>
            </div>
        );
    } else {
        const { name, cashAllowance, allocatedAllowance, availableAllowance } = currentProject;

        return (
            <div>
                <h3 
                    className="text-[2.5rem] font-bold">
                    <span title='Current money tracking project'>{name}</span>
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 
                        className="text-[1.5rem] text-emerald-800 font-bold md:flex-[1] md:text-left">
                        <span title="Money awaiting allocation to budget">{`Non-allocated: ${availableAllowance.toFixed(2)} €`}</span>
                    </h3>
                    <h3 
                        className="hidden md:block text-[2rem] font-bold md:flex-[1]">
                        <span title="Total amount of money to be tracked">{cashAllowance.toFixed(2)} €</span>
                    </h3>
                    <h3 
                        className="text-[1.5rem] text-red-700 font-bold md:flex-[1] md:text-right">
                        <span title="Money already allocated to 1 or more budgets">{`Allocated: ${allocatedAllowance.toFixed(2)} €`}</span>
                    </h3>
                </div>
            </div>
        );
    }
}

export default Balance;