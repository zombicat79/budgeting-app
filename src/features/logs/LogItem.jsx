import { useState } from 'react';
import { capitaliseFirst } from './../../utils/conversion/string-management'; 

function LogItem({ logData }) {
    const [expanded, setExpanded] = useState(false);

    let containerClasses = "flex flex-col border px-[1rem] py-[0.5rem] gap-2 hover:cursor-pointer hover:border-teal-500 hover:animate-pulse"
    let identifierClasses = "flex justify-center items-center basis-[10%] border-2 bg-gray-500";
    let operationDetails;
    
    switch(logData.assetType) {
        case "budget":
            identifierClasses += " text-teal-500 border-teal-500"
            containerClasses += " w-[90%]"
            switch(logData.actionType) {
                case "created":
                    operationDetails = 
                    <>
                        <span className="font-semibold">* Created with ID: </span><span>{logData.assetData.id}</span><br/>
                        <span className="font-semibold">* Budget named as: </span><span>{logData.assetData.name.toUpperCase()}</span><br/>
                        <span className="font-semibold">* Allocated an amount of: </span><span>{logData.assetData.initialBalance} €</span><br/>
                        <span className="font-semibold">* Set to cover period: </span><span>{logData.assetData.startDate} to {logData.assetData.endDate}</span>
                    </>
                    break;
                default:
            }
            break;
        case "entry":
            identifierClasses += " text-orange-800 border-orange-800"
            containerClasses += " w-[80%]"
            break;
        default:
            // case "project"
            identifierClasses += " text-yellow-300 border-yellow-300"
            switch(logData.actionType) {
                case "created":
                    operationDetails = 
                    <>
                    <span className="font-semibold">* Total amount of money to be tracked: </span><span>{logData.assetData.cashAllowance} €</span>
                    </>
                    break;
                default:
            }
    }

    console.log(logData)

    return (
        <div className={containerClasses} onClick={() => setExpanded((prev) => !prev)}>
            <div className="flex gap-8">
                <div className={identifierClasses}>
                    {logData.assetType === 'project' ? 'P' : logData.assetType === 'budget' ? 'B' : 'E'}
                </div>
                <div className="flex-1">
                    <p className="text-left">
                        <span className="font-semibold">operation #{logData.id} &rarr;&nbsp;</span>
                        {capitaliseFirst(logData.assetType)} {logData.actionType}
                        &nbsp;@&nbsp;
                        {logData.timestamp}
                    </p>
                </div>
                {expanded ? <p className="text-3xl">&uarr;</p> : <p className="text-3xl">&darr;</p>}
            </div>
            {expanded && <p className="text-left">{operationDetails}</p>}
        </div>
    )
}

export default LogItem;