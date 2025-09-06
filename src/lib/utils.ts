import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期为DD/MM/YYYY格式
export function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // HTML input type="date" expects YYYY-MM-DD format
}

// 解析DD/MM/YYYY格式的日期为Date对象
export function parseDDMMYYYYToDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split('/').map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  // 验证日期是否有效
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

// 获取用户时区偏移
export function getUserTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset < 0 ? '+' : '-';
  
  return `GMT${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
