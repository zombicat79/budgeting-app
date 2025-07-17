import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.budgets ?? {};

const budgetSlice = createSlice({
    name: 'budgets',
    initialState,
    reducers: {
        addBudget: (state, action) => {
            if (!state[action.payload.parentProject]) {
                state[action.payload.parentProject] = [action.payload.budget];
            } else  {
                state[action.payload.parentProject].push(action.payload.budget);
            }
        },
        updateBudget: (state, action) => {
            state[action.payload.currentProject] = state[action.payload.currentProject].map((el) => {
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