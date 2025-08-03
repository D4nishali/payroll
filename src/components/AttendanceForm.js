import React, { useState, useEffect } from 'react';
import { Clock, Check } from 'lucide-react';
import { api } from '../services/api';

const AttendanceForm = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const markAttendance = async () => {
    setLoading(true);
    setError('');
    
    try {
      const timeIn = currentTime.toTimeString().split(' ')[0]; // HH:MM:SS format
      await api.markAttendance(timeIn);
      setAttendanceMarked(true);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to mark attendance';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Time</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-2">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-gray-600 mb-6">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {!attendanceMarked ? (
            <button
              onClick={markAttendance}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Marking Attendance...' : 'Mark Attendance'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">Attendance marked successfully!</p>
              <p className="text-sm text-gray-600">Checked in at {currentTime.toLocaleTimeString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;