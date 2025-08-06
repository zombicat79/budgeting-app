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
        modifyBudget: (state, action) => {
            state[action.payload.parentProject] = state[action.payload.parentProject].map((el) => {
                if (el.id === action.payload.budget.id) {
                    return { 
                        ...el, 
                        name: action.payload.budget.name,
                        initialBalance: action.payload.budget.initialBalance,
                        currentBalance: action.payload.budget.initialBalance - action.payload.priorBalance,
                        startDate: action.payload.budget.startDate,
                        endDate: action.payload.budget.endDate,
                     }
                } else {
                    return el;
                }
            });
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
                    } else if (action.payload.updateType === 'subtraction')  {
                        return {
                            ...el, 
                            entries: el.entries - 1, 
                            income: action.payload.isExpense ? el.income : el.income - action.payload.amount,
                            expenses: action.payload.isExpense ? el.expenses - action.payload.amount : el.expenses,
                            currentBalance: action.payload.isExpense ? el.currentBalance + action.payload.amount : el.currentBalance - action.payload.amount
                        }
                    } else {
                        let newIncome = el.income;
                        let newExpenses = el.expenses;
                        let newBalance = el.currentBalance;
                        if (action.payload.isExpense) {
                            newBalance = el.currentBalance + action.payload.oldAmount - action.payload.newAmount;
                            newExpenses = (el.expenses - action.payload.oldAmount) + action.payload.newAmount;
                        } else {
                            newBalance = (el.currentBalance - action.payload.oldAmount) + action.payload.newAmount;
                            newIncome = (el.income - action.payload.oldAmount) + action.payload.newAmount;
                        }

                        return {
                            ...el, 
                            income: newIncome,
                            expenses: newExpenses,
                            currentBalance: newBalance
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

export const { addBudget, modifyBudget, updateBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;