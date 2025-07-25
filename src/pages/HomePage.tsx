import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Users, CheckCircle, Star, ArrowRight, GraduationCap } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const stats = [
    { number: '50K+', label: 'Jobs Available' },
    { number: '1K+', label: 'Companies' },
    { number: '25K+', label: 'Success Stories' },
    { number: '100+', label: 'Cities' }
  ];

  const featuredJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$80k - $100k',
      logo: '🏢',
      posted: '2 days ago',
      applicants: 45,
      matchScore: 92
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$70k - $90k',
      logo: '🚀',
      posted: '1 day ago',
      applicants: 28,
      matchScore: 88
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'Austin, TX',
      salary: '$75k - $95k',
      logo: '💻',
      posted: '3 days ago',
      applicants: 67,
      matchScore: 85
    }
  ];

  const handleSearch = () => {
    if (jobTitle || location) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Career Companion</h2>
              <p className="text-sm text-gray-500">Find Your Dream Job</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/istockphoto-1349094945-612x612 (1).jpg" 
            alt="Career and Job Search Background" 
            className="w-full h-full object-cover"
          />
        </div>



        {/* Desk Objects */}
        <div className="absolute bottom-24 left-16">
          <div className="w-20 h-16 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200"></div>
        </div>
        <div className="absolute bottom-20 left-12">
          <div className="w-6 h-6 bg-gray-400/80 rounded-full shadow-lg backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-16 right-20">
          <div className="w-10 h-10 bg-blue-200/90 rounded-full shadow-lg backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-12 right-16">
          <div className="w-1 h-8 bg-gray-400/80 rounded-full shadow-lg backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                      <div className="text-center max-w-4xl mx-auto">
              {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Find Your Dream Job
            </h1>
            
            <p className="text-xl md:text-2xl text-black mb-12 max-w-3xl mx-auto">
              Discover thousands of opportunities from top companies on LinkedIn, Naukri, and more.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-purple-200 bg-white rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent placeholder-purple-300 text-purple-900"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-purple-200 bg-white rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent placeholder-purple-300 text-purple-900"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-600 font-semibold text-lg flex items-center justify-center shadow-md"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Jobs
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-blue-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Opportunities you might be missing out on
            </h2>
            <p className="text-xl text-gray-600">
              Top jobs matching your profile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{job.logo}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Star className="h-3 w-3 mr-1" />
                    {job.matchScore}% match
                  </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    <Users className="h-4 w-4 inline mr-1" />
                    {job.applicants} applicants
                  </span>
                  <span className="text-sm text-gray-500">{job.posted}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{job.salary}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 font-semibold text-lg flex items-center mx-auto"
            >
              View All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Career Companion?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to accelerate your job search
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Matching</h3>
              <p className="text-gray-600">AI-powered job matching based on your skills and preferences</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Peer Comparison</h3>
              <p className="text-gray-600">See how your skills compare with others in your field</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600">Monitor your applications and skill development</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-400 to-purple-400">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find your dream job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have already accelerated their career with Career Companion.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 font-semibold text-lg"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
