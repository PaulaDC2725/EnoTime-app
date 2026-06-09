import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Login } from './modules/auth/presentation/components/Login';
import { Dashboard } from './modules/Dashboard/presentation/components/Dashboard';
import { VacationForm } from './modules/vacations/presentation/components/VacationForm';
import { MainLayout } from './shared/presentation/components/MainLayout';
import { UserRoles, type User } from './modules/auth/domain/authTypes';
import { TeamOverview } from './modules/employees/presentation/components/TeamOverview';

function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('enotime_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setCurrentUser(parsedUser);
        setIsAdminView(parsedUser.role === UserRoles.ADMIN);
        return;
      } catch (error) {
        console.error('Invalid stored user session');
      }
    }

    const token = localStorage.getItem('enotime_token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const nextUser: User = {
          email: decoded.email || '',
          role: decoded.role || UserRoles.EMPLOYEE,
          fullName: decoded.fullName || decoded.email || '',
        };
        setCurrentUser(nextUser);
        setIsAdminView(decoded.role === UserRoles.ADMIN);
      } catch (e) {
        console.error('Invalid token session');
        localStorage.removeItem('enotime_token');
        localStorage.removeItem('enotime_user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('enotime_token');
    localStorage.removeItem('enotime_user');
    setIsAdminView(false);
    setCurrentUser(null);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAdminView={setIsAdminView} setCurrentUser={setCurrentUser} />} />

          <Route path="/dashboard" element={
            <MainLayout isAdminView={isAdminView} currentUser={currentUser} onLogout={handleLogout}>
              <Dashboard isAdminView={isAdminView} setIsAdminView={setIsAdminView} currentUser={currentUser} />
            </MainLayout>
          } />

          <Route path="/request" element={
            <MainLayout isAdminView={isAdminView} currentUser={currentUser} onLogout={handleLogout}>
              <div style={{ padding: '2rem 1rem' }}>
                <VacationForm />
              </div>
            </MainLayout>
          } />
          <Route path="/team-overview" element={
            isAdminView ? (
              <MainLayout isAdminView={isAdminView} currentUser={currentUser} onLogout={handleLogout}>
                <TeamOverview />
              </MainLayout>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;