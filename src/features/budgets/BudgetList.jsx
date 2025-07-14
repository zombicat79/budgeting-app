import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import BudgetItem from './BudgetItem';
import Button from './../../ui/Button'

function BudgetList() {
    const budgetList = useSelector((state) => state.budgets);

    if (!budgetList || budgetList.length === 0) {
        return (
            <div className="relative top-50">
                <p>No budgets found</p>
                <p className="mb-[1rem]">Please create a new budget</p>
                <Link to="/budgets/create">
                    <Button>Create</Button>
                </Link>
            </div>
        )
    }

    return (
        <ul>
        {budgetList.map((budget, index) => {
            let last = false;
            if (index === budgetList.length-1) {
                last = true;
            }
            return <BudgetItem key={budget.id} budgetData={budget} last={last} />
        })}
        </ul>
    );
}

export default BudgetList;