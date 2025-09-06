import React, { createContext, ReactNode, useState } from "react";

// 定义计算结果类型
export interface CalculationResult {
  id: string;
  date: string;
  dueDate: string;
  currentWeek: number;
  currentDay: number;
  daysRemaining: number;
  dateType: 'transfer' | 'retrieval';
  embryoStage: number;
  calculationDate: string;
}

// 定义计算器上下文类型
interface CalculatorContextType {
  results: CalculationResult[];
  addResult: (result: Omit<CalculationResult, 'id' | 'calculationDate'>) => void;
  clearResults: () => void;
  calculateDueDate: (
    date: string,
    dateType: 'transfer' | 'retrieval',
    embryoStage: number
  ) => Omit<CalculationResult, 'id' | 'calculationDate'> | null;
}

// 创建计算器上下文
export const CalculatorContext = createContext<CalculatorContextType>({
  results: [],
  addResult: () => {},
  clearResults: () => {},
  calculateDueDate: () => null,
});

// 计算器提供者组件
interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  
  // 从本地存储加载历史记录
  const [results, setResults] = useState<CalculationResult[]>(() => {
    try {
      const savedResults = localStorage.getItem('ivfCalculatorResults');
      return savedResults ? JSON.parse(savedResults) : [];
    } catch (error) {
      console.error('Error loading results from localStorage:', error);
      return [];
    }
  });

  // 保存结果到本地存储
  const saveResultsToLocalStorage = (newResults: CalculationResult[]) => {
    try {
      localStorage.setItem('ivfCalculatorResults', JSON.stringify(newResults));
    } catch (error) {
      console.error('Error saving results to localStorage:', error);
    }
  };

  // 添加新的计算结果
  const addResult = (result: Omit<CalculationResult, 'id' | 'calculationDate'>) => {
    const newResult: CalculationResult = {
      ...result,
      id: Date.now().toString(),
      calculationDate: new Date().toISOString(),
    };
    
    const updatedResults = [newResult, ...results];
    setResults(updatedResults);
    saveResultsToLocalStorage(updatedResults);
  };

  // 清除所有计算结果
  const clearResults = () => {
    setResults([]);
    saveResultsToLocalStorage([]);
  };

  // 计算预产期的核心逻辑
  const calculateDueDate = (
    date: string,
    dateType: 'transfer' | 'retrieval',
    embryoStage: number
  ): Omit<CalculationResult, 'id' | 'calculationDate'> | null => {
    try {
      const inputDate = new Date(date);
      const today = new Date();
      
      // 计算参考日期（基准日期）
      let referenceDate = new Date(inputDate);
      
      if (dateType === 'transfer') {
        // 胚胎移植日期计算
        // 根据胚胎阶段调整基准日期
        // 1-3天的胚胎需要减去2天，4-6天的胚胎需要减去相应天数
        const adjustmentDays = embryoStage <= 3 ? 2 : embryoStage - 1;
        referenceDate.setDate(referenceDate.getDate() - adjustmentDays);
      }
      
      // 计算预产期：从参考日期起加266天（人类正常妊娠期）
      const dueDate = new Date(referenceDate);
      dueDate.setDate(dueDate.getDate() + 266);
      
      // 计算当前孕周和剩余天数
      const timeDiff = today.getTime() - referenceDate.getTime();
      const daysSinceReference = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      let currentWeek = 0;
      let currentDay = 0;
      let daysRemaining = 0;
      
      if (daysSinceReference >= 0) {
        currentWeek = Math.floor(daysSinceReference / 7);
        currentDay = daysSinceReference % 7;
      }
      
      // 计算剩余天数
      const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      daysRemaining = Math.max(0, daysUntilDue);
      
      // 格式化日期显示
      const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      
      return {
        date: formatDate(inputDate),
        dueDate: formatDate(dueDate),
        currentWeek,
        currentDay,
        daysRemaining,
        dateType,
        embryoStage,
      };
    } catch (error) {
      console.error('Error calculating due date:', error);
      return null;
    }
  };

  return (
    <CalculatorContext.Provider value={{ results, addResult, clearResults, calculateDueDate }}>
      {children}
    </CalculatorContext.Provider>
  );
};