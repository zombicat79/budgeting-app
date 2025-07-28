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
                    if (action.payload.updateType === 'addition') {
                        return {
                            ...el, 
                            entries: el.entries + 1, 
                            income: el.income + action.payload.income,
                            expenses: el.expenses + action.payload.expenses,
                            currentBalance: el.currentBalance + action.payload.income - action.payload.expenses
                        }
                    } else  {
                        return {
                            ...el, 
                            entries: el.entries - 1, 
                            income: action.payload.isExpense ? el.income : el.income - action.payload.amount,
                            expenses: action.payload.isExpense ? el.expenses - action.payload.amount : el.expenses,
                            currentBalance: action.payload.isExpense ? el.currentBalance + action.payload.amount : el.currentBalance - action.payload.amount
                        }
                    }
                }

                return el;
            });
            return state
        },
        deleteBudget: (state, action) => {
            const newState = state[action.payload.currentProjectName].filter((budget) => {
                return budget.id !== action.payload.budgetId;
            });
            state[action.payload.currentProjectName] = newState;
        }
    }
})

export const { addBudget, updateBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;