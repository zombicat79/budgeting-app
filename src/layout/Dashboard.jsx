import { Link } from 'react-router';

import MenuOption from '../ui/MenuOption';

function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-y-[1rem]">
                <Link to="/budgets" className="w-fit m-auto">
                    <MenuOption>See all budgets</MenuOption>
                </Link>
                <Link to="/budgets/create" className="w-fit m-auto">
                    <MenuOption>Create new budget</MenuOption>
                </Link>
                <Link className="w-fit m-auto">
                    <MenuOption>Update a budget</MenuOption>
                </Link>
                <Link className="w-fit m-auto">
                    <MenuOption>Delete a budget</MenuOption>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-[1rem] mt-[4rem]">
                <Link className="w-fit m-auto">
                    <MenuOption>Create a new entry</MenuOption>
                </Link>
                <Link className="w-fit m-auto">
                    <MenuOption>Update an entry</MenuOption>
                </Link>
                <Link className="w-fit m-auto">
                    <MenuOption>Delete an entry</MenuOption>
                </Link>
            </div>
        </>
    )
}

export default Dashboard;