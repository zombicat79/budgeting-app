const projectsModel = {
    name: '',
    cashAllowance: 0,
    allocatedAllowance: 0,
    availableAllowance: 0,
    expiryDate: null,
    expired: false,
    attachedBudgets: [],
    logs: []
}

const logsModel = {
    id: 0,
    timestamp: null,
    actionType: '',
    assetType: '',
    assetData: {}
}

export { projectsModel, logsModel };