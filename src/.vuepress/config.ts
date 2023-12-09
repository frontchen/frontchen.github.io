import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import path from 'path'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
// import { cut } from 'nodejs-jieba'

const customComfig = defineUserConfig({
  dest: 'dist',
  host: '0.0.0.0',
  port: 5000,
  base: '/blog/',
  lang: 'zh-CN',
  title: "Mr Chen's Blog",
  description: '一个专注于编程开发技术的个人知识库博客',
  open: true,
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }], //一种引用策略，可以用来防止图片或视频被盗 no-referrer：所有请求不发送 referrer。 gitee仓库外链图片加载失败

    [
      'link',
      {
        href: ' https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/vue@3.3.11/dist/vue.global.min.js'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/npm/atropos@2.0.2/atropos.min.js',
        async: true
      }
    ],
    [
      'script',
      {
        src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
        async: true
      }
    ]
  ],
  plugins: [
    searchProPlugin({
      customFields: [
        {
          name: 'author',
          getter: page => page.frontmatter.author,
          formatter: '作者：$content'
        }
      ]
    })
  ],
  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})

export default {
  ...customComfig,
  plugins: [
    ...(customComfig.plugins || []),

    resolveExternalsPlugin({
      react: 'React',
      vue: 'Vue' // 这个名字可以直接打印window，看window上挂的是什么名字，就写什么名字,
      // 'element-plus': 'ElementPlus'
    })
  ],
  markdown: {
    // ......
    extendMarkdown: md => {
      md.use(require('markdown-it-disable-url-encode'))
    }
  },
  // 禁止文件打包带hash
  viteOptions: {
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '/@': path.resolve(__dirname, '../../src'),
        '/@components/': path.resolve(__dirname, './components/')
      }
    },
    build: {
      assetsInlineLimit: 10000000, // 设置一个较大的值，禁止内联文件
      rollupOptions: {
        output: {
          filename: '[name].js',
          entryFileNames: '[name].js', // 设置输出文件名不带hash
          chunkFileNames: '[name].js', // 设置代码分割文件名不带hash
          assetFileNames: '[name].[ext]' // 设置静态资源文件名不带hash
        }
      },
      chunkSizeWarningLimit: 2000, // 设置一个较大的值，禁止警告
      cssCodeSplit: false, // 禁用 CSS 切割
      sourcemap: false, // 禁用 sourcemap
      minify: 'terser', // 使用 Terser 进行压缩
      brotliSize: false, // 禁用 Brotli
      filename: true // 禁用文件名的哈希
    }
  }
}
