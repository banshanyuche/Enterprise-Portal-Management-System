// src/env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 声明所有 .js 文件都能导入
declare module '*.js' {
    const content: any
    export default content
}