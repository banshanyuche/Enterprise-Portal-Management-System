/// <reference types="vite/client" />
declare module 'nprogress' {
    const NProgress: {
        start: () => void
        done: () => void
        configure: (options: any) => void
        // 按需添加
    }
    export default NProgress
}

declare module 'nprogress/nprogress.css'