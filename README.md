# 🍎 Apple Style JSON Parser

一个简洁、优雅且强大的 JSON 解析与格式化工具，采用 **Apple Human Interface Guidelines (HIG)** 设计风格。

👉 **[在线访问 (Live Demo)](https://jiangyoung.github.io/jsonparser/)**

## ✨ 特性

-   **🍏 Apple HIG 设计**：采用系统字体（SF Pro 风格）、圆角矩形、毛玻璃效果和柔和的阴影。
-   **🌳 树形视图**：支持无限层级的 JSON 树形展示，支持折叠与展开。
-   **⚡️ 离线优先 (PWA)**：支持安装到桌面或主屏幕，无需网络即可离线使用。
-   **🛠️ 实用工具**：
    -   **Example**：快速加载示例数据。
    -   **Format**：标准 2 空格缩进格式化。
    -   **Compress**：一键压缩 JSON（Minify）。
    -   **Copy**：快速复制到剪贴板。
    -   **Export**：导出为 `data_{timestamp}.json` 文件。
-   **🚀 高性能**：基于 Vite 6 + React 19 + Tailwind CSS 4 构建。

## 📥 安装为 PWA

在支持的浏览器（如 Chrome, Edge, Safari）中访问，点击地址栏右侧的“安装”图标，即可像原生应用一样运行。

## 🚀 技术栈与开发

-   **核心架构**：React 19 + TypeScript + Vite 6
-   **样式引擎**：Tailwind CSS 4 (Apple HIG 风格)
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
