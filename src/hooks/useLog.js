import { useSelector } from 'react-redux';

import { logsModel } from '../features/projects/projectsModel';

function useLog(actionType, assetType) {
    const logs = useSelector(store => store.projects.current.logs);
    const lastLogId = logs ? logs[logs.length-1].id + 1 : 0;
    
    const newLogEntry = {...logsModel};
    newLogEntry.id = lastLogId;
    newLogEntry.timestamp = new Date().toISOString();
    newLogEntry.actionType = actionType;
    newLogEntry.assetType = assetType;

    return newLogEntry;
}

export default useLog;