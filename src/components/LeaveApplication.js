import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '../services/api';

const LeaveApplication = () => {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.applyLeave(formData);
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to submit leave application';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Apply for Leave</h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Leave Application Submitted</h2>
            <p className="text-gray-600 mb-6">Your leave request has been submitted and is pending approval.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ start_date: '', end_date: '', reason: '' });
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg"
            >
              Apply for Another Leave
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Apply for Leave</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                name="start_date"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.start_date}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="end_date"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.end_date}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea
                name="reason"
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please provide reason for leave..."
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Leave Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;