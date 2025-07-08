import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../features/budgets/budgetReducer';
import entryReducer from '../features/entries/entryReducer';

const store = configureStore({
    reducer: {
        budgets: budgetReducer,
        entries: entryReducer
    }
})

store.subscribe(() => {
    console.log(store.getState());
    sessionStorage.setItem('store', JSON.stringify(store.getState()));
})

export default store;