tl-scroll
===

| Chrome | Firefox | Safari | Edge |               IE               |
| :----: | :-----: | :----: | :--: | :----------------------------: |
|   √    |    √    |   √    |  √   | `9`  √<br />`10` √<br />`11` √ |

> 还未在移动端进行过测试)

## Feature:
* [√] 支持设置滚动条大小
* [√] 支持根据内容变动自动显示隐藏滚动条
* [√] 提供相应滚动事件回调
* [√] 支持动态设定滚动位置



## tl-scroll 是干嘛的

`tl-scroll`是一款基于vue2.0的滚动条插件。

此插件致力**解决原生滚动条在不同系统、不同浏览器中的丑陋表现**，在保证原生滚动条功能可用的基础上实现了更丰富的功能、保证在所支持的浏览器下展现出风格一致、交互体验一致的滚动条。

它可以让你无需关心滚动条的兼容性问题，无需关心`内容区域`的宽高，可以根据内容大小`自动显示或隐藏滚动条`。


## 安装

1. npm
  推荐使用`npm`，这样可以跟随你的`webpack`配置去选择怎样打包。

  ```
  npm i -S tl-scroll
  ```

## 注册组件

1. 全局注册

   ```vue
   <template>
     <tl-scroll>
       <!-- 你的内容 -->
     </tl-scroll>
   </template>
   <script>
    import Vue from 'vue'
    import TlScroll from 'tl-scroll'
    Vue.use(TlScroll)
   </script>
   ```

2. 局部注册

   ```vue
   <template>
     <tl-scroll>
       <!-- 你的内容 -->
     </tl-scroll>
   </template>
   <script>
     import { TlScroll } from 'tl-scroll'
     export default {
         name: '',
         components: {TlScroll} //在组件内注册
     }
   </script>
   ```

## 属性

### size

* 类型`Number`

* 默认值`6`

* 用法:

  ```html
    <tl-scroll :size="6">
       <!-- 你的内容 -->
    </tl-scroll>
  ```

  设置滚动条的大小

### overflow-x
* 类型`Boolean`

* 默认值`true`

* 用法:

  ```html
    <tl-scroll :overflow-x="true">
       <!-- 你的内容 -->
    </tl-scroll>
  ```

  是否显示横向滚动条

### overflow-y
* 类型`Boolean`

* 默认值`true`

* 用法:

  ```html
    <tl-scroll :overflow-y="true">
       <!-- 你的内容 -->
    </tl-scroll>
  ```

  是否显示纵向滚动条

### z-index
* 类型`Number`

* 用法:

  ```html
    <tl-scroll :z-index="9">
       <!-- 你的内容 -->
    </tl-scroll>
  ```

  滚动条堆叠顺序。`仅控制滚动条，若整个滚动容器需要，可自行在容器上通过样式控制`


## 事件

### updated({el, width, height, type})

* 在滚动容器大小或内容区大小改变时调用。

* 参数`el`

  > 变动的元素。

* 参数`width`

  > 元素变动后的宽度。

* 参数`height`

  > 元素变动后的高度。
  
* 参数`type`

  > 变动类型，0：内容部分变动， 1：滚动容器变动。



  ```html
  <tl-scroll @updated="updated">
       <!-- 你的内容 -->
  </tl-scroll>
  ```

### scroll(value, dom, type)

* 监听滚动条滚动事件。

* 参数`value`

  > scrollTop 或 scrollLeft

* 参数`dom`

  > 当前元素

* 参数`type`

  > 0: 竖向滚动； 1：横向滚动


  ```html
  <tl-scroll @scroll="scroll">
       <!-- 你的内容 -->
  </tl-scroll>
  ```


## 方法
* 说明
  滚动至指定位置。通过ref进行调用
### scroll(x=0, y=0)
* 根据所传x、y轴数值，滚动至指定位置
### scrollLeft(x)
* 横向滚动条滚动至指定位置，无参时则返回当前所在的滚动位置
### scrollTop(y)
* 纵向滚动条滚动至指定位置，无参时则返回当前所在的滚动位置


## 更新日志:

* [ 1.2.2 ]  关闭横向滚动条时，内容区域宽度100%展示
* [ 1.2.1 ]  修复组件内部无法使用父级宽度百分比问题
* [ 1.2.0 ]  修复组件局部注册失败问题
* [ 1.1.3 ]  updated事件添加防抖处理
* [ 1.1.2 ]  新增 z-index 属性；scrollLeft、scrollTop 方法支持获取当前滚动位置
* [ 1.1.1 ]  新增 overflow-y 和 overflow-x 属性
* [ 1.1.0 ]  修复 updated 事件中参数数值错误问题
* [ 1.0.1 ]  基础正式版
* [ 1.0.0 ]  测试版本