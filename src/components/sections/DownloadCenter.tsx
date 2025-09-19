import React from 'react';
import { useData } from '../../context/DataContext';
import { Download, FileSpreadsheet, FileText, Database, Calendar } from 'lucide-react';

const DownloadCenter: React.FC = () => {
  const { exportData } = useData();

  const reportTemplates = [
    {
      name: 'Performance Management Report',
      description: 'KPIs, metrics, and trend analysis for performance evaluation',
      type: 'Excel',
      category: 'Performance',
      lastUpdated: '2024-03-15',
      icon: FileSpreadsheet,
      data: {
        interestIncome: 856420000,
        loanPortfolio: 45600000000,
        netInterestMargin: 3.2,
        roa: 1.8,
        roe: 15.2
      }
    },
    {
      name: 'Project Portfolio Template',
      description: 'Project tracking, budget analysis, and completion status',
      type: 'Excel',
      category: 'Projects',
      lastUpdated: '2024-03-14',
      icon: FileSpreadsheet,
      data: {
        activeProjects: 12,
        budgetVsActual: 94.5,
        completionPercent: 78.3
      }
    },
    {
      name: 'Budget Planning Template',
      description: 'Budget allocation, forecasting, and variance analysis',
      type: 'Excel',
      category: 'Budgeting',
      lastUpdated: '2024-03-13',
      icon: FileSpreadsheet,
      data: {
        totalBudget: 2500000000,
        utilizedBudget: 1875000000,
        variancePercent: 8.7
      }
    },
    {
      name: 'Liquidity Assessment Report',
      description: 'Liquidity ratios, stress testing, and cash flow analysis',
      type: 'PDF',
      category: 'Liquidity',
      lastUpdated: '2024-03-12',
      icon: FileText,
      data: {
        liquidityRatio: 1.45,
        solvencyRatio: 12.8,
        cashFlowPosition: 5400000000
      }
    },
    {
      name: 'Risk Management Dashboard',
      description: 'Risk metrics, compliance status, and regulatory reporting',
      type: 'Excel',
      category: 'Risk',
      lastUpdated: '2024-03-11',
      icon: FileSpreadsheet,
      data: {
        npl: 2.3,
        creditRisk: 4.1,
        marketRisk: 3.7
      }
    },
    {
      name: 'Financial Statements Package',
      description: 'Income statement, balance sheet, and cash flow statements',
      type: 'PDF',
      category: 'Financial',
      lastUpdated: '2024-03-10',
      icon: FileText,
      data: {
        totalRevenue: 775800000,
        netProfit: 170900000,
        totalAssets: 84150000000
      }
    }
  ];

  const sampleDataSets = [
    {
      name: 'Interest Income by Product',
      description: 'Monthly breakdown of interest income across different banking products',
      format: 'CSV',
      size: '2.3 MB',
      rows: 12000
    },
    {
      name: 'Loan Portfolio Analysis',
      description: 'Detailed loan data including risk ratings and performance metrics',
      format: 'Excel',
      size: '5.8 MB',
      rows: 45000
    },
    {
      name: 'Customer Deposit Trends',
      description: 'Historical deposit data with customer segmentation',
      format: 'CSV',
      size: '3.1 MB',
      rows: 28000
    },
    {
      name: 'Risk Assessment Data',
      description: 'Credit risk, market risk, and operational risk measurements',
      format: 'Excel',
      size: '4.2 MB',
      rows: 18000
    },
    {
      name: 'Compliance Tracking',
      description: 'Regulatory compliance status and audit trail data',
      format: 'CSV',
      size: '1.8 MB',
      rows: 8500
    },
    {
      name: 'Budget vs Actual Analysis',
      description: 'Departmental budget allocation and actual spending data',
      format: 'Excel',
      size: '2.7 MB',
      rows: 15000
    }
  ];

  const handleDownloadTemplate = (template: any) => {
    // Create a sample data structure
    const data = {
      template: template.name,
      category: template.category,
      generatedAt: new Date().toISOString(),
      sampleData: template.data
    };

    // Create and download file
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSampleData = (dataset: any) => {
    // Generate sample CSV data
    const headers = ['Date', 'Category', 'Amount', 'Description'];
    const sampleRows = [];
    
    for (let i = 0; i < 100; i++) {
      sampleRows.push([
        new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        `Category ${Math.floor(Math.random() * 5) + 1}`,
        (Math.random() * 1000000).toFixed(2),
        `Sample transaction ${i + 1}`
      ]);
    }

    const csvContent = [headers.join(','), ...sampleRows.map(row => row.join(','))].join('\n');
    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataset.name.toLowerCase().replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Performance: 'bg-blue-100 text-blue-800',
      Projects: 'bg-purple-100 text-purple-800',
      Budgeting: 'bg-green-100 text-green-800',
      Liquidity: 'bg-cyan-100 text-cyan-800',
      Risk: 'bg-red-100 text-red-800',
      Financial: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Download Center</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => exportData('excel')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export All Data
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Report Templates</p>
              <p className="text-2xl font-bold text-gray-900">{reportTemplates.length}</p>
            </div>
            <FileSpreadsheet className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sample Datasets</p>
              <p className="text-2xl font-bold text-gray-900">{sampleDataSets.length}</p>
            </div>
            <Database className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <Download className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900">Today</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
          <p className="text-sm text-gray-600">Download pre-configured templates with sample data</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((template, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <template.icon className="h-8 w-8 text-gray-600" />
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Type: {template.type}</span>
                  <span>Updated: {template.lastUpdated}</span>
                </div>
                <button
                  onClick={() => handleDownloadTemplate(template)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Data Sets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Sample Data Sets</h3>
          <p className="text-sm text-gray-600">Download sample data for testing and development</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dataset Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rows
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleDataSets.map((dataset, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {dataset.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      dataset.format === 'Excel' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {dataset.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dataset.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dataset.rows.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDownloadSampleData(dataset)}
                      className="flex items-center px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
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

export default DownloadCenter;