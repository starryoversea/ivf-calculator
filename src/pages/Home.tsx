import { useState, useContext, useEffect } from "react";
import { LocaleContext } from "@/contexts/localeContext";
import { CalculatorContext, CalculationResult } from "@/contexts/calculatorContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { Calendar, Clock, Globe, Moon, Sun, History, Info, Book, Save, Trash2 } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { Language } from "@/App";


export default function Home() {
  const { language, setLanguage, t } = useContext(LocaleContext);
  const { results, addResult, clearResults, calculateDueDate } = useContext(CalculatorContext);
  const { theme, toggleTheme, isDark } = useTheme();
  
  // 表单状态
  const [dateType, setDateType] = useState<'transfer' | 'retrieval'>('transfer');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [embryoStage, setEmbryoStage] = useState<number>(3);
  
  // 计算结果状态
  const [calculationResult, setCalculationResult] = useState<Omit<CalculationResult, 'id' | 'calculationDate'> | null>(null);
  
  // 获取当前时区
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // 设置默认日期为今天
  useEffect(() => {
    const today = new Date();
    setSelectedDate(formatDateToDDMMYYYY(today));
  }, []);
  
  // 处理计算按钮点击
  const handleCalculate = () => {
    if (!selectedDate) {
      return;
    }
    
    const result = calculateDueDate(selectedDate, dateType, embryoStage);
    if (result) {
      setCalculationResult(result);
      
      // 添加微动画效果
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  // 保存计算结果
  const handleSaveResult = () => {
    if (calculationResult) {
      addResult(calculationResult);
      toast.success(t('saveSuccessMessage'));
    }
  };
  
  // 切换语言
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };
  
  return (
    // 添加暗夜模式背景色，样式为bg-gradient-to-br from-gray-900 to-gray-800
    <div className={"min-h-screen container mx-auto px-4 py-8 max-w-7xl " + (isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100')}>
      {/* 顶部导航栏 */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.h1 
              className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t('appTitle')}
            </motion.h1>
            <motion.p 
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('appSubtitle')}
            </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            {/* 语言选择器 */}
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-md backdrop-blur-sm">
              <Globe size={18} className={isDark ? 'text-blue-300' : 'text-blue-600'} />
              <button 
                className={`px-2 py-1 rounded-full ${language === 'en' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : isDark ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button 
                className={`px-2 py-1 rounded-full ${language === 'es' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : isDark ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => handleLanguageChange('es')}
              >
                ES
              </button>
              <button 
                className={`px-2 py-1 rounded-full ${language === 'fr' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : isDark ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => handleLanguageChange('fr')}
              >
                FR
              </button>
              <button 
                className={`px-2 py-1 rounded-full ${language === 'zh' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : isDark ? 'text-gray-300' : 'text-gray-700'}`}
                onClick={() => handleLanguageChange('zh')}
              >
                中文
              </button>
            </div>
            
            {/* 主题切换按钮 */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-gray-700" />
              ) : (
                <Sun size={20} className="text-yellow-300" />
              )}
            </button>
            
            
            {/* 时区信息 */}
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-md backdrop-blur-sm text-sm">
              <Clock size={18} className={isDark ? 'text-purple-300' : 'text-purple-600'} />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{t('timezoneLabel')}</span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{currentTimezone}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：计算器表单 */}
        <motion.section 
          className="lg:col-span-1 bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('appTitle')}</h2>
          
          <form className="space-y-6">
            {/* 日期类型选择 */}
            <div className="space-y-3">
              <label className={`block text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{t('dateTypeLabel')}</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                    dateType === 'transfer' 
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setDateType('transfer')}
                >
                  {t('transferDateLabel')}
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                    dateType === 'retrieval' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setDateType('retrieval')}
                >
                  {t('retrievalDateLabel')}
                </button>
              </div>
            </div>
            
            {/* 日期输入 */}
            <div className="space-y-3">
              <label className={`block text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{t('dateInputLabel')}</label>
              <div 
                className="relative cursor-pointer"
                onClick={() => {
                  const dateInput = document.getElementById('date-input') as HTMLInputElement;
                  if (dateInput && 'showPicker' in dateInput) {
                    (dateInput as any).showPicker();
                  }
                }}
              >
                <input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full p-3 pl-10 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 cursor-pointer`}
                />
                <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${isDark ? 'text-gray-500' : 'text-gray-400'} pointer-events-none`} size={20} />
              </div>
            </div>
            
            
            {/* 胚胎阶段选择 */}
            <div className="space-y-3">
              <label className={`block text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{t('embryoStageLabel')}</label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className={`py-2 px-4 rounded-full border transition-all duration-300 ${
                      embryoStage === stage 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                    onClick={() => setEmbryoStage(stage)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 计算按钮 */}
            <motion.button
              type="button"
              onClick={handleCalculate}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('calculateButton')}</span>
              <i className="fa-solid fa-calculator"></i>
            </motion.button>
          </form>
        </motion.section>
        
        {/* 中间：计算结果 */}
        <motion.section 
          id="results-section"
          className="lg:col-span-1 bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('resultsTitle')}</h2>
          
          {calculationResult ? (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* 预产期结果卡片 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800 shadow-md">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{t('dueDateLabel')}</h3>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{calculationResult.dueDate}</p>
              </div>
              
              {/* 当前孕周卡片 */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800 shadow-md">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>{t('currentWeekLabel')}</h3>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {calculationResult.currentWeek}{t('weekCountLabel')} {calculationResult.currentDay > 0 && `${calculationResult.currentDay}${t('dayCountLabel')}`}
                </p>
              </div>
              
              {/* 剩余天数卡片 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800 shadow-md">
                <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-green-300' : 'text-green-800'}`}>{t('daysRemainingLabel')}</h3>
                <p className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{calculationResult.daysRemaining}{t('dayCountLabel')}</p>
              </div>
              
              {/* 保存结果按钮 */}
              <motion.button
                onClick={handleSaveResult}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={18} />
                <span>{t('saveResultButton')}</span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-4"
              >
                <Calendar size={64} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
              </motion.div>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('instructionsText')}
              </p>
            </div>
          )}
        </motion.section>
        
        {/* 右侧：历史记录和信息 */}
        <motion.section 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* 历史记录 */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <div className="flex items-center gap-2">
                  <History size={20} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                  {t('historyTitle')}
                </div>
              </h2>
              {results.length > 0 && (
                <motion.button
                  onClick={clearResults}
                  className={`text-sm px-3 py-1 rounded-full ${isDark ? 'text-red-300 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-100'} transition-colors duration-300 flex items-center gap-1`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={14} />
                  {t('clearHistoryButton')}
                </motion.button>
              )}
            </div>
            
            <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
              {results.length > 0 ? (
                results.map((result) => (
                  <motion.div
                    key={result.id}
                    className={`p-3 rounded-xl border ${isDark ? 'border-gray-700 bg-gray-750/50' : 'border-gray-200 bg-gray-50'} hover:shadow-md transition-all duration-300`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.dueDate}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        result.dateType === 'transfer' 
                          ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {result.dateType === 'transfer' ? t('transferDateLabel') : t('retrievalDateLabel')}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {result.date} • {result.embryoStage} days
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <History size={40} className={isDark ? 'text-gray-600 mb-3' : 'text-gray-300 mb-3'} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('noHistoryMessage')}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* 使用说明 */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center gap-2">
                <Book size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                {t('instructionsTitle')}
              </div>
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('instructionsText')}</p>
          </div>
          
          {/* IVF科普 */}
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="flex items-center gap-2">
                <Info size={20} className={isDark ? 'text-green-400' : 'text-green-600'} />
                {t('infoTitle')}
              </div>
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t('infoText')}</p>
          </div>
        </motion.section>
      </main>
      
      {/* 页脚 */}
      <footer className="mt-12 text-center py-6">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          © {new Date().getFullYear()} IVF Due Date Calculator. All rights reserved.
        </p>
        <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          This tool is for informational purposes only and should not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
}