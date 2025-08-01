import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.entries ?? {};

const entrySlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        addEntry: (state, action) => {
            if (!state[action.payload.parentBudget]) {
                state[action.payload.parentBudget] = [action.payload.entry];
            } else  {
                state[action.payload.parentBudget].push(action.payload.entry);
            }
        },
        modifyEntry: (state, action) => {
            const modifiedEntryList = state[action.payload.parentBudget].map((el) => {
                if (el.id === action.payload.modifyId ) {
                    return el = action.payload.modifiedEntry;
                } else {
                    return el;
                }
            })
            state[action.payload.parentBudget] = modifiedEntryList;
        },
        deleteEntry: (state, action) => {
            const newEntryList = state[action.payload.parentBudget].filter((el) => {
                return el.id !== action.payload.destroyId;
            })
            state[action.payload.parentBudget] = newEntryList;
        }
    }
})

export const { addEntry, modifyEntry, deleteEntry } = entrySlice.actions;
export default entrySlice.reducer;