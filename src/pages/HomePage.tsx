import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Target, TrendingUp, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" style={{ backgroundColor: '#F0F4FF' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">Career Companion</h1>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Launch your career with clarity.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            The complete platform for students to analyze skills, track applications, 
            and accelerate their job search with data-driven insights.
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Smart Skill Analysis</h3>
            <p className="text-gray-600">Identify skill gaps and get personalized course recommendations</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Application Tracking</h3>
            <p className="text-gray-600">Organize and track your job applications with visual progress boards</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Peer Benchmarking</h3>
            <p className="text-gray-600">Compare your skills and progress with peers in your field</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;