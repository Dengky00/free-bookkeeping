import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    // base: '/free-bookkeeping-1/dist/',

    //用于判断生产环境和开发环境的变量,决定是否生效mock代码和切换后端接口
    define: command === 'build' ? { DEBUG: false } : { DEBUG: true },

    plugins: [
      vue(),
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      svgstore(),
    ],

    server: {
      //后端接口代理
      proxy: {
        '/api/v1': {
          target: 'http://121.196.236.94:3000/',
        },
      },
    },

    build: {
      //汇总选项手动分包
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('mock') || id.includes('faker')) {
              return 'mock'
            }
            if (id.includes('vant')) {
              return 'vant'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
