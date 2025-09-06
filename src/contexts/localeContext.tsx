import React, { createContext, ReactNode } from "react";
import { Language } from "../App";

// 定义本地化字符串类型
export interface LocaleStrings {
  [key: string]: string;
}

// 定义本地化上下文类型
interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建本地化上下文
export const LocaleContext = createContext<LocaleContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});


// 定义不同语言的翻译
const translations: Record<Language, LocaleStrings> = {
  en: {
    // 应用标题和描述
    appTitle: "IVF Due Date Calculator",
    appSubtitle: "Calculate your estimated due date for IVF pregnancy",
    
    // 表单标签
    dateTypeLabel: "Select Date Type:",
    transferDateLabel: "Embryo Transfer Date",
    retrievalDateLabel: "Egg Retrieval Date",
    dateInputLabel: "Date:",
    embryoStageLabel: "Embryo Stage (days):",
    
    // 按钮
    calculateButton: "Calculate",
    saveResultButton: "Save Result",
    clearHistoryButton: "Clear History",
    
    // 结果显示
    resultsTitle: "Calculation Results",
    dueDateLabel: "Estimated Due Date:",
    currentWeekLabel: "Current Week of Pregnancy:",
    daysRemainingLabel: "Days Remaining:",
    weekCountLabel: " weeks",
    dayCountLabel: " days",
    
    // 历史记录
    historyTitle: "Calculation History",
    noHistoryMessage: "No calculation history yet",
    
    // 使用说明
    instructionsTitle: "How to Use",
    instructionsText: "Select either your embryo transfer date or egg retrieval date, choose the appropriate embryo stage, then click 'Calculate' to get your estimated due date.",
    
    // IVF科普
    infoTitle: "About IVF Due Date Calculation",
    infoText: "IVF due dates are calculated differently than natural conception. Add 266 days to the reference date and adjust based on the embryo stage for accurate calculation.",
    
    
    // 时区信息
    timezoneLabel: "Your Current Timezone:",
    
    // 保存成功消息
    saveSuccessMessage: "Result saved successfully"
  },
  es: {
    // 应用标题和描述
    appTitle: "Calculadora de Fecha Estimada de Parto por FIV",
    appSubtitle: "Calcula tu fecha estimada de parto para embarazo por FIV",
    
    // 表单标签
    dateTypeLabel: "Selecciona Tipo de Fecha:",
    transferDateLabel: "Fecha de Transferencia de Embrión",
    retrievalDateLabel: "Fecha de Recuperación de Óvulos",
    dateInputLabel: "Fecha:",
    embryoStageLabel: "Etapa del Embrión (días):",
    
    // 按钮
    calculateButton: "Calcular",
    saveResultButton: "Guardar Resultado",
    clearHistoryButton: "Limpiar Historial",
    
    // 结果显示
    resultsTitle: "Resultados del Cálculo",
    dueDateLabel: "Fecha Estimada de Parto:",
    currentWeekLabel: "Semana Actual de Embarazo:",
    daysRemainingLabel: "Días Restantes:",
    weekCountLabel: " semanas",
    dayCountLabel: " días",
    
    // 历史记录
    historyTitle: "Historial de Cálculos",
    noHistoryMessage: "Aún no hay historial de cálculos",
    
    // 使用说明
    instructionsTitle: "Cómo Usar",
    instructionsText: "Selecciona tu fecha de transferencia de embrión o fecha de recuperación de óvulos, elige la etapa de embrión apropiada, luego haz clic en 'Calcular' para obtener tu fecha estimada de parto.",
    
    // IVF科普
    infoTitle: "Acerca del Cálculo de Fecha de Parto por FIV",
    infoText: "Las fechas de parto por FIV se calculan de manera diferente a la concepción natural. Agrega 266 días a la fecha de referencia y ajusta según la etapa del embrión para un cálculo preciso.",
    
    
    // 时区信息
    timezoneLabel: "Tu Zona Horaria Actual:",
    
    // 保存成功消息
    saveSuccessMessage: "Resultado guardado exitosamente"
  },
  fr: {
    // 应用标题和描述
    appTitle: "Calculateur de Date Prévue d'Accouchement IVF",
    appSubtitle: "Calculez votre date prévue d'accouchement pour une grossesse IVF",
    
    // 表单标签
    dateTypeLabel: "Sélectionnez le Type de Date:",
    transferDateLabel: "Date du Transfert d'Embryon",
    retrievalDateLabel: "Date de Récupération d'Ovules",
    dateInputLabel: "Date:",
    embryoStageLabel: "Stade de l'Embryon (jours):",
    
    // 按钮
    calculateButton: "Calculer",
    saveResultButton: "Enregistrer le Résultat",
    clearHistoryButton: "Effacer l'Histoire",
    
    // 结果显示
    resultsTitle: "Résultats du Calcul",
    dueDateLabel: "Date Prévue d'Accouchement:",
    currentWeekLabel: "Semaine Actuelle de Grossesse:",
    daysRemainingLabel: "Jours Restants:",
    weekCountLabel: " semaines",
    dayCountLabel: " jours",
    
    // 历史记录
    historyTitle: "Historique des Calculs",
    noHistoryMessage: "Aucun historique de calculs pour le moment",
    
    // 使用说明
    instructionsTitle: "Comment Utiliser",
    instructionsText: "Sélectionnez soit votre date de transfert d'embryon ou votre date de récupération d'ovules, choisissez le stade d'embryon approprié, puis cliquez sur 'Calculer' pour obtenir votre date prévue d'accouchement.",
    
    // IVF科普
    infoTitle: "À Propos du Calcul de Date d'Accouchement IVF",
    infoText: "Les dates prévues d'accouchement IVF sont calculées différemment de la conception naturelle. Ajoutez 266 jours à la date de référence et ajustez en fonction du stade de l'embryon pour un calcul précis.",
    
    
    // 时区信息
    timezoneLabel: "Votre Fuseau Horaire Actuel:",
    
    // 保存成功消息
    saveSuccessMessage: "Résultat enregistré avec succès"
  },
  zh: {
    // 应用标题和描述
    appTitle: "IVF预产期计算器",
    appSubtitle: "计算您的试管婴儿预产期",
    
    // 表单标签
    dateTypeLabel: "选择日期类型：",
    transferDateLabel: "胚胎移植日期",
    retrievalDateLabel: "取卵日期",
    dateInputLabel: "日期：",
    embryoStageLabel: "胚胎阶段（天）：",
    
    // 按钮
    calculateButton: "计算",
    saveResultButton: "保存结果",
    clearHistoryButton: "清除历史",
    
    // 结果显示
    resultsTitle: "计算结果",
    dueDateLabel: "预产期：",
    currentWeekLabel: "当前孕周：",
    daysRemainingLabel: "剩余天数：",
    weekCountLabel: "周",
    dayCountLabel: "天",
    
    // 历史记录
    historyTitle: "计算历史",
    noHistoryMessage: "暂无计算历史",
    
    // 使用说明
    instructionsTitle: "使用说明",
    instructionsText: "选择您的胚胎移植日期或取卵日期，选择相应的胚胎阶段，然后点击'计算'获取您的预产期。",
    
    // IVF科普
    infoTitle: "关于IVF预产期计算",
    infoText: "IVF预产期的计算方式与自然受孕不同。在参考日期基础上加266天，并根据胚胎阶段进行调整以获得准确的计算结果。",
    
    
    // 时区信息
    timezoneLabel: "您当前的时区：",
    
    // 保存成功消息
    saveSuccessMessage: "结果保存成功"
  }
};

// 本地化提供者组件
interface LocaleProviderProps {
  children: ReactNode;
  value: {
    language: Language;
    setLanguage: (lang: Language) => void;
  };
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children, value }) => {
  // 翻译函数
  const t = (key: string): string => {
    return translations[value.language][key] || key;
  };

  // 增强的setLanguage函数，包含保存到localStorage
  const setLanguageWithSave = (lang: Language) => {
    value.setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return (
    <LocaleContext.Provider value={{ ...value, setLanguage: setLanguageWithSave, t }}>
      {children}
    </LocaleContext.Provider>
  );
};