// @ts-ignore
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { LocaleProvider } from "@/contexts/localeContext";
import { CalculatorProvider } from "@/contexts/calculatorContext";

// 定义应用使用的语言类型
export type Language = 'en' | 'es' | 'fr' | 'zh';

// 自动检测用户语言
const detectUserLanguage = (): Language => {
  // 从localStorage获取保存的语言设置
  const savedLanguage = localStorage.getItem('preferred-language') as Language;
  if (savedLanguage && ['en', 'es', 'fr', 'zh'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // 从浏览器语言设置检测
  const browserLanguage = navigator.language.toLowerCase();
  
  
  if (browserLanguage.startsWith('zh')) {
    return 'zh';
  } else if (browserLanguage.startsWith('es')) {
    return 'es';
  } else if (browserLanguage.startsWith('fr')) {
    return 'fr';
  } else {
    return 'en'; // 默认英语
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>(detectUserLanguage());
  const { theme } = useTheme();

  return (
    <LocaleProvider value={{ language, setLanguage }}>
      <CalculatorProvider>
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-amber-50 to-rose-50' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </CalculatorProvider>
    </LocaleProvider>
  );
}
