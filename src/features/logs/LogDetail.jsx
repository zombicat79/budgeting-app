import { useParams } from "react-router";
import { useSelector } from 'react-redux';

import LogItem from "./LogItem";

function LogDetail() {
    const { projectName } = useParams();
    const projectLogs = useSelector((store) => {
        const allProjects = [store.projects.current, ...store.projects.past];
        const focusProject = allProjects.find((el) => {
            if (el.name === projectName) return el;
        })
        return focusProject.logs;
    });

    return (
        <section title={`A complete listing of all existing records related to the ${projectName.toUpperCase()} money tracking project`}>
            <h3 className="mb-[2rem] font-bold text-[3rem]">{projectName.toUpperCase()} history and action record</h3>
            <ul className="flex flex-col gap-[1rem] m-auto lg:w-[50%]">
            {projectLogs.map((el) => {
                return (
                    <li key={el.id}>
                        <LogItem logData={el} />
                    </li>
                )
            })}
            </ul>
        </section>
    )
}

export default LogDetail;