import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Calendar, Building, MapPin, MoreVertical, AlertCircle, X, DollarSign } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [filterDate] = useState<string>('all');
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

  const getNextStatus = (currentStatus: Application['status']) => {
    const currentIndex = statusOptions.indexOf(currentStatus);
    if (currentIndex < statusOptions.length - 1) {
      return statusOptions[currentIndex + 1];
    }
    return currentStatus; // Should not happen for valid statuses
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h1>
            <p className="text-gray-600">Track your job applications and monitor your progress</p>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application
                </button>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Filter by company..."
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company">By Company</option>
                  <option value="status">By Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {getFilteredAndSortedApplications().map((application) => (
              <div key={application.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md ${
                viewMode === 'list' ? 'flex items-center justify-between' : ''
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{application.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{application.company}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {application.location}
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                    {application.status}
                  </span>
                  <div className="text-sm text-gray-500">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {new Date(application.dateApplied).toLocaleDateString()}
                  </div>
                </div>

                {application.salary && (
                  <div className="text-sm text-gray-600 mb-4">
                    <DollarSign className="h-3 w-3 inline mr-1" />
                    {application.salary}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(application.id, getNextStatus(application.status))}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => deleteApplication(application.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                                     {isOldApplication(application.dateApplied) && (
                     <AlertCircle className="h-4 w-4 text-yellow-500" />
                   )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {getFilteredAndSortedApplications().length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Building className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">Start tracking your job applications to see them here</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Your First Application
              </button>
            </div>
          )}

          {/* Add Application Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Add New Application</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={addApplication} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Frontend Developer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., TechCorp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary (optional)</label>
                    <input
                      type="text"
                      name="salary"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., $80k - $100k"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job URL (optional)</label>
                    <input
                      type="url"
                      name="jobUrl"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Add Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Undo Notification */}
          {showUndo && (
            <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">Application marked as rejected</span>
                <button
                  onClick={undoRejection}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Undo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationTracker;