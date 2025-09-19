import React, { createContext, useContext, useState } from 'react';

export interface FinancialData {
  performanceMetrics: {
    interestIncome: number;
    loanPortfolio: number;
    netInterestMargin: number;
    roa: number;
    roe: number;
  };
  projectData: {
    activeProjects: number;
    budgetVsActual: number;
    completionPercent: number;
  };
  budgetingData: {
    totalBudget: number;
    utilizedBudget: number;
    variancePercent: number;
  };
  liquidityData: {
    liquidityRatio: number;
    solvencyRatio: number;
    cashFlowPosition: number;
  };
  riskData: {
    npl: number;
    creditRisk: number;
    marketRisk: number;
  };
}

interface DataContextType {
  financialData: FinancialData;
  updateData: (section: keyof FinancialData, data: any) => void;
  importData: (file: File) => Promise<boolean>;
  exportData: (format: 'excel' | 'csv') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data based on the Excel file
const mockFinancialData: FinancialData = {
  performanceMetrics: {
    interestIncome: 856420000,
    loanPortfolio: 45600000000,
    netInterestMargin: 3.2,
    roa: 1.8,
    roe: 15.2,
  },
  projectData: {
    activeProjects: 12,
    budgetVsActual: 94.5,
    completionPercent: 78.3,
  },
  budgetingData: {
    totalBudget: 2500000000,
    utilizedBudget: 1875000000,
    variancePercent: 8.7,
  },
  liquidityData: {
    liquidityRatio: 1.45,
    solvencyRatio: 12.8,
    cashFlowPosition: 5400000000,
  },
  riskData: {
    npl: 2.3,
    creditRisk: 4.1,
    marketRisk: 3.7,
  },
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [financialData, setFinancialData] = useState<FinancialData>(mockFinancialData);

  const updateData = (section: keyof FinancialData, data: any) => {
    setFinancialData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const importData = async (file: File): Promise<boolean> => {
    // Mock file import - in real app, this would parse Excel/CSV files
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Imported file:', file.name);
        resolve(true);
      }, 1000);
    });
  };

  const exportData = (format: 'excel' | 'csv') => {
    // Mock data export
    const dataStr = JSON.stringify(financialData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cfo-dashboard-data.${format === 'excel' ? 'json' : 'csv'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DataContext.Provider value={{
      financialData,
      updateData,
      importData,
      exportData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}