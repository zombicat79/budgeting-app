import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function Balance() {
    const { name } = useParams();
    const allBudgets = useSelector((store) => store.budgets);
    console.log(allBudgets)

    let available, income, expenses;
    if (name) {
        for (let budget of allBudgets) {
            if (budget.name === name) {
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
        <>
            <h3 
                className="text-[2.5rem] font-bold"
                title={name ? `Ongoing balance for ${name} budget` : 'Accumulated general balance for all existing budgets'}
            >
                {name ? `${name} account` : 'Master account'}
            </h3>
            <div className="flex justify-between items-center">
                <h3 className="text-[1.5rem] text-emerald-800 font-bold">{income} €</h3>
                <h3 className="text-[2rem] font-bold">{available} €</h3>
                <h3 className="text-[1.5rem] text-red-700 font-bold">{expenses} €</h3>
            </div>
        </>
    )
}

export default Balance;