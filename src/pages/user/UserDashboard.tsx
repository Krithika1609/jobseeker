import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import Stats from '../../components/Stats';
import JobFilters from '../../components/JobFilters';
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
  Star,
  Sparkles,
  Target,
  CheckCircle,
  Users as UsersIcon,
  TrendingUp as TrendingUpIcon,
  Briefcase as BriefcaseIcon,
  Brain as BrainIcon
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  const dashboardStats = [
    {
      title: 'Total Applications',
      value: '24',
      change: 12,
      changeType: 'increase' as const,
      icon: <BriefcaseIcon className="h-6 w-6 text-white" />
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      change: 5,
      changeType: 'increase' as const,
      icon: <UsersIcon className="h-6 w-6 text-white" />
    },
    {
      title: 'Skills Improved',
      value: '6',
      change: 2,
      changeType: 'increase' as const,
      icon: <BrainIcon className="h-6 w-6 text-white" />
    },
    {
      title: 'Success Rate',
      value: '85%',
      change: 8,
      changeType: 'increase' as const,
      icon: <TrendingUpIcon className="h-6 w-6 text-white" />
    }
  ];

  const dashboardCards = [
    {
      id: 'skill-gap',
      title: 'Skill Gap Analyzer',
      description: 'Identify missing skills and get personalized course recommendations',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      path: '/user/skill-gap',
      stats: '3 skills to improve',
      progress: 75
    },
    {
      id: 'tracker',
      title: 'Application Tracker',
      description: 'Track your job applications with visual progress boards',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      path: '/user/tracker',
      stats: '12 applications tracked',
      progress: 60
    },
    {
      id: 'job-compare',
      title: 'Job Comparison Tool',
      description: 'Compare job opportunities side-by-side to make better decisions',
      icon: Scale,
      color: 'from-purple-500 to-pink-500',
      path: '/user/job-compare',
      stats: 'Compare up to 3 jobs',
      progress: 90
    },
    {
      id: 'peer-compare',
      title: 'Peer Resume Comparison',
      description: 'See how your skills compare with peers in your field',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      path: '/user/peer-compare',
      stats: '85th percentile',
      progress: 85
    },
    {
      id: 'growth',
      title: 'Personal Growth Tracker',
      description: 'Track your emotional journey through your job search',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500',
      path: '/user/growth',
      stats: '5 mood entries this week',
      progress: 70
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

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
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

  // Render job listings based on view mode
  const renderJobListings = () => {
    if (viewMode === 'list') {
      return (
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="card card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{job.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)} bg-opacity-10`}>
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
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.workType)}`}>
                        {job.workType}
                      </span>
                      <span className="text-sm text-gray-500">
                        <DollarSign className="h-3 w-3 inline mr-1" />
                        {job.salary}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {job.postedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{job.applicants} applicants</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {job.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(job.id)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedJobs.map((job) => (
          <div key={job.id} className="card card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{job.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)} bg-opacity-10`}>
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
                    <span className="text-sm text-gray-500">
                      <DollarSign className="h-3 w-3 inline mr-1" />
                      {job.salary}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{job.postedDate}</span>
                <span>•</span>
                <span>{job.applicants} applicants</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>
              <button
                onClick={() => handleApply(job.id)}
                className="btn-primary text-sm px-4 py-2"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout 
      role="student" 
      viewMode={viewMode}
      onViewModeChange={setViewMode}
    >
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Track your job search progress and discover new opportunities"
        showSearch={true}
        showFilter={true}
        onFilter={handleFilterClick}
        searchPlaceholder="Search jobs, skills, or companies..."
      />

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <Stats stats={dashboardStats} columns={4} />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Chinmayi! 👋</h2>
                <p className="text-gray-600">Here's your job search dashboard. Track your progress and discover new opportunities.</p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">AI Score</div>
                  <div className="text-lg font-semibold text-gray-900">92%</div>
                </div>
              </div>
            </div>
            
            {/* Motivation Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Goal</h3>
                  <p className="text-gray-700 mb-3">"Success is not the key to happiness. Happiness is the key to success."</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>• Apply to 3 new positions</span>
                    <span>• Update your skills profile</span>
                    <span>• Review peer comparisons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Cards - Always Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dashboardCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.id} className="card card-hover cursor-pointer" onClick={() => navigate(card.path)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{card.progress}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{card.stats}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${card.color}`}
                        style={{ width: `${card.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended Jobs</h2>
                <p className="text-gray-600">Jobs tailored to your skills and preferences</p>
              </div>
              <div className="flex items-center gap-4">
                
                <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">Choose City</option>
                  <option value="sanfrancisco">San Francisco</option>
                  <option value="newyork">New York</option>
                  <option value="austin">Austin</option>
                  <option value="seattle">Seattle</option>
                  <option value="boston">Boston</option>
                  <option value="remote">Remote</option>
                </select>

                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
            </div>
            
            {renderJobListings()}
          </div>
        </div>
      </div>

      {/* Job Filters Modal */}
      <JobFilters
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);
        }}
      />
    </Layout>
  );
};

export default UserDashboard;