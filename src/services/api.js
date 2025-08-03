import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Admin endpoints
  getUsers: async () => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  createUser: async (userData) => {
    const response = await apiClient.post('/admin/add-user', userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/admin/delete-user/${userId}`);
    return response.data;
  },

  promoteUser: async (userId) => {
    const response = await apiClient.patch(`/admin/promote/${userId}`);
    return response.data;
  },

  generatePayroll: async (userId, month, year) => {
    const response = await apiClient.post(`/admin/generate-payroll/${userId}`, null, {
      params: { month, year }
    });
    return response.data;
  },

  getPayrollReport: async (month, year) => {
    const response = await apiClient.get('/admin/payroll-report', {
      params: { month, year }
    });
    return response.data;
  },

  exportPayrollCSV: async (month, year) => {
    const response = await apiClient.get('/admin/payroll-export-csv', {
      params: { month, year },
      responseType: 'blob'
    });
    return response.data;
  },

  getDashboardSummary: async () => {
    const response = await apiClient.get('/admin/dashboard-summary');
    return response.data;
  },

  // Manager endpoints
  getEmployees: async () => {
    const response = await apiClient.get('/manager/employees');
    return response.data;
  },

  getEmployeeAttendance: async (employeeId) => {
    const response = await apiClient.get(`/manager/attendance/${employeeId}`);
    return response.data;
  },

  getLeaveRequests: async () => {
    const response = await apiClient.get('/manager/leave-requests');
    return response.data;
  },

  approveLeave: async (leaveId, decision) => {
    const response = await apiClient.patch(`/manager/approve-leave/${leaveId}`, null, {
      params: { decision }
    });
    return response.data;
  },

  getLoanRequests: async () => {
    const response = await apiClient.get('/manager/loan-requests');
    return response.data;
  },

  approveLoan: async (loanId, decision) => {
    const response = await apiClient.patch(`/manager/approve-loan/${loanId}`, null, {
      params: { decision }
    });
    return response.data;
  },

  // Employee endpoints
  getProfile: async () => {
    const response = await apiClient.get('/employee/me');
    return response.data;
  },

  applyLeave: async (leaveData) => {
    const response = await apiClient.post('/employee/apply-leave', leaveData);
    return response.data;
  },

  applyLoan: async (loanData) => {
    const response = await apiClient.post('/employee/apply-loan', loanData);
    return response.data;
  },

  markAttendance: async (timeIn) => {
    const response = await apiClient.post('/employee/mark-attendance', {
      time_in: timeIn
    });
    return response.data;
  },
};