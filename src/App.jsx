import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { LoaderProvider } from './contexts/LoaderContext';

import IntroPage from './pages/IntroPage';
import MainLayout from './layout/MainLayout';
import Dashboard from './layout/Dashboard';
import BudgetList from './features/budgets/BudgetList';
import EntryList from './features/entries/EntryList';
import NewBudget from './features/budgets/NewBudget';
import NewEntry from './features/entries/NewEntry';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <LoaderProvider>
      <Routes>
        <Route path="/" element={isStarted ? <MainLayout /> : <IntroPage onStart={handleStart} />} >
          <Route index element={<Dashboard />} />
          <Route path="budgets" >
            <Route index element={<BudgetList />} />
            <Route path="create" element={<NewBudget />} />
            <Route path=":budgetId" element={<EntryList />} />
            <Route path=":budgetId/create-entry" element={<NewEntry />} />
          </Route>
        </Route>
      </Routes>
    </LoaderProvider>
  )
}

export default App
