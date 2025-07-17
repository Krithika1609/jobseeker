import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload, Users, TrendingUp, Award, Target, Filter } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PeerData {
  id: string;
  name: string;
  college: string;
  region: string;
  targetRole: string;
  skills: { [key: string]: number };
  overallScore: number;
}

interface UserSkills {
  [key: string]: number;
}

const PeerComparison: React.FC = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    college: 'all',
    region: 'all',
    targetRole: 'all'
  });

  // Mock user skills (extracted from resume)
  const userSkills: UserSkills = {
    'JavaScript': 85,
    'React': 80,
    'HTML/CSS': 90,
    'Git': 75,
    'Communication': 88,
    'Problem Solving': 92,
    'TypeScript': 60,
    'Node.js': 45,
    'SQL': 40,
    'AWS': 30
  };

  // Mock peer data
  const peers: PeerData[] = [
    {
      id: '1',
      name: 'Anonymous Peer 1',
      college: 'Stanford University',
      region: 'California',
      targetRole: 'Frontend Developer',
      skills: {
        'JavaScript': 90,
        'React': 95,
        'HTML/CSS': 85,
        'Git': 88,
        'Communication': 82,
        'Problem Solving': 90,
        'TypeScript': 85,
        'Node.js': 60,
        'SQL': 55,
        'AWS': 45
      },
      overallScore: 82
    },
    {
      id: '2',
      name: 'Anonymous Peer 2',
      college: 'UC Berkeley',
      region: 'California',
      targetRole: 'Frontend Developer',
      skills: {
        'JavaScript': 78,
        'React': 75,
        'HTML/CSS': 95,
        'Git': 80,
        'Communication': 85,
        'Problem Solving': 88,
        'TypeScript': 70,
        'Node.js': 50,
        'SQL': 45,
        'AWS': 35
      },
      overallScore: 75
    },
    {
      id: '3',
      name: 'Anonymous Peer 3',
      college: 'MIT',
      region: 'Massachusetts',
      targetRole: 'Full Stack Developer',
      skills: {
        'JavaScript': 95,
        'React': 88,
        'HTML/CSS': 80,
        'Git': 92,
        'Communication': 78,
        'Problem Solving': 95,
        'TypeScript': 90,
        'Node.js': 85,
        'SQL': 88,
        'AWS': 75
      },
      overallScore: 88
    }
  ];

  const userOverallScore = Math.round(Object.values(userSkills).reduce((a, b) => a + b, 0) / Object.keys(userSkills).length);

  // Filter peers based on selected filters
  const filteredPeers = peers.filter(peer => {
    return (selectedFilters.college === 'all' || peer.college === selectedFilters.college) &&
           (selectedFilters.region === 'all' || peer.region === selectedFilters.region) &&
           (selectedFilters.targetRole === 'all' || peer.targetRole === selectedFilters.targetRole);
  });

  // Calculate percentiles
  const calculatePercentile = (userScore: number, skill: string) => {
    const peerScores = filteredPeers.map(peer => peer.skills[skill] || 0);
    const lowerScores = peerScores.filter(score => score < userScore).length;
    return Math.round((lowerScores / peerScores.length) * 100);
  };

  // Prepare radar chart data
  const radarData = Object.keys(userSkills).slice(0, 8).map(skill => ({
    skill: skill.length > 12 ? skill.substring(0, 12) + '...' : skill,
    user: userSkills[skill],
    average: Math.round(filteredPeers.reduce((sum, peer) => sum + (peer.skills[skill] || 0), 0) / filteredPeers.length),
    top: Math.max(...filteredPeers.map(peer => peer.skills[skill] || 0))
  }));

  // Prepare percentile data
  const percentileData = Object.entries(userSkills).map(([skill, score]) => ({
    skill: skill.length > 15 ? skill.substring(0, 15) + '...' : skill,
    percentile: calculatePercentile(score, skill),
    score: score
  })).sort((a, b) => b.percentile - a.percentile);

  // Get improvement suggestions
  const improvementSuggestions = Object.entries(userSkills)
    .filter(([skill, score]) => {
      const avgPeerScore = filteredPeers.reduce((sum, peer) => sum + (peer.skills[skill] || 0), 0) / filteredPeers.length;
      return score < avgPeerScore - 10;
    })
    .sort(([, scoreA], [, scoreB]) => scoreA - scoreB)
    .slice(0, 5);

  if (!resumeUploaded) {
    return (
      <Layout role="student">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Peer Resume Comparison</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compare Your Skills with Peers</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Upload your resume to see how your skills compare with other students from similar backgrounds. 
                Get personalized recommendations to improve your competitiveness.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
                <p className="text-gray-600 mb-4">Drag and drop your resume here, or click to browse</p>
                <input 
                  type="file" 
                  id="resume-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      // Simulate file processing
                      setTimeout(() => {
                        setResumeUploaded(true);
                      }, 1500);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors relative z-10"
                >
                  Choose File
                </button>
                <p className="text-sm text-gray-500 mt-2">Supports PDF, DOC, DOCX</p>
              </div>

              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">🔒 Privacy Protected</p>
                <p>Your resume is processed securely and anonymously. We only extract skill data for comparison purposes.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Peer Resume Comparison</h1>
              <p className="text-gray-600 mt-1">See how you stack up against similar students</p>
            </div>
            <button
              onClick={() => setResumeUploaded(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upload New Resume
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Peers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <select
                  value={selectedFilters.college}
                  onChange={(e) => setSelectedFilters({...selectedFilters, college: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Colleges</option>
                  <option value="Stanford University">Stanford University</option>
                  <option value="UC Berkeley">UC Berkeley</option>
                  <option value="MIT">MIT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={selectedFilters.region}
                  onChange={(e) => setSelectedFilters({...selectedFilters, region: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Regions</option>
                  <option value="California">California</option>
                  <option value="Massachusetts">Massachusetts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                <select
                  value={selectedFilters.targetRole}
                  onChange={(e) => setSelectedFilters({...selectedFilters, targetRole: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Overall Score Comparison */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Score Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userOverallScore}</div>
                <div className="text-sm text-gray-600">Your Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(filteredPeers.reduce((sum, peer) => sum + peer.overallScore, 0) / filteredPeers.length)}
                </div>
                <div className="text-sm text-gray-600">Peer Average</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.max(...filteredPeers.map(peer => peer.overallScore))}
                </div>
                <div className="text-sm text-gray-600">Top Peer</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {calculatePercentile(userOverallScore, 'overall')}th
                </div>
                <div className="text-sm text-gray-600">Percentile</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Radar Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Radar Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="You" dataKey="user" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Peer Average" dataKey="average" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Top Peer" dataKey="top" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span>You</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                  <span>Peer Average</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                  <span>Top Peer</span>
                </div>
              </div>
            </div>

            {/* Percentile Rankings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Percentile Rankings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={percentileData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}th percentile`, 'Percentile']} />
                  <Bar dataKey="percentile" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Improvement Suggestions</h2>
            </div>
            
            {improvementSuggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {improvementSuggestions.map(([skill, score]) => {
                  const avgPeerScore = Math.round(filteredPeers.reduce((sum, peer) => sum + (peer.skills[skill] || 0), 0) / filteredPeers.length);
                  const gap = avgPeerScore - score;
                  
                  return (
                    <div key={skill} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-red-800">{skill}</h4>
                        <TrendingUp className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-sm text-red-700 mb-2">
                        You: {score}% | Peers: {avgPeerScore}%
                      </p>
                      <p className="text-sm text-red-600">
                        Gap: {gap} points behind average
                      </p>
                      <div className="mt-3">
                        <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Priority: High
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Great job!</h3>
                <p className="text-gray-600">You're performing at or above peer average in all major skills.</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📚 Recommended Learning Resources</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Complete online courses in your weak areas</li>
                <li>• Join coding bootcamps or workshops</li>
                <li>• Contribute to open-source projects</li>
                <li>• Practice with peers through study groups</li>
                <li>• Seek mentorship from industry professionals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PeerComparison;