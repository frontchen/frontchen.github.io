import { defineClientConfig } from '@vuepress/client'
import 'element-plus/dist/index.css'
import globalComponents from './globalComponents'
export default defineClientConfig({
  async enhance({ app }) {
    if (!__VUEPRESS_SSR__) {
      const ElementPlus = await import('element-plus')
      app.use(ElementPlus)
      globalComponents(app)
    }
  }
})
