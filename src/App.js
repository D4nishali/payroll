import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Profile from './components/Profile';
import UserManagement from './components/UserManagement';
import AttendanceForm from './components/AttendanceForm';
import LeaveApplication from './components/LeaveApplication';
import LoanApplication from './components/LoanApplication';

const AppContent = () => {
  const { user, loading } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'admin') return <AdminDashboard />;
        if (user.role === 'manager') return <ManagerDashboard />;
        return <EmployeeDashboard setActiveTab={setActiveTab} />;
      case 'profile':
        return <Profile />;
      case 'users':
        return user.role === 'admin' ? <UserManagement /> : <div>Access Denied</div>;
      case 'attendance':
        return user.role === 'employee' ? <AttendanceForm /> : <div>Access Denied</div>;
      case 'leave':
        return user.role === 'employee' ? <LeaveApplication /> : <div>Access Denied</div>;
      case 'loan':
        return user.role === 'employee' ? <LoanApplication /> : <div>Access Denied</div>;
      case 'leave-requests':
        return user.role === 'manager' ? <div>Leave Requests (Coming Soon)</div> : <div>Access Denied</div>;
      case 'loan-requests':
        return user.role === 'manager' ? <div>Loan Requests (Coming Soon)</div> : <div>Access Denied</div>;
      case 'employees':
        return user.role === 'manager' ? <div>Employees (Coming Soon)</div> : <div>Access Denied</div>;
      case 'payroll':
        return user.role === 'admin' ? <div>Payroll Management (Coming Soon)</div> : <div>Access Denied</div>;
      case 'reports':
        return user.role === 'admin' ? <div>Reports (Coming Soon)</div> : <div>Access Denied</div>;
      default:
        return <div className="text-center py-8 text-gray-500">Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;