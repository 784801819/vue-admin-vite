import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// API自动引入插件
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动引入插件
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

// 引入icon插件
import Icons from 'unplugin-icons/vite'
// 引入icon加载loader
const { FileSystemIconLoader } = require('unplugin-icons/loaders')
// 引入 Icon自动引入解析器
const IconsResolver = require('unplugin-icons/resolver')

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const viteEnv = loadEnv(mode, './')
  return {
    base: viteEnv.VITE_BASE,
    server: {
      host: '0.0.0.0',
      port: 8081,
      open: true,
      // 端口占用直接退出
      strictPort: true,
    },
    build: {
      outDir: 'dist-admin',
      assetsDir: 'static/assets',
      // 规定触发警告的chunk大小,消除打包大小超500kb警告
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      ElementPlus(),
      VueUseComponentsResolver(),
      VueUseDirectiveResolver(),
      Icons({
        compiler: 'vue3',
        // 自动安装图标集
        autoInstall: true,
        // 自定义图标加载
        customCollections: {
          // 可自定义icon
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          home: FileSystemIconLoader('src/assets/svg/home', (svg: string) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        }
      }),
      AutoImport({
        // 需要去解析的文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // imports 指定自动引入的包位置（名）
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 生成相应的自动导入json文件。
        eslintrc: {
          // 启用
          enabled: true,
          // 生成自动导入json文件位置
          filepath: './.eslintrc-auto-import.json',
          // 全局属性值
          globalsPropValue: true
        },
        resolvers: [
          // 使用 ElementPlus 自动引入解析器
          ElementPlusResolver()
        ],
      }),
      Components({
        // imports 指定组件所在目录，默认为 src/components
        dirs: ['src/components/', 'src/view/'],
        // 需要去解析的文件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          // Icon自动引入解析器
          IconsResolver({
            // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
            prefix: 'icon',
            // 当图标集名字过长时，可使用集合别名
            alias: {
              system: 'system-uicons'
            },
            // 标识自定义图标集,定义后无需import引入,按照如下规则去定义
            // 例如：<IconHomeLogo />
            /**
             * prefix - 前缀，默认为 i，上面我们配置成了 icon，即组件名以 icon 开头
             * collection - 图标集名
             * icon - 图标名
            */
            customCollections: ['home']
          }),
          // 使用 ElementPlus 自动引入解析器
          ElementPlusResolver()
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 配置scss
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@import "./src/theme/index.scss";' //引入scss文件
        }
      }
    }
  }
})
