import React from 'react';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { user } = useAppContext();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{user.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 capitalize">{user.role}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={user.name || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={user.username || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={user.role || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 capitalize"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                value={user.employee_id || 'EMP001'}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={user.phone || '+92-300-1234567'}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={`${user.username}@company.com`}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-6 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
              Edit Profile
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-all">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;