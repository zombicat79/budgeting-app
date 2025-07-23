import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import MessagePanel from '../../ui/MessagePanel';
import BudgetItem from './BudgetItem';
import Button from './../../ui/Button'

import { getUrlParams } from './../../utils/navigation/navigation-management';

function BudgetList() {
    const params = getUrlParams();
    const currentProject = useSelector((state) => state.projects.current);
    const allBudgetsObj = useSelector((state) => state.budgets);
    const budgetList = allBudgetsObj[currentProject.name];
    const lastBudget = budgetList ? budgetList[budgetList.length-1] : null;

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
        <>
            {params.get('new') === 'true' && 
            <MessagePanel messages={[
                { body: 'New budget added with ID: ', data: lastBudget.id }
            ]} />
            }
            
            <ul>
            {budgetList.map((budget, index) => {
                let last = false;
                if (index === budgetList.length-1) {
                    last = true;
                }
                return <BudgetItem key={budget.id} budgetData={budget} currentProjectName={currentProject.name} last={last} />
            })}
            </ul>
            <Link to={`/budgets/create`}>
                <Button margin={true}>Add +</Button>
            </Link>
        </>
    );
}

export default BudgetList;