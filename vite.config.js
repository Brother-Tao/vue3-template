import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPresetEnv from 'postcss-preset-env'
import postcsspxtoviewport from "postcss-px-to-viewport-8-plugin"
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', //配置文件根路径为相对路径
  plugins: [
    vue(),
    viteCompression({
      verbose: true,//是否在控制台中输出压缩结果
      disable: false,//是否禁用
      threshold: 10240,//如果体积大于阈值，则进行压缩，单位为b
      algorithm: 'gzip',//压缩算法，可选['gzip'，'brotliCompress'，'deflate'，'deflateRaw']
      ext: '.gz',//生成的压缩包的后缀
      deleteOriginFile: true //是否删除源文件
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8091,
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        // target:, //这里填入你要请求的接口的前缀
        ws: false,//代理websocked
        changeOrigin: true,//是否跨域
        secure: false,//是否https接口
        // rewrite: (path) => path.replace(/^\//, '') //的作用是把实际Request Url中的'/api'用""代替

      }
    }
  },

  build: {
    outDir: './dist',    // 打包文件的输出目录
    assetsDir: 'static',    // 静态文件的存放目录
    minify: "terser",
    terserOptions: { //清除console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue', 'vue-router', 'axios'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        //   globals: {
        //     vue: 'Vue',
        //     'vue-router': 'VueRouter',
        //     axios: 'axios'
        // }
        //解决打包时Some chunks are larger警告
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }

  },
  // 打包时删除console 和 debugger
  esBuild: {
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger', 'console'], // 删除 debugger 和 console
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 1920, // UI设计稿的宽度
          unitPrecision: 3, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: [], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
        }),
      ]
    }
  }
})
