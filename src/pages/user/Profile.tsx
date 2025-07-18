// User Profile Page: Shows profile info, profile picture, and productivity graph. Allows navigation back to dashboard.
// NOTE: Linter errors below are due to missing type packages or dependencies, not code issues. Ensure all dependencies are installed.
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        onClick={() => navigate(isAdmin ? '/admin' : '/user')}
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
          {/* Resume Upload (User only) */}
          { !isAdmin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">Resume</label>
              <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                <span className="flex-1 text-gray-900">
                  {resumeFile ? resumeFile.name : 'No resume uploaded'}
                </span>
                {resumeFile ? (
                  <button
                    className="ml-2 text-blue-600 hover:underline text-sm flex items-center"
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
                        } else if (
                          resumeFile.name.endsWith('.doc') || resumeFile.name.endsWith('.docx') || resumeFile.type === 'application/msword' || resumeFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        ) {
                          setResumeText('');
                          setIsEditingResume(false);
                          setPdfUrl(null);
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
                  <>
                    <label className="ml-2 text-blue-600 hover:underline text-sm flex items-center cursor-pointer">
                      Upload Resume
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
                  </>
                )}
              </div>
              {/* Only show preview section/modal if showResumeInput is true */}
              {showResumeInput && (
                <div className="mt-2">
                  {resumeEditError && <div className="text-red-600 text-sm mb-2">{resumeEditError}</div>}
                  {isEditingResume && (
                    <>
                      <textarea
                        className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                        rows={8}
                        value={resumeText}
                        readOnly
                      />
                      <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setShowResumeInput(false)}
                      >
                        Close
                      </button>
                    </>
                  )}
                  {pdfUrl && (
                    <div className="mt-4">
                      <iframe src={pdfUrl} title="PDF Preview" className="w-full h-96 border rounded" />
                      <button
                        className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setShowResumeInput(false)}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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
      {/* Only show productivity overview for user, not admin */}
      { !isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Productivity Overview</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#2563EB" name="App Usage (hrs)" />
                <Bar dataKey="jobs" fill="#10B981" name="Jobs Applied" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 