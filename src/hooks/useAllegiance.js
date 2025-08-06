import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function useAllegiance() {
    const { budgetId } = useParams();
    const currentProject = useSelector((state) => state.projects.current);
    const currentBudget = useSelector((state) => {
        const allBudgets = state.budgets[currentProject.name];
        return allBudgets.find((el) => el.id === budgetId);
    });

    return { currentProject, currentBudget };
}

export default useAllegiance;