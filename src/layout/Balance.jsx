import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function Balance() {
    const { budgetId } = useParams();
    const allBudgets = useSelector((store) => store.budgets);

    let budgetName, available, income, expenses;
    if (budgetId) {
        for (let budget of allBudgets) {
            if (budget.id === budgetId) {
                budgetName = budget.name;
                available = budget.currentBalance;
                income = budget.income;
                expenses = budget.expenses;
            }
        }
    } else {
        available = allBudgets.reduce((sum, curr) => {
            return sum + curr.currentBalance;
        }, 0);
        income = allBudgets.reduce((sum, curr) => {
            return sum + curr.income;
        }, 0);
        expenses = allBudgets.reduce((sum, curr) => {
            return sum + curr.expenses;
        }, 0);
    }

    return (
        <div>
            <h3 
                className="text-[2.5rem] font-bold"
                title={budgetId ? `Ongoing balance for ${budgetName} budget` : 'Accumulated general balance for all existing budgets'}
            >
                {budgetId ? `${budgetName} budget entries` : 'Master account'}
            </h3>
            <div className="flex justify-between items-center">
                <h3 className="text-[1.5rem] text-emerald-800 font-bold">{income.toFixed(2)} €</h3>
                <h3 className="text-[2rem] font-bold">{available.toFixed(2)} €</h3>
                <h3 className="text-[1.5rem] text-red-700 font-bold">{expenses.toFixed(2)} €</h3>
            </div>
        </div>
    )
}

export default Balance;