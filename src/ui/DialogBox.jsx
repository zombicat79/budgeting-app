import { closeProject } from "./../features/projects/projectReducer";
import { updateBudget, deleteBudget } from "./../features/budgets/budgetReducer";
import { curtailProject, updateProject } from "./../features/projects/projectReducer";
import { deleteEntry } from "../features/entries/entryReducer";


import Button from "./Button"

function DialogBox({ title, msg, actions, tools, metadata }) {
    const { itemCategory } = metadata;

    function handleDismiss() {
        tools.setDialogShown((prev) => !prev);
    }
    
    function handleDelete(category) {
        if (category === 'project') {
            tools.setDialogShown((prev) => !prev);
            tools.setIsLoading(true);
            setTimeout(() => {
                tools.setIsLoading(false);
            }, 3000);
            tools.dispatch(closeProject());
        }
        if (category === 'budget') {
            tools.setDialogShown((prev) => !prev);
            tools.dispatch(updateProject({ updateType: 'subtraction', amount: metadata.initialBalance }));
            tools.dispatch(curtailProject(metadata.id));
            tools.dispatch(deleteBudget({ currentProjectName: metadata.currentProjectName, budgetId: metadata.id }));
        }
        if (category === 'entry') {
            tools.setDialogShown((prev) => !prev);
            tools.dispatch(updateBudget({
                updateType: 'subtraction',
                currentProject: metadata.parentProject, 
                budgetId: metadata.parentBudget, 
                isExpense: metadata.isExpense, 
                amount: Number(metadata.amount)
            }));
            tools.dispatch(deleteEntry({ parentBudget: metadata.parentBudget, destroyId: metadata.id }));
        }
    }

    return (
        <>
            <h3 className="text-[3rem]">{title}</h3>
            <div className="flex flex-col gap-4 my-[2rem]">
            {msg.map((el) => {
                return <p key={el.msgId}>{el.body}</p>
            })}
            </div>
            <div className="flex flex-row justify-center items-center gap-[1rem]">
            {actions.map((el) => {
                if(el.type === 'danger') return <div key={el.actionId} onClick={() => handleDelete(itemCategory)}><Button type={el.type}>{el.text}</Button></div>

                return <div key={el.actionId} onClick={handleDismiss}><Button>{el.text}</Button></div>
            })}    
            </div>
        </>
    )
}

export default DialogBox