import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Chart from '../common/Chart';
import { FileText, TrendingUp, Download, Filter } from 'lucide-react';

const FinancialReporting: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const { financialData } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const incomeStatementData = [
    { item: 'Interest Income', current: 856420000, previous: 812300000 },
    { item: 'Interest Expense', current: 254850000, previous: 248750000 },
    { item: 'Net Interest Income', current: 601570000, previous: 563550000 },
    { item: 'Fee and Commission Income', current: 128450000, previous: 115230000 },
    { item: 'Other Operating Income', current: 45780000, previous: 52340000 },
    { item: 'Total Operating Income', current: 775800000, previous: 731120000 },
    { item: 'Personnel Expenses', current: 285600000, previous: 272800000 },
    { item: 'Other Operating Expenses', current: 168900000, previous: 164200000 },
    { item: 'Depreciation', current: 45300000, previous: 42100000 },
    { item: 'Total Operating Expenses', current: 499800000, previous: 479100000 },
    { item: 'Operating Profit', current: 276000000, previous: 252020000 },
    { item: 'Provision for Credit Losses', current: 45600000, previous: 52800000 },
    { item: 'Profit Before Tax', current: 230400000, previous: 199220000 },
    { item: 'Tax Expense', current: 59500000, previous: 51800000 },
    { item: 'Net Profit', current: 170900000, previous: 147420000 }
  ];

  const balanceSheetData = [
    { item: 'Cash and Central Bank Reserves', amount: 12500000000, category: 'Assets' },
    { item: 'Loans and Advances to Banks', amount: 2800000000, category: 'Assets' },
    { item: 'Loans and Advances to Customers', amount: 45600000000, category: 'Assets' },
    { item: 'Investment Securities', amount: 18200000000, category: 'Assets' },
    { item: 'Property and Equipment', amount: 1850000000, category: 'Assets' },
    { item: 'Other Assets', amount: 3200000000, category: 'Assets' },
    { item: 'Total Assets', amount: 84150000000, category: 'Assets' },
    { item: 'Deposits from Banks', amount: 3500000000, category: 'Liabilities' },
    { item: 'Customer Deposits', amount: 68900000000, category: 'Liabilities' },
    { item: 'Borrowings', amount: 5800000000, category: 'Liabilities' },
    { item: 'Other Liabilities', amount: 2150000000, category: 'Liabilities' },
    { item: 'Total Liabilities', amount: 80350000000, category: 'Liabilities' },
    { item: 'Share Capital', amount: 1500000000, category: 'Equity' },
    { item: 'Retained Earnings', amount: 2100000000, category: 'Equity' },
    { item: 'Other Reserves', amount: 200000000, category: 'Equity' },
    { item: 'Total Equity', amount: 3800000000, category: 'Equity' }
  ];

  const cashFlowData = [
    { item: 'Net Profit', amount: 170900000, category: 'Operating' },
    { item: 'Depreciation', amount: 45300000, category: 'Operating' },
    { item: 'Provision for Credit Losses', amount: 45600000, category: 'Operating' },
    { item: 'Changes in Working Capital', amount: -12800000, category: 'Operating' },
    { item: 'Net Cash from Operating Activities', amount: 249000000, category: 'Operating' },
    { item: 'Purchase of Securities', amount: -580000000, category: 'Investing' },
    { item: 'Sale of Securities', amount: 420000000, category: 'Investing' },
    { item: 'Purchase of Property & Equipment', amount: -85000000, category: 'Investing' },
    { item: 'Net Cash from Investing Activities', amount: -245000000, category: 'Investing' },
    { item: 'Dividends Paid', amount: -65000000, category: 'Financing' },
    { item: 'Share Buybacks', amount: -25000000, category: 'Financing' },
    { item: 'Net Cash from Financing Activities', amount: -90000000, category: 'Financing' },
    { item: 'Net Change in Cash', amount: -86000000, category: 'Net' }
  ];

  const profitabilityChartConfig = {
    type: 'line' as const,
    data: {
      labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
      datasets: [
        {
          label: 'Net Interest Margin (%)',
          data: [3.1, 3.0, 3.2, 3.1, 3.2, 3.2],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Return on Equity (%)',
          data: [14.2, 14.8, 15.1, 14.6, 15.0, 15.2],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
          title: {
            display: true,
            text: 'Percentage (%)'
          }
        }
      }
    }
  };

  const revenueBreakdownConfig = {
    type: 'doughnut' as const,
    data: {
      labels: ['Interest Income', 'Fee Income', 'Trading Income', 'Other Income'],
      datasets: [{
        data: [78, 15, 4, 3],
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Assets':
        return 'text-blue-700 bg-blue-50';
      case 'Liabilities':
        return 'text-red-700 bg-red-50';
      case 'Equity':
        return 'text-green-700 bg-green-50';
      case 'Operating':
        return 'text-green-700 bg-green-50';
      case 'Investing':
        return 'text-blue-700 bg-blue-50';
      case 'Financing':
        return 'text-red-700 bg-red-50';
      case 'Net':
        return 'text-gray-700 bg-gray-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Reporting & Analysis</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="current">Current Period</option>
            <option value="quarterly">Quarterly View</option>
            <option value="annual">Annual Report</option>
          </select>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(775800000)}</p>
              <p className="text-sm text-green-600 font-medium">+6.1% vs last period</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(170900000)}</p>
              <p className="text-sm text-green-600 font-medium">+16.0% vs last period</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(84150000000)}</p>
              <p className="text-sm text-blue-600 font-medium">+4.2% vs last period</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ROE</p>
              <p className="text-2xl font-bold text-gray-900">15.2%</p>
              <p className="text-sm text-green-600 font-medium">+0.6pp vs last period</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability Trends</h3>
          <Chart config={profitabilityChartConfig} height={300} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
          <Chart config={revenueBreakdownConfig} height={300} />
        </div>
      </div>

      {/* Financial Statements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Statement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Income Statement</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {incomeStatementData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{item.item}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.current)}
                    </div>
                    {item.previous && (
                      <div className={`text-xs ${
                        item.current >= item.previous ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {((item.current - item.previous) / item.previous * 100).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Balance Sheet */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Balance Sheet</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {balanceSheetData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.item}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cash Flow Statement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cash Flow Statement</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cashFlowData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{item.item}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReporting;