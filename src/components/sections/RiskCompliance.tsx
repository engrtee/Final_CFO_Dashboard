import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { Shield, AlertTriangle, TrendingDown, FileCheck } from 'lucide-react';

const RiskCompliance: React.FC = () => {
  const { financialData } = useData();

  const formatPercent = (value: number) => `${value}%`;

  const riskExposureChartConfig = {
    type: 'radar' as const,
    data: {
      labels: ['Credit Risk', 'Market Risk', 'Operational Risk', 'Liquidity Risk', 'Interest Rate Risk', 'Regulatory Risk'],
      datasets: [{
        label: 'Current Exposure',
        data: [4.1, 3.7, 2.8, 1.9, 3.2, 2.1],
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        borderColor: '#DC2626',
        borderWidth: 2,
      }, {
        label: 'Risk Appetite',
        data: [5.0, 4.0, 3.5, 2.5, 4.0, 3.0],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: '#2563EB',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 6
        }
      }
    }
  };

  const nplTrendChartConfig = {
    type: 'line' as const,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'NPL Ratio',
          data: [2.8, 2.6, 2.4, 2.3, 2.2, 2.3],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Industry Average',
          data: [3.5, 3.4, 3.3, 3.2, 3.1, 3.0],
          borderColor: '#6B7280',
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
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
          beginAtZero: true,
          max: 5,
          title: {
            display: true,
            text: 'Percentage (%)'
          }
        }
      }
    }
  };

  const riskMetrics = [
    {
      category: 'Credit Risk',
      current: 4.1,
      target: 3.5,
      trend: 'Increasing',
      status: 'Attention Required'
    },
    {
      category: 'Market Risk',
      current: 3.7,
      target: 4.0,
      trend: 'Stable',
      status: 'Within Limits'
    },
    {
      category: 'Operational Risk',
      current: 2.8,
      target: 3.5,
      trend: 'Decreasing',
      status: 'Within Limits'
    },
    {
      category: 'Liquidity Risk',
      current: 1.9,
      target: 2.5,
      trend: 'Stable',
      status: 'Within Limits'
    },
    {
      category: 'Interest Rate Risk',
      current: 3.2,
      target: 4.0,
      trend: 'Increasing',
      status: 'Within Limits'
    },
    {
      category: 'Regulatory Risk',
      current: 2.1,
      target: 3.0,
      trend: 'Decreasing',
      status: 'Within Limits'
    }
  ];

  const complianceItems = [
    {
      requirement: 'Basel III Capital Requirements',
      status: 'Compliant',
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      responsible: 'Risk Committee'
    },
    {
      requirement: 'AML/KYC Procedures',
      status: 'Compliant',
      lastReview: '2024-02-01',
      nextReview: '2024-05-01',
      responsible: 'Compliance Team'
    },
    {
      requirement: 'Stress Testing Framework',
      status: 'Under Review',
      lastReview: '2024-01-30',
      nextReview: '2024-03-30',
      responsible: 'Risk Management'
    },
    {
      requirement: 'GDPR Data Protection',
      status: 'Compliant',
      lastReview: '2024-02-15',
      nextReview: '2024-08-15',
      responsible: 'IT Security'
    },
    {
      requirement: 'Liquidity Coverage Ratio',
      status: 'Compliant',
      lastReview: '2024-02-28',
      nextReview: '2024-03-31',
      responsible: 'Treasury'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
      case 'Within Limits':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
      case 'Attention Required':
        return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant':
      case 'Exceeds Limits':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Decreasing':
        return 'text-green-600';
      case 'Stable':
        return 'text-blue-600';
      case 'Increasing':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Risk & Compliance</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Generate Risk Report
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>Current Month</option>
            <option>Quarter View</option>
            <option>Annual Review</option>
          </select>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="NPL Ratio"
          value={financialData.riskData.npl}
          change={-0.5}
          icon={AlertTriangle}
          color="bg-red-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Credit Risk"
          value={financialData.riskData.creditRisk}
          change={0.2}
          icon={TrendingDown}
          color="bg-red-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Market Risk"
          value={financialData.riskData.marketRisk}
          change={-0.3}
          icon={Shield}
          color="bg-red-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Compliance Score"
          value={94.5}
          change={2.1}
          icon={FileCheck}
          color="bg-green-600"
          formatter={formatPercent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Exposure Matrix</h3>
          <Chart config={riskExposureChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Non-Performing Loans Trend</h3>
          <Chart config={nplTrendChartConfig} height={300} />
        </div>
      </div>

      {/* Risk Assessment Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Risk Category Assessment</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Appetite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {riskMetrics.map((risk, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {risk.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {risk.current}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {risk.target}%
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTrendColor(risk.trend)}`}>
                    {risk.trend}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(risk.status)}`}>
                      {risk.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Status Dashboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Responsible
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.requirement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.nextReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.responsible}
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

export default RiskCompliance;