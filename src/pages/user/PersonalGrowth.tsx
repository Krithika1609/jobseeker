import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Calendar, Download, Smile, Frown, Meh, Angry, Heart, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MoodEntry {
  id: string;
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'angry' | 'excited';
  jobTitle: string;
  reflection: string;
}

const PersonalGrowth: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [view, setView] = useState<'timeline' | 'calendar' | 'summary'>('timeline');
  const [showMoodForm, setShowMoodForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      mood: 'happy',
      jobTitle: 'Frontend Developer at TechCorp',
      reflection: 'Had a great interview today! The team seemed really welcoming and I felt confident answering their technical questions.'
    },
    {
      id: '2',
      date: '2024-01-12',
      mood: 'neutral',
      jobTitle: 'React Developer at WebSolutions',
      reflection: 'Applied to another position. Feeling okay about my chances, but the competition seems tough.'
    },
    {
      id: '3',
      date: '2024-01-10',
      mood: 'excited',
      jobTitle: 'Full Stack Developer at StartupXYZ',
      reflection: 'Just submitted my application! Really excited about this startup opportunity. The role seems perfect for my skills.'
    },
    {
      id: '4',
      date: '2024-01-08',
      mood: 'sad',
      jobTitle: 'Software Engineer at BigTech',
      reflection: 'Got rejected from a position I really wanted. Feeling disappointed but trying to stay positive and learn from the feedback.'
    },
    {
      id: '5',
      date: '2024-01-05',
      mood: 'happy',
      jobTitle: 'Junior Developer at CodeCorp',
      reflection: 'Received positive feedback from the hiring manager. They want to schedule a second interview!'
    }
  ]);

  // Mock job applications for dropdown
  const jobApplications = [
    'Frontend Developer at TechCorp',
    'React Developer at WebSolutions',
    'Full Stack Developer at StartupXYZ',
    'Software Engineer at BigTech',
    'Junior Developer at CodeCorp',
    'Backend Developer at DataFlow',
    'UI/UX Designer at CreativeStudio'
  ];

  const moodIcons = {
    happy: { icon: Smile, color: 'text-green-600', bg: 'bg-green-100', emoji: '😊', label: 'Happy' },
    sad: { icon: Frown, color: 'text-blue-600', bg: 'bg-blue-100', emoji: '😢', label: 'Sad' },
    neutral: { icon: Meh, color: 'text-gray-600', bg: 'bg-gray-100', emoji: '😐', label: 'Neutral' },
    angry: { icon: Angry, color: 'text-red-600', bg: 'bg-red-100', emoji: '😠', label: 'Frustrated' },
    excited: { icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100', emoji: '🤩', label: 'Excited' }
  };

  // Generate mood distribution data for pie chart
  const moodDistribution = Object.entries(
    moodEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([mood, count]) => ({
    name: moodIcons[mood as keyof typeof moodIcons].label,
    value: count,
    color: mood === 'happy' ? '#10B981' : 
           mood === 'excited' ? '#EC4899' : 
           mood === 'neutral' ? '#6B7280' : 
           mood === 'sad' ? '#3B82F6' : '#EF4444'
  }));

  // Generate mood trend data for line chart
  const moodTrendData = moodEntries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood === 'happy' ? 5 : 
            entry.mood === 'excited' ? 4 : 
            entry.mood === 'neutral' ? 3 : 
            entry.mood === 'sad' ? 2 : 1,
      moodLabel: moodIcons[entry.mood].label
    }));

  const addMoodEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: formData.get('mood') as MoodEntry['mood'],
      jobTitle: formData.get('jobTitle') as string,
      reflection: formData.get('reflection') as string
    };
    setMoodEntries([newEntry, ...moodEntries]);
    setShowMoodForm(false);
  };

  const downloadReport = () => {
    // Simulate PDF download
    const reportData = {
      totalEntries: moodEntries.length,
      totalApplications: 12, // Mock data from application tracker
      moodDistribution,
      period: 'January 2024'
    };
    
    alert(`Downloading monthly report...\n\nReport Summary:\n- Total mood entries: ${reportData.totalEntries}\n- Total applications: ${reportData.totalApplications}\n- Most common mood: ${moodDistribution[0]?.name || 'N/A'}`);
  };

  return (
    <Layout 
      role="student"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Personal Growth Tracker</h1>
            <p className="text-gray-600">Track your emotional journey through your job search</p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Mood Tracking</h2>
                <p className="text-sm text-gray-600">Log your emotional journey during job search</p>
              </div>
              <button
                onClick={() => setShowMoodForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Mood
              </button>
            </div>
          </div>

                      {/* View Toggle */}
            <div className="mb-6 flex space-x-1 bg-white rounded-lg p-1 shadow-sm w-fit border border-gray-200">
              {['timeline', 'calendar', 'summary'].map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    view === viewType
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </button>
              ))}
            </div>

          {/* Timeline View */}
          {view === 'timeline' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Timeline of Entries</h2>
              {moodEntries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No mood entries yet</h3>
                  <p className="text-gray-600 mb-4">Start tracking your emotional journey by logging your first mood entry</p>
                  <button
                    onClick={() => setShowMoodForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md"
                  >
                    Log Your First Mood
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {moodEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-3 rounded-full ${moodIcons[entry.mood].bg} flex-shrink-0`}>
                        <span className="text-2xl">{moodIcons[entry.mood].emoji}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{entry.jobTitle}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(entry.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{entry.reflection}</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${moodIcons[entry.mood].bg} ${moodIcons[entry.mood].color}`}>
                          {moodIcons[entry.mood].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Calendar View */}
          {view === 'calendar' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Calendar View - January 2024</h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50 rounded">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(2024, 0, i - 6); // January 2024
                  const dateStr = date.toISOString().split('T')[0];
                  const dayEntry = moodEntries.find(entry => entry.date === dateStr);
                  const isCurrentMonth = date.getMonth() === 0;
                  
                  return (
                    <div 
                      key={i} 
                      className={`h-20 border border-gray-200 rounded p-2 hover:bg-gray-50 ${
                        !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                      }`}
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        {date.getDate()}
                      </div>
                      {dayEntry && isCurrentMonth && (
                        <div className="text-center">
                          <span className="text-2xl" title={`${moodIcons[dayEntry.mood].label}: ${dayEntry.jobTitle}`}>
                            {moodIcons[dayEntry.mood].emoji}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Monthly Summary */}
          {view === 'summary' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">January 2024 Summary</h2>
                  <button
                    onClick={downloadReport}
                    className="flex items-center text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                    <div className="text-sm text-gray-600">Total Applications</div>
                    <div className="text-xs text-gray-500 mt-1">From Application Tracker</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">{moodEntries.length}</div>
                    <div className="text-sm text-gray-600">Mood Entries</div>
                    <div className="text-xs text-gray-500 mt-1">Manual logs</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {moodEntries.filter(e => e.mood === 'happy' || e.mood === 'excited').length}
                    </div>
                    <div className="text-sm text-gray-600">Positive Days</div>
                    <div className="text-xs text-gray-500 mt-1">Happy or Excited</div>
                  </div>
                </div>
              </div>

              {/* Mood Distribution Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
                  {moodDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={moodDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {moodDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-2">📊</div>
                      <p>No mood data to display</p>
                    </div>
                  )}
                </div>

                {/* Mood Trend Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trend</h3>
                  {moodTrendData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={moodTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                        <Tooltip 
                          formatter={(value, name) => [
                            moodTrendData.find(d => d.mood === value)?.moodLabel || value, 
                            'Mood'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#2563EB" 
                          strokeWidth={3}
                          dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-2">📈</div>
                      <p>No trend data to display</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AI-Generated Insights */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h3>
                {moodEntries.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                        <p className="font-medium text-blue-800">Positive Trend Detected</p>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Your mood tends to improve after interview experiences, suggesting you're gaining confidence through practice.
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-600 mr-2">💡</span>
                        <p className="font-medium text-yellow-800">Recommendation</p>
                      </div>
                      <p className="text-yellow-700 text-sm">
                        Consider scheduling regular reflection sessions, especially after significant job search events to maintain emotional awareness.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center mb-2">
                        <span className="text-green-600 mr-2">🎯</span>
                        <p className="font-medium text-green-800">Success Pattern</p>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your most positive entries correlate with startup opportunities, suggesting you thrive in dynamic environments.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🤖</div>
                    <p>AI insights will appear after you log more mood entries</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mood Entry Modal */}
      {showMoodForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Log Your Mood</h2>
            <form className="space-y-4" onSubmit={addMoodEntry}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How are you feeling?</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(moodIcons).map(([mood, { emoji, bg, label }]) => (
                    <label key={mood} className="cursor-pointer">
                      <input type="radio" name="mood" value={mood} className="sr-only" required />
                      <div className={`p-3 rounded-lg border-2 border-transparent hover:border-blue-300 ${bg} flex flex-col items-center`}>
                        <span className="text-2xl mb-1">{emoji}</span>
                        <span className="text-xs font-medium text-center">{label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Application</label>
                <select
                  name="jobTitle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a job application</option>
                  {jobApplications.map((job, index) => (
                    <option key={index} value={job}>{job}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reflection</label>
                <textarea
                  name="reflection"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="How did the interview go? What are you feeling about this opportunity? Any insights or lessons learned?"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMoodForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PersonalGrowth;