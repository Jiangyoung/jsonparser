# 🍎 Apple Style JSON Parser

一个简洁、优雅且强大的 JSON 解析与格式化工具，采用 **简约主义 (Minimalist)** 设计风格。

👉 **[在线访问 (Live Demo)](https://jiangyoung.github.io/jsonparser/)**

## ✨ 特性

-   **🤍 简约主义设计**：纯净的白灰色调、大面积留白、精致的排版，提供沉浸式的解析体验。
-   **🔄 双视图逻辑**：
    -   **左侧输入**：保持原始数据不动，支持加载示例和一键清空。
    -   **右侧输出**：支持 `树形图`、`格式化文本`、`压缩文本` 三种模式自由切换，不干扰原始输入。
-   **🌳 智能树形试图**：支持无限层级的 JSON 展开/折叠，长文本自动换行显示。
-   **⚡️ 离线优先 (PWA)**：支持安装到桌面或主屏幕，完全离线使用。
-   **🛠️ 高效工具**：
    -   **Copy**：智能复制当前右侧视图中的内容，带成功反馈。
    -   **Export**：根据当前视图模式导出对应的 `.json` 文件。
-   **🚀 顶尖技术栈**：React 19 + TypeScript + Vite 6 + Tailwind CSS 4。

## 🚀 技术栈与开发

-   **核心架构**：React 19 + TypeScript + Vite 6
-   **样式引擎**：Tailwind CSS 4 (简约风格)
-   **PWA 支持**：Vite Plugin PWA
-   **AI 协作开发**：本项目由 **[Gemini CLI](https://github.com/google/gemini-cli)** 自动生成并迭代开发。

## 👥 贡献者 (Contributors)

-   **[Jiangyoung](https://github.com/Jiangyoung)** - 发起者与维护者
-   **Gemini** - AI 协作开发助手 (Google DeepMind)

## 🛠️ 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📄 开源协议

MIT
