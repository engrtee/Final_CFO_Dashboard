import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { Droplets, TrendingDown, Activity, Gauge } from 'lucide-react';

const LiquiditySolvency: React.FC = () => {
  const { financialData } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;
  const formatRatio = (value: number) => `${value}x`;

  const liquidityTrendConfig = {
    type: 'line' as const,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Liquidity Ratio',
          data: [1.35, 1.38, 1.42, 1.40, 1.43, 1.45],
          borderColor: '#06B6D4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Regulatory Minimum',
          data: [1.25, 1.25, 1.25, 1.25, 1.25, 1.25],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
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
          min: 1.0,
          max: 1.6,
          title: {
            display: true,
            text: 'Ratio'
          }
        }
      }
    }
  };

  const cashFlowChartConfig = {
    type: 'bar' as const,
    data: {
      labels: ['Operating', 'Investing', 'Financing', 'Net Change'],
      datasets: [{
        label: 'Cash Flow (Billions)',
        data: [6.2, -2.1, -1.8, 2.3],
        backgroundColor: [
          '#16A34A',
          '#DC2626',
          '#CA8A04',
          '#2563EB'
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
          beginAtZero: true,
          title: {
            display: true,
            text: 'Billions USD'
          }
        }
      }
    }
  };

  const stressTestScenarios = [
    {
      scenario: 'Mild Recession',
      liquidityRatio: 1.32,
      impact: 'Low',
      recommendation: 'Monitor closely'
    },
    {
      scenario: 'Severe Market Stress',
      liquidityRatio: 1.18,
      impact: 'Medium',
      recommendation: 'Increase cash reserves'
    },
    {
      scenario: 'Banking Crisis',
      liquidityRatio: 0.95,
      impact: 'High',
      recommendation: 'Immediate action required'
    },
    {
      scenario: 'Regulatory Change',
      liquidityRatio: 1.28,
      impact: 'Low',
      recommendation: 'Adjust strategy'
    }
  ];

  const liquidityBreakdown = [
    {
      asset: 'Cash and Central Bank Reserves',
      amount: 12500000000,
      percentage: 23.1,
      category: 'Level 1'
    },
    {
      asset: 'Government Securities',
      amount: 18200000000,
      percentage: 33.7,
      category: 'Level 1'
    },
    {
      asset: 'Corporate Bonds (AAA)',
      amount: 8900000000,
      percentage: 16.5,
      category: 'Level 2A'
    },
    {
      asset: 'Covered Bonds',
      amount: 6700000000,
      percentage: 12.4,
      category: 'Level 2A'
    },
    {
      asset: 'Equity Securities',
      amount: 7700000000,
      percentage: 14.3,
      category: 'Level 2B'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Liquidity & Solvency</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
            Run Stress Test
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option>Current Period</option>
            <option>Historical View</option>
            <option>Forward Looking</option>
          </select>
        </div>
      </div>

      {/* Liquidity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Liquidity Ratio"
          value={financialData.liquidityData.liquidityRatio}
          change={1.4}
          icon={Droplets}
          color="bg-cyan-600"
          formatter={formatRatio}
        />
        <MetricCard
          title="Solvency Ratio"
          value={financialData.liquidityData.solvencyRatio}
          change={0.8}
          icon={TrendingDown}
          color="bg-cyan-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Cash Flow Position"
          value={financialData.liquidityData.cashFlowPosition}
          change={15.2}
          icon={Activity}
          color="bg-cyan-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Leverage Ratio"
          value={8.9}
          change={-0.3}
          icon={Gauge}
          color="bg-cyan-600"
          formatter={formatPercent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Liquidity Ratio Trend</h3>
          <Chart config={liquidityTrendConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis</h3>
          <Chart config={cashFlowChartConfig} height={300} />
        </div>
      </div>

      {/* Liquid Asset Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">High-Quality Liquid Assets (HQLA)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basel III Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {liquidityBreakdown.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {asset.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(asset.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      asset.category === 'Level 1' ? 'bg-green-100 text-green-800' :
                      asset.category === 'Level 2A' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {asset.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stress Test Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Stress Test Scenarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scenario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liquidity Ratio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommendation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stressTestScenarios.map((scenario, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scenario.scenario}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scenario.liquidityRatio}x
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(scenario.impact)}`}>
                      {scenario.impact}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scenario.recommendation}
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

export default LiquiditySolvency;