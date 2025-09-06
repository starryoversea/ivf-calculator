# IVF 预产期计算器

一个专业的试管婴儿（IVF）预产期计算器，专为海外用户设计，支持多语言和多种计算方式。

## 🌟 项目特色

- **多语言支持**: 支持英语、西班牙语、法语三种语言
- **智能计算**: 支持胚胎移植日期和取卵日期两种计算方式
- **胚胎类型**: 支持新鲜胚胎和冷冻胚胎的精确计算
- **胚胎阶段**: 支持1-6天不同胚胎阶段的个性化计算
- **历史记录**: 自动保存计算历史，支持本地存储
- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 支持明暗主题切换
- **动画效果**: 使用Framer Motion提供流畅的用户体验

## 🏗️ 技术架构

### 前端技术栈

- **React 18.3.1** - 现代化的用户界面库
- **TypeScript 5.7.2** - 类型安全的JavaScript超集
- **Vite 6.2.0** - 快速的构建工具和开发服务器
- **Tailwind CSS 3.4.17** - 实用优先的CSS框架
- **React Router DOM 7.3.0** - 客户端路由管理

### 核心依赖

- **Framer Motion 12.9.2** - 强大的动画库
- **Lucide React 0.433.0** - 精美的图标库
- **Sonner 2.0.2** - 优雅的通知组件
- **Zod 3.24.2** - TypeScript优先的模式验证
- **Recharts 2.15.1** - 数据可视化图表库

### 项目结构

```
ivf-calculator/
├── src/
│   ├── components/          # 可复用组件
│   │   └── Empty.tsx       # 空状态组件
│   ├── contexts/           # React上下文
│   │   ├── authContext.ts  # 认证上下文
│   │   ├── calculatorContext.tsx  # 计算器状态管理
│   │   └── localeContext.tsx      # 国际化上下文
│   ├── hooks/              # 自定义Hooks
│   │   └── useTheme.ts     # 主题切换Hook
│   ├── lib/                # 工具函数
│   │   └── utils.ts        # 通用工具函数
│   ├── pages/              # 页面组件
│   │   └── Home.tsx        # 主页面
│   ├── App.tsx             # 应用根组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # Tailwind配置
├── tsconfig.json           # TypeScript配置
└── postcss.config.js       # PostCSS配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0 (推荐) 或 npm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动，支持热重载。

### 构建生产版本

```bash
# 构建生产版本
pnpm build

# 或
npm run build
```

构建文件将输出到 `dist/` 目录。

## 📱 功能说明

### 计算方式

1. **胚胎移植日期计算**
   - 新鲜胚胎：移植日期减去2天作为基准日期
   - 冷冻胚胎：根据胚胎阶段调整基准日期

2. **取卵日期计算**
   - 直接使用取卵日期作为基准日期

3. **预产期计算**
   - 基准日期 + 266天 = 预产期
   - 266天为人类正常妊娠期

### 胚胎阶段说明

- **1-3天胚胎**: 早期胚胎，需要减去2天
- **4-6天胚胎**: 囊胚期，根据具体天数调整

### 多语言支持

- **英语 (EN)**: 默认语言
- **西班牙语 (ES)**: 完整翻译
- **法语 (FR)**: 完整翻译

## 🎨 主题系统

- **浅色主题**: 温暖的琥珀色到玫瑰色渐变背景
- **深色主题**: 深灰色渐变背景
- **自动检测**: 根据系统偏好自动选择主题
- **持久化**: 主题选择保存在本地存储

## 💾 数据存储

- **本地存储**: 使用localStorage保存计算历史
- **数据格式**: JSON格式存储计算结果
- **自动清理**: 支持清除历史记录功能

## 🔧 开发指南

### 添加新语言

1. 在 `src/contexts/localeContext.tsx` 中的 `translations` 对象添加新语言
2. 在 `src/App.tsx` 中的 `Language` 类型添加新语言代码
3. 在 `src/pages/Home.tsx` 中添加语言切换按钮

### 自定义主题

1. 修改 `tailwind.config.js` 中的主题配置
2. 在 `src/hooks/useTheme.ts` 中调整主题逻辑
3. 更新 `src/App.tsx` 中的背景渐变样式

### 添加新功能

1. 在相应的Context中添加状态管理
2. 创建对应的UI组件
3. 添加必要的类型定义
4. 更新国际化字符串

## 📦 构建配置

### Vite配置

- 支持TypeScript路径别名 (`@/*`)
- 自动热重载
- 优化的生产构建

### TypeScript配置

- 严格模式启用
- 路径映射支持
- 现代ES2020目标

### Tailwind配置

- 深色模式支持
- 响应式设计
- 自定义容器配置

## 🌐 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 📄 许可证

本项目仅供学习和参考使用。请勿用于商业用途。

## ⚠️ 免责声明

本工具仅用于信息参考，不能替代专业医疗建议。请咨询专业医生获取准确的医疗信息。

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目。

## 📞 联系方式

如有问题或建议，请通过GitHub Issues联系我们。

---

**注意**: 这是一个专业的医疗计算工具，请确保在医疗专业人员的指导下使用计算结果。