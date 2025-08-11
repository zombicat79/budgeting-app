import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.projects ?? { current: {}, past: [] };

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.current = action.payload;
        },
        updateProject: (state, action) => {
            if (action.payload.updateType === 'addition') {
                state.current.allocatedAllowance += action.payload.amount;
                state.current.availableAllowance -= action.payload.amount;
            } else if (action.payload.updateType === 'modification') {
                const totalAllocation = action.payload.allBudgets[action.payload.currentProject.name].reduce((acc, el) => {
                    return acc + el.initialBalance;
                }, 0);
                state.current.allocatedAllowance = totalAllocation;
                state.current.availableAllowance = state.current.cashAllowance - totalAllocation;
            } else {
                state.current.allocatedAllowance -= action.payload.amount;
                state.current.availableAllowance += action.payload.amount;
            }
        },
        updateLog: (state, action) => {
            if (action.payload.assetData.logs?.length > 0) {
                state.past.forEach((el) => {
                    if (el.name === action.payload.assetData.name) {
                        el.logs.push(action.payload)
                    }
                });
            } else {
                state.current.logs.push(action.payload);
            }
        },
        growProject: (state, action) => {
            state.current.attachedBudgets.push(action.payload);
        },
        curtailProject: (state, action) => {
            const updatedAttachedBudgets = state.current.attachedBudgets.filter((budget) => {
                return budget.id !== action.payload;
            });
            state.current.attachedBudgets = updatedAttachedBudgets;
        },
        closeProject: (state, action) => {
            state.past.push(state.current);
            state.current = {};
        }
    }
})

export const { addProject, updateProject, updateLog, growProject, curtailProject, closeProject } = projectSlice.actions;
export default projectSlice.reducer;