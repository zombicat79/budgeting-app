import { capitaliseFirst } from './../../utils/conversion/string-management'; 

function LogItem({ logData }) {
    let containerClasses = "flex border p-[1rem]"

    let identifierClasses = "basis-[10%] border-2 bg-gray-500";
    switch(logData.assetType) {
        case "budget":
            identifierClasses += " text-teal-500 border-teal-500"
            containerClasses += " w-[90%]"
            break;
        case "entry":
            identifierClasses += " text-orange-800 border-orange-800"
            containerClasses += " w-[80%]"
            break;
        default:
            // case "project"
            identifierClasses += " text-yellow-300 border-yellow-300"
    }

    return (
        <div className={containerClasses}>
            <div className={identifierClasses}>
                {logData.assetType === 'project' ? 'P' : logData.assetType === 'budget' ? 'B' : 'E'}
            </div>
            <div className="flex-1">
                <p>
                    operation #{logData.id} &rarr;&nbsp;
                    {capitaliseFirst(logData.assetType)} {logData.actionType}
                    &nbsp;@&nbsp;
                    {logData.timestamp}
                </p>
            </div>
        </div>
    )
}

export default LogItem;