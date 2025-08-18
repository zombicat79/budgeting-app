import { useContext } from 'react';
import { DialogContext } from '../contexts/DialogContext';
import { LoaderContext } from '../contexts/LoaderContext';
import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import useLog from './../hooks/useLog';

import Button from '../ui/Button';
import MenuOption from '../ui/MenuOption';
import DialogBox from '../ui/DialogBox';

function Dashboard() {
    const currentProject = useSelector((store) => store.projects.current);
    const { name } = currentProject;
    const { setDialogShown, setDialogContent } = useContext(DialogContext);
    const { setIsLoading } = useContext(LoaderContext);
    const dispatch = useDispatch();
    // Log project termination enabling
    const newLogEntry = useLog('terminated', 'project')
    newLogEntry.assetData = currentProject;

    function confirmTermination(itemCategory) {
        setDialogContent(DialogBox({
            title: 'Warning', 
            msg: [
                { msgId: 1, body: `You are about to terminate ${name.toUpperCase()} project and all its associated records. All records will still be kept in the logs section.` },
                { msgId: 2, body: 'Are you sure you want to proceed?' }
            ],
            actions: [{ actionId: 1, type: 'regular', text: 'Cancel' }, { actionId: 2, type: 'danger', text: 'Confirm' }],
            tools: { setDialogShown, setIsLoading, dispatch },
            metadata: { itemCategory, removalPayload: newLogEntry }
        }));
        setDialogShown((prev) => !prev);
    }

    if (!currentProject.name) {
        return (
            <section className="max-w-[30rem] m-auto sm:max-w-none">
                <svg className="w-full max-w-[7.5rem] m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z" fill="#fb2c36"></path> </g></svg>
                <div className="text-[1.5rem] sm:text-[2rem] mb-8">
                    <p>Currently you don't have any ongoing money tracking project.</p>
                    <p>Please initialize a new project or visit your logs:</p>
                </div>
                <div className="flex flex-col justify-center items-center sm:flex-row gap-8">
                    <Link to="/start">
                        <Button minWidth={true}>Initialiaze</Button>
                    </Link>
                    <Link to="/logs">
                        <Button minWidth={true}>Project logs</Button>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="grid grid-cols-1 gap-y-[1rem]">
                <Link to='/budgets' className="w-fit m-auto">
                    <MenuOption>See all budgets</MenuOption>
                </Link>
                <Link to="/budgets/create" className="w-fit m-auto">
                    <MenuOption>Create new budget</MenuOption>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-[1rem] mt-[8rem]">
                <div className="w-fit m-auto" onClick={() => confirmTermination('project')}>
                    <MenuOption type="danger">Terminate project</MenuOption>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;