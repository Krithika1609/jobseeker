// User Profile Page: Shows profile info, profile picture, and productivity graph. Allows navigation back to dashboard.
// NOTE: Linter errors below are due to missing type packages or dependencies, not code issues. Ensure all dependencies are installed.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowLeft, EyeOff, Edit2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockProfile = {
  name: 'Chinmayi',
  email: 'chinmayi@gmail.com',
  password: 'password123', // For demo only; never store plain passwords in real apps
  profilePic: '',
};

const productivityData = [
  { date: 'Mon', usage: 2, jobs: 1 },
  { date: 'Tue', usage: 3, jobs: 2 },
  { date: 'Wed', usage: 1, jobs: 0 },
  { date: 'Thu', usage: 4, jobs: 3 },
  { date: 'Fri', usage: 2, jobs: 1 },
  { date: 'Sat', usage: 1, jobs: 0 },
  { date: 'Sun', usage: 2, jobs: 1 },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile] = useState(mockProfile);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        onClick={() => navigate('/user')}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>
      <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <span className="flex-1 text-gray-900">{profile.name}</span>
              <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <span className="flex-1 text-gray-900">{profile.email}</span>
              <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <span className="flex-1 text-gray-900">
                {showPassword ? profile.password : '••••••••'}
              </span>
              <button onClick={() => setShowPassword((v) => !v)} className="ml-2">
                <EyeOff className="h-4 w-4 text-gray-400" />
              </button>
              <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-6xl mb-4 overflow-hidden">
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <User className="w-20 h-20" />
            )}
          </div>
          <button className="text-blue-600 hover:underline text-sm">Change Photo</button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Productivity Overview</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productivityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="usage" fill="#8884d8" name="App Usage (hrs)" />
              <Bar yAxisId="right" dataKey="jobs" fill="#82ca9d" name="Jobs Applied" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile; 