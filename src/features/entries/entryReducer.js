import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    test: [
        {
            name: 'test-expense',
            amount: 100,
            isExpense: true
        }
    ]
}

const entrySlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        addEntry: (state, action) => {
            state[action.payload.budget].push(action.payload.entry);
        }
    }
})

export const { addEntry } = entrySlice.actions;
export default entrySlice.reducer;