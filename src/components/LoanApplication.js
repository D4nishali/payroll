import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '../services/api';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    loan_type: '',
    amount: '',
    term_months: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const loanData = {
        ...formData,
        amount: parseFloat(formData.amount),
        term_months: parseInt(formData.term_months)
      };
      
      await api.applyLoan(loanData);
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to submit loan application';
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
        <h1 className="text-2xl font-bold text-gray-900">Apply for Loan</h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loan Application Submitted</h2>
            <p className="text-gray-600 mb-6">Your loan request has been submitted and is pending approval.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ loan_type: '', amount: '', term_months: '' });
              }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg"
            >
              Apply for Another Loan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Apply for Loan</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
              <select
                name="loan_type"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.loan_type}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select loan type</option>
                <option value="Personal">Personal Loan</option>
                <option value="Emergency">Emergency Loan</option>
                <option value="Medical">Medical Loan</option>
                <option value="Education">Education Loan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                required
                min="1000"
                max="500000"
                step="1000"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter loan amount"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Term (Months)</label>
              <select
                name="term_months"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.term_months}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select term</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="18">18 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Loan Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;