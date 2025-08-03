import React from 'react';
import { DollarSign, Clock, Calendar, CreditCard, FileText } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const EmployeeDashboard = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="This Month Salary"
          value="₹45,000"
          icon={DollarSign}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Days Present"
          value="22/24"
          icon={Clock}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Leaves Left"
          value="8"
          icon={Calendar}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
        <StatCard
          title="Loan Balance"
          value="₹15,000"
          icon={CreditCard}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Attendance Marked</p>
                  <p className="text-sm text-gray-600">Today at 9:15 AM</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Leave Approved</p>
                  <p className="text-sm text-gray-600">Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab('attendance')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
            >
              <Clock className="h-6 w-6" />
              <span className="text-sm font-medium">Mark Attendance</span>
            </button>
            <button 
              onClick={() => setActiveTab('leave')}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm font-medium">Apply Leave</span>
            </button>
            <button 
              onClick={() => setActiveTab('loan')}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
            >
              <CreditCard className="h-6 w-6" />
              <span className="text-sm font-medium">Apply Loan</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <FileText className="h-6 w-6" />
              <span className="text-sm font-medium">View Payslip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;