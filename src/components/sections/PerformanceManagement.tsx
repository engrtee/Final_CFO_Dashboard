import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { DollarSign, TrendingUp, Percent, BarChart3 } from 'lucide-react';

const PerformanceManagement: React.FC = () => {
  const { financialData } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;

  const interestIncomeChartConfig = {
    type: 'bar' as const,
    data: {
      labels: ['Retail Banking', 'Corporate Banking', 'Investment Banking', 'Treasury', 'Others'],
      datasets: [{
        label: 'Interest Income (Millions)',
        data: [300, 250, 180, 100, 26.42],
        backgroundColor: [
          '#DC2626',
          '#2563EB', 
          '#16A34A',
          '#CA8A04',
          '#7C3AED'
        ],
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const loanPortfolioTrendConfig = {
    type: 'line' as const,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Total Portfolio',
          data: [42000, 43200, 44100, 44800, 45200, 45600],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };

  const performanceTableData = [
    { metric: 'Net Interest Margin', current: '3.2%', target: '3.5%', variance: '-0.3%', status: 'Below' },
    { metric: 'Return on Assets', current: '1.8%', target: '2.0%', variance: '-0.2%', status: 'Below' },
    { metric: 'Return on Equity', current: '15.2%', target: '16.0%', variance: '-0.8%', status: 'Below' },
    { metric: 'Cost-to-Income Ratio', current: '45.8%', target: '42.0%', variance: '+3.8%', status: 'Above' },
    { metric: 'Loan Growth Rate', current: '8.5%', target: '10.0%', variance: '-1.5%', status: 'Below' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>YTD</option>
          </select>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Interest Income"
          value={financialData.performanceMetrics.interestIncome}
          change={5.2}
          icon={DollarSign}
          color="bg-blue-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Loan Portfolio"
          value={financialData.performanceMetrics.loanPortfolio}
          change={2.8}
          icon={TrendingUp}
          color="bg-blue-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Net Interest Margin"
          value={financialData.performanceMetrics.netInterestMargin}
          change={-0.3}
          icon={Percent}
          color="bg-blue-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Return on Assets"
          value={financialData.performanceMetrics.roa}
          change={0.2}
          icon={BarChart3}
          color="bg-blue-600"
          formatter={formatPercent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interest Income by Product</h3>
          <Chart config={interestIncomeChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Portfolio Trend</h3>
          <Chart config={loanPortfolioTrendConfig} height={300} />
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceTableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.current}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {row.target}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    row.variance.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {row.variance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      row.status === 'Below' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.status} Target
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

export default PerformanceManagement;