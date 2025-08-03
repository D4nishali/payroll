import React, { useState, useEffect } from 'react';
import { Users, Calendar, CreditCard, Check, X } from 'lucide-react';
import { api } from '../services/api';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className="text-sm mt-2 text-gray-600">{change}</p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [employeesData, leavesData, loansData] = await Promise.all([
        api.getEmployees(),
        api.getLeaveRequests(),
        api.getLoanRequests()
      ]);
      
      setEmployees(employeesData);
      setPendingLeaves(leavesData.filter(leave => leave.status === 'pending'));
      setPendingLoans(loansData.filter(loan => loan.status === 'pending'));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveApproval = async (leaveId, decision) => {
    try {
      await api.approveLeave(leaveId, decision);
      setPendingLeaves(pendingLeaves.filter(leave => leave.id !== leaveId));
    } catch (error) {
      console.error('Failed to approve leave:', error);
      alert('Failed to approve leave');
    }
  };

  const handleLoanApproval = async (loanId, decision) => {
    try {
      await api.approveLoan(loanId, decision);
      setPendingLoans(pendingLoans.filter(loan => loan.id !== loanId));
    } catch (error) {
      console.error('Failed to approve loan:', error);
      alert('Failed to approve loan');
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
      <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Team Members"
          value={employees.length}
          change="+2 this month"
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Pending Leaves"
          value={pendingLeaves.length}
          icon={Calendar}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
        <StatCard
          title="Pending Loans"
          value={pendingLoans.length}
          icon={CreditCard}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Approvals</h3>
          <div className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending leave requests</p>
            ) : (
              pendingLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-900">{leave.employee?.name || 'Employee'}</p>
                    <p className="text-sm text-gray-600">{leave.start_date} to {leave.end_date}</p>
                    <p className="text-sm text-gray-500">{leave.reason}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleLeaveApproval(leave.id, 'approved')}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleLeaveApproval(leave.id, 'rejected')}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Loan Approvals</h3>
          <div className="space-y-3">
            {pendingLoans.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending loan requests</p>
            ) : (
              pendingLoans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-gray-900">{loan.employee?.name || 'Employee'}</p>
                    <p className="text-sm text-gray-600">₹{loan.amount?.toLocaleString()} - {loan.loan_type}</p>
                    <p className="text-sm text-gray-500">{loan.term_months} months</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleLoanApproval(loan.id, 'approved')}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleLoanApproval(loan.id, 'rejected')}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Attendance Rate</span>
            <span className="font-semibold text-green-600">94.2%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{width: '94.2%'}}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Projects Completed</span>
            <span className="font-semibold text-blue-600">18/20</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;