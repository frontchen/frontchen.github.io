---
title: vue2继承组件覆盖父组件属性及方法
category:
  - 开发笔记
  - Vue
---

vue 使用组件继承时 经常遇到方法无法覆盖，这里记录下次避免踩坑

```vue
<script>
import Component from 'a'
export default {
  extends: Component,
  // 覆盖父组件 mounted方法
  beforeCreate() {
    const options = this.$options
    options.extends.mounted = () => {}
  }
}
</script>
```
