import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projects/projectReducer';
import budgetReducer from '../features/budgets/budgetReducer';
import entryReducer from '../features/entries/entryReducer';

const store = configureStore({
    reducer: {
        projects: projectReducer,
        budgets: budgetReducer,
        entries: entryReducer
    }
})

store.subscribe(() => {
    console.log(store.getState());
    sessionStorage.setItem('store', JSON.stringify(store.getState()));
})

export default store;