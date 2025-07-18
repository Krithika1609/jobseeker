import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  Brain, 
  Briefcase, 
  Scale, 
  Users, 
  TrendingUp, 
  MapPin, 
  Building, 
  ExternalLink, 
  Play, 
  DollarSign,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  skills: string[];
  description: string;
  logo: string;
  postedDate: string;
  applicants: number;
  matchScore: number;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const dashboardCards = [
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      description: 'Identify missing skills and get personalized course recommendations',
      icon: Brain,
      color: 'bg-blue-50 text-blue-600',
      path: '/user/skill-gap',
      stats: '3 skills to improve'
    },
    {
      id: 'tracker',
      title: 'Application Tracker',
      description: 'Track your job applications with visual progress boards',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600',
      path: '/user/tracker',
      stats: '12 applications tracked'
    },
    {
      id: 'job-compare',
      title: 'Job Comparison Tool',
      description: 'Compare job opportunities side-by-side to make better decisions',
      icon: Scale,
      color: 'bg-purple-50 text-purple-600',
      path: '/user/job-compare',
      stats: 'Compare up to 3 jobs'
    },
    {
      id: 'peer-compare',
      title: 'Peer Resume Comparison',
      description: 'See how your skills compare with peers in your field',
      icon: Users,
      color: 'bg-orange-50 text-orange-600',
      path: '/user/peer-compare',
      stats: '85th percentile'
    },
    {
      id: 'growth',
      title: 'Personal Growth Tracker',
      description: 'Track your emotional journey through your job search',
      icon: TrendingUp,
      color: 'bg-pink-50 text-pink-600',
      path: '/user/growth',
      stats: '5 mood entries this week'
    }
  ];

  const recommendedJobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      workType: 'Remote',
      salary: '$80,000 - $100,000',
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      description: 'Build modern web applications using React and TypeScript. Work with a dynamic team to create user-friendly interfaces that serve millions of users worldwide.',
      logo: '🏢',
      postedDate: '2 days ago',
      applicants: 45,
      matchScore: 92
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      workType: 'Hybrid',
      salary: '$70,000 - $90,000',
      skills: ['Node.js', 'React', 'MongoDB', 'Express'],
      description: 'Join our fast-growing startup to build scalable web applications from frontend to backend. Great opportunity for growth and learning.',
      logo: '🚀',
      postedDate: '1 day ago',
      applicants: 28,
      matchScore: 88
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'Austin, TX',
      workType: 'On-site',
      salary: '$75,000 - $95,000',
      skills: ['React', 'Redux', 'JavaScript', 'Git'],
      description: 'Develop cutting-edge e-commerce platforms using React and modern JavaScript frameworks. Work with a collaborative team.',
      logo: '💻',
      postedDate: '3 days ago',
      applicants: 67,
      matchScore: 85
    },
    {
      id: '4',
      title: 'Junior Developer',
      company: 'CodeCorp',
      location: 'Seattle, WA',
      workType: 'Remote',
      salary: '$60,000 - $75,000',
      skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
      description: 'Perfect entry-level position for new graduates. Learn from experienced developers in a supportive environment.',
      logo: '⚡',
      postedDate: '5 days ago',
      applicants: 89,
      matchScore: 78
    },
    {
      id: '5',
      title: 'Software Engineer',
      company: 'InnovateTech',
      location: 'Boston, MA',
      workType: 'Hybrid',
      salary: '$85,000 - $110,000',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      description: 'Work on innovative software solutions that impact millions of users worldwide. Great benefits and growth opportunities.',
      logo: '🔧',
      postedDate: '1 week ago',
      applicants: 34,
      matchScore: 82
    },
    {
      id: '6',
      title: 'Backend Developer',
      company: 'DataFlow',
      location: 'Remote',
      workType: 'Remote',
      salary: '$90,000 - $120,000',
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      description: 'Build robust backend systems and APIs. Work with cutting-edge technologies in a fully remote environment.',
      logo: '🌐',
      postedDate: '4 days ago',
      applicants: 52,
      matchScore: 90
    }
  ];

  const handleApply = (jobId: string) => {
    alert(`Applied to job ${jobId}! This would integrate with the Application Tracker.`);
  };

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case 'Remote': return 'bg-green-100 text-green-800';
      case 'Hybrid': return 'bg-blue-100 text-blue-800';
      case 'On-site': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Chinmayi!</h1>
            <p className="text-gray-600">Here's your job search dashboard. Track your progress and discover new opportunities.</p>
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <span className="italic text-yellow-800 font-medium">“Success is not the key to happiness. Happiness is the key to success.”</span>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={() => navigate(card.path)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${card.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                    <div className="text-xs text-blue-600 font-medium">{card.stats}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recommended Jobs</h2>
              <div className="flex items-center gap-4">
                <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option value="">Choose Field</option>
                  <option value="software">Software</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{job.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                            <Star className="h-3 w-3 mr-1" />
                            {job.matchScore}% match
                          </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="mr-4">{job.company}</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                            {job.workType}
                          </span>
                          <div className="flex items-center text-sm text-green-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.postedDate}
                          </div>
                          <div>{job.applicants} applicants</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleApply(job.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      More about this role
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Role Explainer Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{selectedJob.title}</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Company Info */}
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedJob.logo}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedJob.company}</h3>
                  <div className="flex items-center text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(selectedJob.workType)}`}>
                      {selectedJob.workType}
                    </span>
                  </div>
                  <div className="flex items-center text-green-600 mt-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium">{selectedJob.salary}</span>
                  </div>
                </div>
              </div>

              {/* Job Summary */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Job Summary</h4>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role Explainer Video - Always Present */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Role Explainer Video</h4>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">Watch this video to learn more about the {selectedJob.title} role</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Play Video
                  </button>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">Posted:</span>
                  <div className="font-medium">{selectedJob.postedDate}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Applicants:</span>
                  <div className="font-medium">{selectedJob.applicants}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Match Score:</span>
                  <div className={`font-medium ${getMatchScoreColor(selectedJob.matchScore)}`}>
                    {selectedJob.matchScore}%
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Work Type:</span>
                  <div className="font-medium">{selectedJob.workType}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    handleApply(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    alert('This would show similar roles based on skills and company type');
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Explore Similar Roles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserDashboard;