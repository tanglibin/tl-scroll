import TlScroll from './Scroll.vue'


// 如果vue是全局变量,使用自动全局安装。
if (typeof window !== 'undefined' && window.Vue) {
    Vue.component(TlScroll.name, TlScroll)
}

TlScroll.install = Vue => Vue.component(TlScroll.name, TlScroll);//注册组件
export default TlScroll