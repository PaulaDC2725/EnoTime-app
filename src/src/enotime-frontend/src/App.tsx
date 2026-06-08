import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './modules/auth/presentation/components/Login';
import { Dashboard } from './modules/Dashboard/presentation/components/Dashboard';
import { VacationForm } from './modules/vacations/presentation/components/VacationForm';

import { MainLayout } from './shared/presentation/components/MainLayout';

function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={
          <MainLayout isAdminView={isAdminView}>
            <Dashboard isAdminView={isAdminView} setIsAdminView={setIsAdminView} />
          </MainLayout>
        } />
        
        <Route path="/request" element={
          <MainLayout isAdminView={isAdminView}>
            <div style={{ padding: '2rem 1rem' }}>
              <VacationForm />
            </div>
          </MainLayout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;