import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';
import { LoaderProvider } from './contexts/LoaderContext';
import { closeProject } from './features/projects/projectReducer';

import IntroPage from './pages/IntroPage';
import Start from './pages/Start';
import Logs from './pages/Logs';

import MainLayout from './layout/MainLayout';
import Dashboard from './layout/Dashboard';
import BudgetList from './features/budgets/BudgetList';
import EntryList from './features/entries/EntryList';
import NewBudget from './features/budgets/NewBudget';
import NewEntry from './features/entries/NewEntry';

import { validateSingleDate } from './utils/validation/form-validation';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const currentProject = useSelector((store) => store.projects.current);
  const dispatch = useDispatch();

  const handleStart = () => {
    setIsStarted(true);
  };

  useEffect(() => {
    if (currentProject.id) {
      const dateValidationResult = validateSingleDate(currentProject.expiryDate);
      if (!dateValidationResult.status) {
        dispatch(closeProject());
      }
    }
  }, [currentProject]);

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
          <Route path="logs" element={<Logs />} />
          <Route path="start" element={<Start />} />
        </Route>
      </Routes>
    </LoaderProvider>
  )
}

export default App
