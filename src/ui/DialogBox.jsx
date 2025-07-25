import { deleteBudget } from "./../features/budgets/budgetReducer";
import { curtailProject, updateProject } from "./../features/projects/projectReducer";

import Button from "./Button"

function DialogBox({ title, msg, actions, tools, metadata }) {
    function handleDismiss() {
        tools.setDialogShown((prev) => !prev);
    }
    
    function handleDelete() {
        tools.setDialogShown((prev) => !prev);
        tools.dispatch(updateProject({ updateType: 'subtraction', amount: metadata.initialBalance }));
        tools.dispatch(curtailProject(metadata.id));
        tools.dispatch(deleteBudget({ currentProjectName: metadata.currentProjectName, budgetId: metadata.id }));
    }

    return (
        <>
            <h3 className="text-[3rem]">{title}</h3>
            <div className="my-[2rem]">
            {msg.map((el) => {
                return <p key={el.msgId}>{el.body}</p>
            })}
            </div>
            <div className="flex flex-row justify-center items-center gap-[1rem]">
            {actions.map((el) => {
                if(el.type === 'danger') return <div key={el.actionId} onClick={handleDelete}><Button type={el.type}>{el.text}</Button></div>

                return <div key={el.actionId} onClick={handleDismiss}><Button>{el.text}</Button></div>
            })}    
            </div>
        </>
    )
}

export default DialogBox