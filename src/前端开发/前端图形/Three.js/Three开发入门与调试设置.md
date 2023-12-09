---
title: Three开发入门与调试设置
category: 前端开发
  - 前端图形
  - Three.js
order: 2
---

## 创建第一个场景

一个场景能被渲染出来需要：场景、相机和渲染器

```js
import * as THREE from 'three'
// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0, 0, 10)
// 将相机添加到场景中
scene.add(camera)

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 设置物体材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)
```

## 透视相机（PerspectiveCamera）示意图

这一投影模式被用来模拟人眼所看到的景象，它是 3D 场景的渲染中使用得最普遍的投影模式。

![透视相机示意图](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E9%80%8F%E8%A7%86%E7%9B%B8%E6%9C%BA%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

1. 摄像机视锥体垂直视野角度 也就是图中的 **「a」**

2. 摄像机视锥体近端面 也就是图中的 **「near plane」**

3. 摄像机视锥体远端面 也就是图中的 **「far plane」**

4. 摄像机视锥体长宽比 **「表示输出图像的宽和高之比」**

5. 对应的 three 中的照相机：

```js
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
```

参数依次位：

`fov `— 摄像机视锥体垂直视野角度
`aspect `— 摄像机视锥体长宽比
`near` — 摄像机视锥体近端面
`far` — 摄像机视锥体远端面

## 轨道控制器查看物体

轨道控制器：`new OrbitControls( object : Camera, domElement : HTMLDOMElement )`

- 参数 1:`object`: 将要被控制的相机
- 参数 2:`domElement`: 用于事件监听的 `HTML `元素

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0, 0, 10)
// 将相机添加到场景中
scene.add(camera)

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 设置物体材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

function render() {
  renderer.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}

render()
```

## 关于坐标系

WebGL 和 Three.js 使用的坐标系是右手坐标系，即右手伸开，拇指为 X，四指为 Y，手心为 Z。

![threejs坐标系](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/threejs%E5%9D%90%E6%A0%87%E7%B3%BB.jpeg)

## requestAnimationFrame

[`window.requestAnimationFrame()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配

## 添加坐标轴辅助器

```js
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
```

![坐标轴辅助器](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E5%9D%90%E6%A0%87%E8%BD%B4%E8%BE%85%E5%8A%A9%E5%99%A8.gif)

红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴

## 设置物体移动

```js
function render() {
  cube.position.x += 0.01
  if (cube.position.x > 5) {
    cube.position.x = 0
  }
  renderer.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}
```

打印之前创建的物体`cube`其属性`positon`为一个三维向量对象，通过`set`进行设置，当然也可以通过更改对象属性值更改物体的位置

## 物体的缩放与旋转

`scale`缩放;`rotation`旋转两者使用和位置差不多,通过`set`进行设置，当然也可以通过更改对象属性值更改物体的位置

旋转有第四个参数代表表示旋转顺序的字符串，默认为`"XYZ"`

## GSAP 动画库

```shell
npm i gsap
```

### gsap.to()

[官方文档：gsap.to](<https://greensock.com/docs/v3/GSAP/gsap.to()>)

定义**目标值**，动画**到**某些值

参数 1:`target`:您要为其属性设置动画的对象,可以是选择器文本，如`".class"`,`"#id"`等.也可以是对元素、对象甚至对象数组的直接引用

参数 2:`vars`:一个对象，包含您要设置动画的所有属性

| 属性       | 含义                                     |
| ---------- | ---------------------------------------- |
| ease       | 动画的变化率                             |
| duration   | 动画运行时间                             |
| delay      | 动画延迟时间                             |
| onComplete | 动画完成回调                             |
| repeat     | 动画重复次数，-1 为无限次循环            |
| onStart    | 动画开始回调                             |
| yoyo       | 布尔值。是否往返运动，需设置 repeat 属性 |

该方法返回值为一个动画对象，可对其属性进行设置，达到操作动画的目的

| 属性/方法  | 含义                     |
| ---------- | ------------------------ |
| pause()    | 暂停动画                 |
| isActive() | 动画是否运动，返回布尔值 |
| resume()   | 继续播放动画             |

## 根据尺寸变化实现自适应画面

```js
// 监听画面变化 更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
```

## 设置控制器的阻尼

`enableDamping` 将其设置为`true`以启用阻尼（惯性），这将给控制器带来重量感。默认值为 false。
请注意，如果该值被启用，你将必须在你的动画循环里调用.update()

```js
controls.enableDamping = true

// ....

function render() {
  renderer.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
  // 调用 update()
  controls.update()
}

render()
```

## 调用 js 接口控制画布全屏和退出全屏

```js
window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement
  if (fullScreenElement) {
    // 存在全屏元素 退出全屏
    document.exitFullscreen()
  } else {
    // 进入全屏
    renderer.domElement.requestFullscreen()
  }
})
```

## 应用图形用户界面更改变量

```shell
npm i dat.gui
```

### 常见用法

```js
import * as dat from 'dat.gui'
const GUI = new dat.GUI()
const params = {
  color: 0xffff00,
  fn: () => {
    gsap.to(cube.position, {
      yoyo: true,
      repeat: -1,
      x: 5,
      duration: 2,
      onComplete: () => {
        console.log('动画完成')
      }
    })
  }
}
GUI.add(cube.position, 'x')
  .min(0)
  .max(10)
  .name('移动x轴')
  .onChange(val => {
    console.log(`x轴移动到了${val}`)
  })
  .onFinishChange(val => {
    console.log('完全停下来', val)
  })
// 设置颜色
GUI.addColor(params, 'color')
  .onChange(val => {
    cube.material.color.set(val)
  })
  .name('颜色设置')
// 设置文件夹
const folder = GUI.addFolder('文件夹1')
// 显示隐藏
folder.add(cube, 'visible').name('是否显示')
// 执行函数
folder.add(params, 'fn').name('正方体运动')
```
