import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { FolderOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const { financialData } = useData();

  const formatPercent = (value: number) => `${value}%`;

  const projectStatusChartConfig = {
    type: 'doughnut' as const,
    data: {
      labels: ['Completed', 'In Progress', 'Planning', 'On Hold'],
      datasets: [{
        data: [25, 45, 20, 10],
        backgroundColor: [
          '#16A34A',
          '#2563EB',
          '#CA8A04',
          '#DC2626'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const
        }
      }
    }
  };

  const budgetProgressChartConfig = {
    type: 'bar' as const,
    data: {
      labels: ['Digital Transformation', 'Risk Management', 'Branch Renovation', 'IT Infrastructure', 'Compliance'],
      datasets: [
        {
          label: 'Budget Allocated',
          data: [500, 300, 200, 400, 150],
          backgroundColor: '#E5E7EB',
        },
        {
          label: 'Budget Used',
          data: [450, 280, 190, 380, 120],
          backgroundColor: '#7C3AED',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount (Millions)'
          }
        }
      }
    }
  };

  const projectsData = [
    {
      name: 'Digital Banking Platform',
      status: 'In Progress',
      progress: 75,
      budget: 15000000,
      spent: 11250000,
      deadline: '2024-06-30',
      manager: 'John Smith',
      priority: 'High'
    },
    {
      name: 'Risk Management System',
      status: 'In Progress',
      progress: 60,
      budget: 8000000,
      spent: 4800000,
      deadline: '2024-08-15',
      manager: 'Sarah Johnson',
      priority: 'Medium'
    },
    {
      name: 'Branch Network Expansion',
      status: 'Planning',
      progress: 15,
      budget: 25000000,
      spent: 3750000,
      deadline: '2024-12-31',
      manager: 'Michael Chen',
      priority: 'High'
    },
    {
      name: 'Compliance Automation',
      status: 'In Progress',
      progress: 90,
      budget: 5000000,
      spent: 4500000,
      deadline: '2024-04-30',
      manager: 'Emma Davis',
      priority: 'High'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            New Project
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>All Projects</option>
            <option>Active Only</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Project Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Projects"
          value={financialData.projectData.activeProjects}
          change={8.3}
          icon={FolderOpen}
          color="bg-purple-600"
        />
        <MetricCard
          title="Budget vs Actual"
          value={financialData.projectData.budgetVsActual}
          change={-2.1}
          icon={Clock}
          color="bg-purple-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Completion Rate"
          value={financialData.projectData.completionPercent}
          change={5.4}
          icon={CheckCircle}
          color="bg-purple-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Projects at Risk"
          value={3}
          change={-1}
          icon={AlertCircle}
          color="bg-red-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status Distribution</h3>
          <Chart config={projectStatusChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual by Project</h3>
          <Chart config={budgetProgressChartConfig} height={300} />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Project Portfolio</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectsData.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">PM: {project.manager}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(project.budget / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(project.spent / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;