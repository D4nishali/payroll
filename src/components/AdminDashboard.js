import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Plus, 
  Download,
  UserPlus,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { api } from '../services/api';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className={`text-sm mt-2 flex items-center ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {change}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    approvedLoans: 0,
    approvedLeaves: 0,
    monthlyPayroll: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboardSummary();
      setStats({
        totalEmployees: data.total_employees || 0,
        approvedLoans: data.approved_loans || 0,
        approvedLeaves: data.approved_leaves || 0,
        monthlyPayroll: 2340000 // This would come from your backend
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPayroll = async () => {
    try {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentYear = new Date().getFullYear();
      
      const blob = await api.exportPayrollCSV(currentMonth, currentYear);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payroll_${currentMonth}_${currentYear}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export payroll:', error);
      alert('Failed to export payroll data');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleExportPayroll}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-green-600 hover:to-teal-700 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Export Payroll</span>
          </button>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-indigo-600 hover:to-purple-700 transition-all">
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          change="+5.2%"
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Approved Loans"
          value={stats.approvedLoans}
          change="+12.1%"
          icon={CreditCard}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Approved Leaves"
          value={stats.approvedLeaves}
          change="-2.4%"
          icon={Calendar}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
        <StatCard
          title="Monthly Payroll"
          value={`₹${(stats.monthlyPayroll / 100000).toFixed(1)}L`}
          change="+8.7%"
          icon={DollarSign}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New employee added', user: 'John Doe', time: '2 hours ago' },
              { action: 'Leave approved', user: 'Jane Smith', time: '4 hours ago' },
              { action: 'Payroll generated', user: 'System', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Generate Payroll', icon: DollarSign, color: 'from-indigo-500 to-purple-600' },
              { label: 'Export Reports', icon: Download, color: 'from-green-500 to-teal-600' },
              { label: 'Add User', icon: UserPlus, color: 'from-orange-500 to-red-600' },
              { label: 'View Analytics', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
            ].map((action, index) => (
              <button
                key={index}
                className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:scale-105 transition-transform`}
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;