import { useSelector } from "react-redux";
import { Link } from 'react-router';

import Button from "../ui/Button";

function Logs() {
    const currentProject = useSelector((store) => store.projects.current);
    const pastProjects = useSelector((store) => store.projects.past);

    let gridClasses = 'grid grid-cols-2 max-[360px]:grid-cols-1 auto-rows-min gap-[2rem]'
    switch(true) {
        case pastProjects.length === 1:
            gridClasses += ' grid-cols-1 sm:grid-cols-1';
            break;
        case pastProjects.length === 2:
            gridClasses += ' sm:grid-cols-2';
            break;
        case pastProjects.length > 2:
            gridClasses += ' sm:grid-cols-3';
            break;
        default:
            break;
    }

    if (currentProject.logs?.length === 0 && pastProjects.length === 0) {
        return (
            <section className="max-w-[30rem] m-auto sm:max-w-none">
                <svg className="w-full max-w-[7.5rem] m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z" fill="#fb2c36"></path> </g></svg>
                <div className="text-[1.5rem] sm:text-[2rem] mb-8">
                    <p>No money tracking projects found in the registry.</p>
                </div>
            </section>
        );
    };

    return (
        <section className="flex flex-col gap-[4rem]">
            {currentProject.logs?.length > 0 && 
            <div className="mx-auto">
                <h2 className="mb-4 text-[1.75rem] font-semibold">Current Project Logs</h2>
                <Link>
                    <Button type="alert" width='full'>{currentProject.name}</Button>
                </Link>
            </div>
            }
            
            {pastProjects.length > 0 && 
            <div className="mx-auto">
                <h2 className="mb-4 text-[1.75rem] font-semibold">Terminated Projects Logs</h2>
                <ul className={gridClasses}>
                    {pastProjects.map((el) => {
                        return (
                            <Link>
                                <Button width='full'>{el.name}</Button>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            }
        </section>
    );
}

export default Logs;