import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Calendar, Building, MapPin, MoreVertical, Filter, SortAsc, AlertCircle, X, Undo, Eye, Edit, Trash2 } from 'lucide-react';

interface Application {
  id: string;
  title: string;
  company: string;
  location: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  salary?: string;
  jobUrl?: string;
  notes?: string;
}

const ApplicationTracker: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [showUndo, setShowUndo] = useState(false);
  const [lastRejected, setLastRejected] = useState<Application | null>(null);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      dateApplied: '2024-01-15',
      status: 'Applied',
      salary: '$80k - $100k'
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      dateApplied: '2024-01-10',
      status: 'Interview',
      salary: '$70k - $90k'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      location: 'Austin, TX',
      dateApplied: '2024-01-05',
      status: 'Offer',
      salary: '$85k - $110k'
    },
    {
      id: '4',
      title: 'Junior Developer',
      company: 'CodeCorp',
      location: 'Seattle, WA',
      dateApplied: '2024-01-01',
      status: 'Rejected',
      salary: '$60k - $75k'
    },
    {
      id: '5',
      title: 'Software Engineer',
      company: 'InnovateTech',
      location: 'Boston, MA',
      dateApplied: '2024-01-03',
      status: 'Applied',
      salary: '$75k - $95k'
    },
    {
      id: '6',
      title: 'Backend Developer',
      company: 'DataFlow',
      location: 'Remote',
      dateApplied: '2024-01-12',
      status: 'Interview',
      salary: '$90k - $120k'
    },
    {
      id: '7',
      title: 'UI/UX Designer',
      company: 'CreativeStudio',
      location: 'Los Angeles, CA',
      dateApplied: '2024-01-08',
      status: 'Applied',
      salary: '$65k - $85k'
    }
  ]);

  const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected'] as const;
  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800',
    Interview: 'bg-yellow-100 text-yellow-800',
    Offer: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800'
  };

  const companies = Array.from(new Set(applications.map(app => app.company)));

  const markAsRejected = (applicationId: string) => {
    const app = applications.find(a => a.id === applicationId);
    if (app) {
      setLastRejected(app);
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 5000);
      
      setApplications(apps =>
        apps.map(a => a.id === applicationId ? { ...a, status: 'Rejected' as const } : a)
      );
    }
  };

  const updateStatus = (applicationId: string, newStatus: Application['status']) => {
    setApplications(apps =>
      apps.map(app => app.id === applicationId ? { ...app, status: newStatus } : app)
    );
  };

  const deleteApplication = (applicationId: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(apps => apps.filter(app => app.id !== applicationId));
    }
  };

  const undoRejection = () => {
    if (lastRejected) {
      setApplications(apps =>
        apps.map(app =>
          app.id === lastRejected.id ? { ...app, status: 'Applied' as const } : app
        )
      );
      setShowUndo(false);
      setLastRejected(null);
    }
  };

  const isOldApplication = (dateApplied: string) => {
    const daysDiff = Math.floor((Date.now() - new Date(dateApplied).getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff > 7;
  };

  const getFilteredAndSortedApplications = () => {
    let filtered = applications;

    // Apply filters
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    if (filterCompany) {
      filtered = filtered.filter(app => 
        app.company.toLowerCase().includes(filterCompany.toLowerCase())
      );
    }
    if (filterDate !== 'all') {
      const now = new Date();
      const filterDays = parseInt(filterDate);
      filtered = filtered.filter(app => {
        const daysDiff = Math.floor((now.getTime() - new Date(app.dateApplied).getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff <= filterDays;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime());
        break;
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }

    return filtered;
  };

  const addApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newApp: Application = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      salary: formData.get('salary') as string,
      jobUrl: formData.get('jobUrl') as string
    };
    setApplications([...applications, newApp]);
    setShowAddForm(false);
  };

  const filteredApplications = getFilteredAndSortedApplications();

  // Calculate stats
  const stats = {
    Applied: applications.filter(app => app.status === 'Applied').length,
    Interview: applications.filter(app => app.status === 'Interview').length,
    Offer: applications.filter(app => app.status === 'Offer').length,
    Rejected: applications.filter(app => app.status === 'Rejected').length,
  };

  return (
    <Layout role="student">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
              <p className="text-gray-600 mt-1">Track and manage your job applications</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </button>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(stats).map(([status, count]) => (
              <div key={status} className="bg-white p-4 border-b-4 border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                  <div className="text-sm text-gray-600">{status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white p-4 mb-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
              
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>

              <div className="flex items-center space-x-2 ml-auto">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="recent">Recently Applied</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company">Company A-Z</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Building className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or add your first application</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Application
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <div
                    key={app.id}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Left Section - Job Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {app.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{app.company}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{app.location}</span>
                            </div>
                            {app.salary && (
                              <div className="text-sm font-medium text-gray-700 mt-1">
                                {app.salary}
                              </div>
                            )}
                          </div>
                          
                          {/* Status Badge */}
                          <div className="flex-shrink-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>

                        {/* Follow-up reminder for old applications */}
                        {app.status === 'Applied' && isOldApplication(app.dateApplied) && (
                          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center text-orange-700 text-sm">
                              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>No response yet. Follow up?</span>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <button className="text-xs bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors">
                                Send follow-up
                              </button>
                              <button className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors">
                                Snooze
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:flex-shrink-0">
                        {/* Date Applied */}
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(app.dateApplied).toLocaleDateString()}</span>
                        </div>

                        {/* Status Dropdown */}
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value as Application['status'])}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm min-w-[120px]"
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>

                        {/* Mark as Rejected Button */}
                        {app.status !== 'Rejected' && (
                          <button
                            onClick={() => markAsRejected(app.id)}
                            className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                          >
                            Mark as Rejected
                          </button>
                        )}

                        {/* Action Icons */}
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Undo Snackbar */}
      {showUndo && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50">
          <span>Application marked as rejected</span>
          <button
            onClick={undoRejection}
            className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
          >
            <Undo className="h-4 w-4 mr-1" />
            Undo
          </button>
          <button
            onClick={() => setShowUndo(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add Application Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-4">Add New Application</h2>
            <form className="space-y-4" onSubmit={addApplication}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  name="title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  name="company"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  name="salary"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="$70k - $90k"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
                <input
                  name="jobUrl"
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ApplicationTracker;