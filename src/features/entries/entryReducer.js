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
        }
    }
})

export const { addEntry } = entrySlice.actions;
export default entrySlice.reducer;