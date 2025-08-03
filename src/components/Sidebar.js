import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  LogOut, 
  Activity,
  CreditCard
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAppContext();
  
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Activity },
      { id: 'profile', label: 'Profile', icon: Users }
    ];
    
    if (user.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'payroll', label: 'Payroll', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: FileText }
      ];
    }
    
    if (user.role === 'manager') {
      return [
        ...baseItems,
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'leave-requests', label: 'Leave Requests', icon: Calendar },
        { id: 'loan-requests', label: 'Loan Requests', icon: CreditCard }
      ];
    }
    
    return [
      ...baseItems,
      { id: 'attendance', label: 'Attendance', icon: Clock },
      { id: 'leave', label: 'Apply Leave', icon: Calendar },
      { id: 'loan', label: 'Apply Loan', icon: CreditCard }
    ];
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">PayrollPro</h1>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">{user.name?.charAt(0) || 'U'}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;