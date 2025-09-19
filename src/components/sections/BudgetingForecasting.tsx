import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { PieChart, TrendingUp, Target, AlertTriangle } from 'lucide-react';

const BudgetingForecasting: React.FC = () => {
  const { financialData } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;

  const budgetVsActualChartConfig = {
    type: 'bar' as const,
    data: {
      labels: ['Operations', 'Technology', 'Marketing', 'HR', 'Facilities', 'Compliance'],
      datasets: [
        {
          label: 'Budget',
          data: [800, 500, 200, 300, 150, 100],
          backgroundColor: '#E5E7EB',
        },
        {
          label: 'Actual',
          data: [750, 480, 220, 290, 140, 95],
          backgroundColor: '#16A34A',
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

  const forecastTrendConfig = {
    type: 'line' as const,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Actual',
          data: [180, 185, 175, 190, 195, 188, 200, 210, 205, 215, 220, 225],
          borderColor: '#16A34A',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Forecast',
          data: [null, null, null, null, null, null, 200, 208, 215, 222, 230, 235],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderDash: [5, 5],
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Amount (Millions)'
          }
        }
      }
    }
  };

  const budgetData = [
    {
      category: 'Operations',
      budget: 800000000,
      actual: 750000000,
      variance: -6.25,
      forecast: 780000000,
      status: 'Under Budget'
    },
    {
      category: 'Technology',
      budget: 500000000,
      actual: 480000000,
      variance: -4.0,
      forecast: 520000000,
      status: 'Under Budget'
    },
    {
      category: 'Marketing',
      budget: 200000000,
      actual: 220000000,
      variance: 10.0,
      forecast: 235000000,
      status: 'Over Budget'
    },
    {
      category: 'Human Resources',
      budget: 300000000,
      actual: 290000000,
      variance: -3.33,
      forecast: 310000000,
      status: 'Under Budget'
    },
    {
      category: 'Facilities',
      budget: 150000000,
      actual: 140000000,
      variance: -6.67,
      forecast: 155000000,
      status: 'Under Budget'
    },
    {
      category: 'Compliance',
      budget: 100000000,
      actual: 95000000,
      variance: -5.0,
      forecast: 105000000,
      status: 'Under Budget'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Budget':
        return 'bg-green-100 text-green-800';
      case 'Over Budget':
        return 'bg-red-100 text-red-800';
      case 'On Budget':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Budgeting & Forecasting</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Generate Forecast
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Current Year</option>
            <option>Next Year</option>
            <option>5-Year Plan</option>
          </select>
        </div>
      </div>

      {/* Budget Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Budget"
          value={financialData.budgetingData.totalBudget}
          change={3.2}
          icon={PieChart}
          color="bg-green-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Utilized Budget"
          value={financialData.budgetingData.utilizedBudget}
          change={2.8}
          icon={TrendingUp}
          color="bg-green-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Variance %"
          value={financialData.budgetingData.variancePercent}
          change={-1.5}
          icon={Target}
          color="bg-green-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Budget at Risk"
          value={125000000}
          change={5.7}
          icon={AlertTriangle}
          color="bg-red-600"
          formatter={formatCurrency}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget vs Actual by Category</h3>
          <Chart config={budgetVsActualChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Forecast Trend</h3>
          <Chart config={forecastTrendConfig} height={300} />
        </div>
      </div>

      {/* Budget Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Budget Analysis by Category</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variance %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Forecast
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.budget)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.actual)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    row.variance < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {row.variance > 0 ? '+' : ''}{row.variance.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(row.forecast)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
                      {row.status}
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

export default BudgetingForecasting;