// User Profile Page: Shows profile info, profile picture, and productivity graph. Allows navigation back to dashboard.
// NOTE: Linter errors below are due to missing type packages or dependencies, not code issues. Ensure all dependencies are installed.
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, ArrowLeft, EyeOff, Edit2, Camera, Settings, Shield, Bell, Download, Upload } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Layout from '../../components/Layout';

const mockProfile = {
  name: 'Chinmayi',
  email: 'chinmayi@gmail.com',
  password: 'password123', // For demo only; never store plain passwords in real apps
  profilePic: '',
  role: 'Software Engineer',
  location: 'San Francisco, CA',
  experience: '2 years',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  bio: 'Passionate software engineer with experience in full-stack development and cloud technologies.'
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const location = useLocation();
  const [profile] = useState(mockProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showResumeInput, setShowResumeInput] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resumeEditError, setResumeEditError] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Clean up PDF object URL
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // Determine if this is the admin profile page
  const isAdmin = location.pathname.startsWith('/admin');

  const ProfileContent: React.FC = () => (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit Profile
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <span className="flex-1 text-gray-900">{profile.name}</span>
                      <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <span className="flex-1 text-gray-900">{profile.email}</span>
                      <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <span className="flex-1 text-gray-900">{profile.role}</span>
                      <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <span className="flex-1 text-gray-900">{profile.location}</span>
                      <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                    <span className="flex-1 text-gray-900">
                      {showPassword ? profile.password : '••••••••'}
                    </span>
                    <button 
                      onClick={() => setShowPassword((v) => !v)} 
                      className="ml-2 p-1 rounded hover:bg-gray-200"
                    >
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    </button>
                    <Edit2 className="h-4 w-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                    <p className="text-gray-900">{profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload (User only) */}
            {!isAdmin && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Resume</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Update Resume
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Download className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {resumeFile ? resumeFile.name : 'No resume uploaded'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {resumeFile ? 'PDF • Updated 2 days ago' : 'Upload your resume to get started'}
                        </div>
                      </div>
                    </div>
                    {resumeFile ? (
                      <button
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        onClick={async () => {
                          setShowResumeInput(true);
                          setResumeEditError('');
                          setPdfUrl(null);
                          if (resumeFile) {
                            if (resumeFile.type.startsWith('text')) {
                              const text = await resumeFile.text();
                              setResumeText(text);
                              setIsEditingResume(true);
                              setPdfUrl(null);
                            } else if (resumeFile.type === 'application/pdf') {
                              setIsEditingResume(false);
                              const url = URL.createObjectURL(resumeFile);
                              setPdfUrl(url);
                              setResumeEditError('');
                            } else {
                              setResumeText('');
                              setIsEditingResume(false);
                              setResumeEditError('');
                              setPdfUrl(null);
                            }
                          }
                        }}
                      >
                        Preview
                      </button>
                    ) : (
                      <label className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                        <Upload className="h-4 w-4 inline mr-1" />
                        Upload
                        <input
                          type="file"
                          accept=".txt,.pdf,.doc,.docx"
                          className="hidden"
                          onChange={async e => {
                            if (e.target.files && e.target.files[0]) {
                              setResumeFile(e.target.files[0]);
                              setResumeEditError('Resume uploaded successfully!');
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  
                  {/* Preview Section */}
                  {showResumeInput && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      {resumeEditError && <div className="text-green-600 text-sm mb-2">{resumeEditError}</div>}
                      {isEditingResume && (
                        <>
                          <textarea
                            className="w-full border border-gray-300 rounded-xl p-3 mb-3 bg-white"
                            rows={8}
                            value={resumeText}
                            readOnly
                          />
                          <button
                            className="btn-secondary text-sm px-4 py-2"
                            onClick={() => setShowResumeInput(false)}
                          >
                            Close
                          </button>
                        </>
                      )}
                      {pdfUrl && (
                        <div className="mt-4">
                          <iframe src={pdfUrl} title="PDF Preview" className="w-full h-96 border rounded-xl" />
                          <button
                            className="mt-3 btn-secondary text-sm px-4 py-2"
                            onClick={() => setShowResumeInput(false)}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Productivity Overview (User only) */}
            {!isAdmin && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Productivity Overview</h2>
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productivityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="usage" fill="#3B82F6" name="App Usage (hrs)" />
                      <Bar dataKey="jobs" fill="#10B981" name="Jobs Applied" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="card text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {profile.profilePic ? (
                    <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    profile.name.charAt(0)
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-blue-500">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
              <p className="text-gray-600 mb-4">{profile.role}</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Change Photo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{profile.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Interviews</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Skills</span>
                  <span className="font-medium">{profile.skills.length}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isAdmin ? (
            <Layout 
          role="admin"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        >
      <ProfileContent />
    </Layout>
  ) : (
            <Layout 
          role="student"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        >
      <ProfileContent />
    </Layout>
  );
};

export default Profile; 