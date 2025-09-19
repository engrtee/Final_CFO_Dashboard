import React from 'react';
import { useData } from '../../context/DataContext';
import MetricCard from '../common/MetricCard';
import Chart from '../common/Chart';
import { 
  TrendingUp, 
  FolderOpen, 
  PieChart, 
  Droplets, 
  Shield, 
  DollarSign 
} from 'lucide-react';

const Overview: React.FC = () => {
  const { financialData } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimization: 'standard',
      notation: 'compact'
    }).format(value);
  };

  const formatPercent = (value: number) => `${value}%`;

  // Chart configurations
  const performanceChartConfig = {
    type: 'line' as const,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Interest Income',
          data: [750, 780, 820, 800, 840, 856],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
        },
        {
          label: 'ROA',
          data: [1.5, 1.6, 1.7, 1.6, 1.8, 1.8],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  };

  const portfolioChartConfig = {
    type: 'doughnut' as const,
    data: {
      labels: ['Retail Loans', 'Corporate Loans', 'Mortgages', 'SME Loans'],
      datasets: [{
        data: [35, 25, 30, 10],
        backgroundColor: [
          '#DC2626',
          '#2563EB',
          '#16A34A',
          '#CA8A04'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          title="Active Projects"
          value={financialData.projectData.activeProjects}
          change={8.3}
          icon={FolderOpen}
          color="bg-purple-600"
        />
        <MetricCard
          title="Budget Utilization"
          value={financialData.budgetingData.utilizedBudget}
          change={-1.5}
          icon={PieChart}
          color="bg-green-600"
          formatter={formatCurrency}
        />
        <MetricCard
          title="Liquidity Ratio"
          value={financialData.liquidityData.liquidityRatio}
          change={3.1}
          icon={Droplets}
          color="bg-cyan-600"
          formatter={formatPercent}
        />
        <MetricCard
          title="Credit Risk"
          value={financialData.riskData.creditRisk}
          change={-0.8}
          icon={Shield}
          color="bg-red-600"
          formatter={formatPercent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <Chart config={performanceChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Portfolio Distribution</h3>
          <Chart config={portfolioChartConfig} height={300} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Generate Performance Report</h4>
            <p className="text-sm text-gray-500">Create detailed performance analysis</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="h-8 w-8 text-red-600 mb-2" />
            <h4 className="font-medium text-gray-900">Risk Assessment</h4>
            <p className="text-sm text-gray-500">Review current risk exposure</p>
          </button>
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <PieChart className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Budget Review</h4>
            <p className="text-sm text-gray-500">Analyze budget vs actual performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;