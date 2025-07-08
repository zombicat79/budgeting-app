import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.budgets ?? [];

const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        addBudget: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const { addBudget } = budgetSlice.actions;
export default budgetSlice.reducer;