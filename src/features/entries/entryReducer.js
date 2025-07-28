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
        deleteEntry: (state, action) => {
            const newEntryList = state[action.payload.parentBudget].filter((el) => {
                return el.id !== action.payload.destroyId;
            })
            state[action.payload.parentBudget] = newEntryList;
        }
    }
})

export const { addEntry, deleteEntry } = entrySlice.actions;
export default entrySlice.reducer;