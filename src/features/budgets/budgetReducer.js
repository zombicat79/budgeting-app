import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.budgets ?? [];

const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        addBudget: (state, action) => {
            state.push(action.payload);
        },
        updateBudget: (state, action) => {
            state = state.map((el) => {
                console.log(el.id)
                console.log(action.payload.budgetId)
                if (el.id === action.payload.budgetId) {
                    return {
                        ...el, 
                        entries: el.entries + action.payload.entries, 
                        income: el.income + action.payload.income,
                        expenses: el.expenses + action.payload.expenses,
                        currentBalance: el.currentBalance + action.payload.income - action.payload.expenses
                    }
                }

                return el;
            });
            return state
        },
    }
})

export const { addBudget, updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;