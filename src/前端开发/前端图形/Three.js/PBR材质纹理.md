---
title: PBR材质纹理
category: 前端开发
  - 前端图形
  - Three.js
order: 5
---

## PBR 物理渲染

### 什么是 PBR？

::: tip 参考

[什么是 PBR？](https://zhuanlan.zhihu.com/p/342484575)

:::

基于物理渲染

以前的渲染在模仿灯光的外观

现在是在模仿光的实际行为

使图形看起来跟真实

### 标准网格材质与光照物理效果

环境光`AmbientLight`环境光会均匀的照亮场景中的所有物体。环境光不能用来投射阴影，因为它没有方向

平行光`DirectionalLight` ,必须设置`positon`它的方向是从一个平行光的位置` position`到 `target`(默认(0,0,0))的位置

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//  创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
// 设置相机位置
camera.position.set(1, 1, 1)
// 将相机添加到场景中
scene.add(camera)
// 加载纹理
const doorTexture = new THREE.TextureLoader().load(
  '/src/assets/textures/door/color.jpg'
)
// 透明贴图
const alphaTexture = new THREE.TextureLoader().load(
  '/src/assets/textures/door/alpha.jpg'
)
// 环境遮挡纹理贴图
const aoTexture = new THREE.TextureLoader().load(
  './src/assets/textures/door/ambientOcclusion.jpg'
)
// 创建平面几何体
const PlaneGeometry = new THREE.PlaneGeometry()
// aoMap必须设置第二组uv
PlaneGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(PlaneGeometry.attributes.uv.array, 2)
)
// 创建材质
const material = new THREE.MeshStandardMaterial({
  map: doorTexture,
  alphaMap: alphaTexture,
  // 必须添加 选择一个alpha通道
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: aoTexture,
  aoMapIntensity: 1
})
// 创建物体
const plane = new THREE.Mesh(PlaneGeometry, material)
// 将平面添加到场景
scene.add(plane)
// 初始化渲染器
const renderer2 = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer2.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer2.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer2.domElement)
// 阻尼效果
controls.enableDamping = true
// 环境光
const light = new THREE.AmbientLight(0x404040) // soft white light
scene.add(light)
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(directionalLight)
directionalLight.position.set(3, 3, 3)
// 渲染函数
function render() {
  renderer2.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}
render()
```

## 置换贴图与顶点细分设置
