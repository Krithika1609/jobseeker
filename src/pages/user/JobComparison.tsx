import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Scale, DollarSign, MapPin, Building, Star, X } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  skills: string[];
  perks: string[];
  matchPercentage: number;
  description: string;
}

const JobComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [showJobSearch, setShowJobSearch] = useState(false);

  const availableJobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$80,000 - $100,000',
      experience: '1-3 years',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
      perks: ['Health Insurance', 'Remote Work', '401k', 'Flexible Hours'],
      matchPercentage: 89,
      description: 'Build modern web applications using React and TypeScript'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$85,000 - $110,000',
      experience: '2-4 years',
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
      perks: ['Equity', 'Health Insurance', 'Learning Budget', 'Snacks'],
      matchPercentage: 76,
      description: 'Work on both frontend and backend of our SaaS platform'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'Austin, TX',
      salary: '$75,000 - $95,000',
      experience: '1-2 years',
      skills: ['React', 'Redux', 'JavaScript', 'Git', 'Webpack'],
      perks: ['Health Insurance', 'Paid Time Off', 'Team Events', 'Remote Work'],
      matchPercentage: 92,
      description: 'Join our team building e-commerce platforms with React'
    }
  ];

  const addJobToComparison = (job: Job) => {
    if (selectedJobs.length < 3 && !selectedJobs.find(j => j.id === job.id)) {
      setSelectedJobs([...selectedJobs, job]);
    }
    setShowJobSearch(false);
  };

  const removeJobFromComparison = (jobId: string) => {
    setSelectedJobs(selectedJobs.filter(job => job.id !== jobId));
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 80) return 'bg-blue-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Comparison Tool</h1>
            <p className="text-gray-600">Compare up to 3 job opportunities side-by-side to make better decisions</p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Selected Jobs</h2>
                <p className="text-sm text-gray-600">Compare up to 3 jobs at once</p>
              </div>
              <button
                onClick={() => setShowJobSearch(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md flex items-center"
                disabled={selectedJobs.length >= 3}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Job ({selectedJobs.length}/3)
              </button>
            </div>
          </div>

          {selectedJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Scale className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start Comparing Jobs</h2>
              <p className="text-gray-600 mb-6">Select jobs from our database or add your own to begin comparison</p>
              <button
                onClick={() => setShowJobSearch(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md"
              >
                Browse Available Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {selectedJobs.map((job, index) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchBgColor(job.matchPercentage)} ${getMatchColor(job.matchPercentage)} mb-2`}>
                          <Star className="h-3 w-3 mr-1" />
                          {job.matchPercentage}% Match
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Building className="h-4 w-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeJobFromComparison(job.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                          <span className="font-medium text-gray-900">Salary</span>
                        </div>
                        <p className="text-gray-700 text-sm">{job.salary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Experience Required</h4>
                        <p className="text-gray-700 text-sm">{job.experience}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Perks & Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.perks.map((perk, perkIndex) => (
                            <span
                              key={perkIndex}
                              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Job Description</h4>
                        <p className="text-gray-700 text-sm">{job.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Job Search Modal */}
          {showJobSearch && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Select Jobs to Compare</h2>
                  <button
                    onClick={() => setShowJobSearch(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {availableJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchBgColor(job.matchPercentage)} ${getMatchColor(job.matchPercentage)} mb-2`}>
                            <Star className="h-3 w-3 mr-1" />
                            {job.matchPercentage}% Match
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-gray-600 text-sm mb-1">{job.company}</p>
                          <p className="text-gray-500 text-sm">{job.location} • {job.salary}</p>
                        </div>
                                                 <button
                           onClick={() => addJobToComparison(job)}
                           disabled={selectedJobs.length >= 3 || selectedJobs.find(j => j.id === job.id) !== undefined}
                           className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                         >
                           {selectedJobs.find(j => j.id === job.id) !== undefined ? 'Added' : 'Add'}
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JobComparison;