import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload, FileText, Linkedin, CheckCircle, XCircle, TrendingUp, BookOpen } from 'lucide-react';

const SkillGapAnalyzer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'resume' | 'linkedin' | 'manual'>('resume');
  const [selectedJob, setSelectedJob] = useState<null | { title: string; company: string; match: string }>(null);

  const handleAnalyze = () => {
    setAnalysisComplete(true);
  };

  const existingSkills = [
    'JavaScript', 'React', 'HTML/CSS', 'Git', 'Communication', 'Problem Solving'
  ];

  const missingSkills = [
    { skill: 'TypeScript', course: 'TypeScript Fundamentals' },
    { skill: 'Node.js', course: 'Backend Development with Node.js' },
    { skill: 'SQL', course: 'Database Design & SQL' },
    { skill: 'AWS', course: 'Cloud Computing Basics' }
  ];

  const trendingSkills = [
    { skill: 'Next.js', growth: '+45%' },
    { skill: 'GraphQL', growth: '+38%' },
    { skill: 'Docker', growth: '+32%' },
    { skill: 'Kubernetes', growth: '+28%' }
  ];

  const jobRecommendations = [
    { title: 'Frontend Developer', company: 'TechCorp', match: '89%' },
    { title: 'Junior Full Stack Developer', company: 'StartupXYZ', match: '76%' },
    { title: 'React Developer', company: 'WebSolutions', match: '92%' }
  ];

  // Dummy job details
  const jobDetails: Record<string, { description: string; requirements: string[]; salary: string; location: string }> = {
    'Frontend Developer': {
      description: 'Build modern web applications using React and TypeScript. Work with a dynamic team to create user-friendly interfaces.',
      requirements: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      salary: '$80,000 - $100,000',
      location: 'San Francisco, CA',
    },
    'Junior Full Stack Developer': {
      description: 'Join our fast-growing startup to build scalable web applications from frontend to backend.',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express'],
      salary: '$70,000 - $90,000',
      location: 'New York, NY',
    },
    'React Developer': {
      description: 'Develop cutting-edge e-commerce platforms using React and modern JavaScript frameworks.',
      requirements: ['React', 'Redux', 'JavaScript', 'Git'],
      salary: '$75,000 - $95,000',
      location: 'Austin, TX',
    },
  };

  if (analysisComplete) {
    return (
      <Layout role="student">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <button
                onClick={() => setAnalysisComplete(false)}
                className="mb-4 text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                ← Back to Upload
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis Results</h1>
              <p className="text-gray-600">Review your skills analysis and discover opportunities for growth</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Existing Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Skills You Have</h2>
                </div>
                <div className="space-y-2">
                  {existingSkills.map((skill, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Skills to Develop</h2>
                </div>
                <div className="space-y-3">
                  {missingSkills.map((item, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-red-800 font-medium">{item.skill}</span>
                        <BookOpen className="h-4 w-4 text-red-600" />
                      </div>
                      <p className="text-sm text-red-600 mt-1">Suggested: {item.course}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Match Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Match for Frontend Developer</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Technical Skills</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Soft Skills</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Experience Level</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Trending Skills</h2>
                </div>
                <div className="space-y-3">
                  {trendingSkills.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">{item.skill}</span>
                      <span className="text-sm font-bold text-green-600">{item.growth}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Job Recommendations */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Jobs Based on Your Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobRecommendations.map((job, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                    <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">Match: {job.match}</span>
                      <button className="text-blue-600 text-sm hover:underline" onClick={() => setSelectedJob(job)}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Job Details Modal */}
              {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold text-gray-900">{selectedJob.title}</h2>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mb-2 text-gray-700 font-medium">{selectedJob.company}</div>
                    <div className="mb-4 text-sm text-gray-500">{jobDetails[selectedJob.title]?.location} &bull; {jobDetails[selectedJob.title]?.salary}</div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-1">Description</h3>
                      <p className="text-gray-700 text-sm">{jobDetails[selectedJob.title]?.description}</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-1">Requirements</h3>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {jobDetails[selectedJob.title]?.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      role="student"
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analyzer</h1>
            <p className="text-gray-600">Upload your resume or LinkedIn profile to analyze your skills and identify gaps</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Upload Method</h2>
              
              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setUploadMethod('resume')}
                  className={`w-full p-4 rounded-lg border-2 ${
                    uploadMethod === 'resume' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Upload className="h-6 w-6 text-blue-600 mr-3" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Upload Resume</h3>
                      <p className="text-sm text-gray-600">Upload your resume file (PDF, DOC, DOCX)</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUploadMethod('linkedin')}
                  className={`w-full p-4 rounded-lg border-2 ${
                    uploadMethod === 'linkedin' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Linkedin className="h-6 w-6 text-blue-600 mr-3" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Connect LinkedIn</h3>
                      <p className="text-sm text-gray-600">Import your profile from LinkedIn</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUploadMethod('manual')}
                  className={`w-full p-4 rounded-lg border-2 ${
                    uploadMethod === 'manual' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-blue-600 mr-3" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Manual Entry</h3>
                      <p className="text-sm text-gray-600">Enter your skills manually</p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md"
              >
                Analyze My Skills
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkillGapAnalyzer;