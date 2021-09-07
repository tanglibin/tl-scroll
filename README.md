tl-scroll
===

| Chrome | Firefox | Safari | Edge |               IE               |
| :----: | :-----: | :----: | :--: | :----------------------------: |
|   √    |    √    |   √    |  √   | `9`  √<br />`10` √<br />`11` √ |

> 还未在移动端进行过测试)

## Feature:
* [x] 支持设置滚动条大小
* [x] 支持根据内容变动自动显示隐藏滚动条
* [x] 提供相应滚动事件回调
* [x] 支持动态设定滚动位置


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


## 事件

### updated
{el, width, height, type}
* 参数`el`

  > 变动的元素。

* 参数`width`

  > 元素变动后的宽度。

* 参数`height`

  > 元素变动后的高度。
  
* 参数`type`

  > 变动类型，0：内容部分变动， 1：滚动容器变动。

* 说明
  在滚动容器大小或内容区大小改变时调用。

  ```html
  <tl-scroll @updated="updated">
       <!-- 你的内容 -->
  </tl-scroll>
  ```

### scroll
skin.scrollTop, skin, 0
* 参数`value`

 > scrollTop 或 scrollLeft

* 参数`dom`

 > 当前元素

* 参数`type`

 > 0: 竖向滚动； 1：横向滚动

* 说明
  监听滚动条滚动事件。

  ```html
  <tl-scroll @scroll="scroll">
       <!-- 你的内容 -->
  </tl-scroll>
  ```


## 方法

### scroll(x, y)
### scrollLeft(x)
### scrollTop(y)

* 说明
  滚动至指定位置。通过ref进行调用