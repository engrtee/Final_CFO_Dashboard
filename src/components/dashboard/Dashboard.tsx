import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PerformanceManagement from '../sections/PerformanceManagement';
import ProjectManagement from '../sections/ProjectManagement';
import BudgetingForecasting from '../sections/BudgetingForecasting';
import LiquiditySolvency from '../sections/LiquiditySolvency';
import RiskCompliance from '../sections/RiskCompliance';
import FinancialReporting from '../sections/FinancialReporting';
import DownloadCenter from '../sections/DownloadCenter';
import Overview from '../sections/Overview';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/performance" element={<PerformanceManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/budgeting" element={<BudgetingForecasting />} />
            <Route path="/liquidity" element={<LiquiditySolvency />} />
            <Route path="/risk" element={<RiskCompliance />} />
            <Route path="/reporting" element={<FinancialReporting />} />
            <Route path="/downloads" element={<DownloadCenter />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;