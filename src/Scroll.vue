<template>
    <section :class="['tl__scroll', boxClass]" ref="box" v-resize="debounce(updated, 20)">
        <div class="tl_scroll__wrap" ref="wrap">
            <div class="tl_scroll__skin" ref="skin" @scroll="handleScroll">
                <div class="tl_scroll__view" ref="view" v-resize="debounce(updated, 20)">
                    <slot />
                </div>
            </div>
        </div>
        <div class="tl_scroll__bar vertical" ref="bar_y" @mousedown="handleClickTrack($event, 0)" :style="{'width': size+'px', 'bottom': (showX ? size : 0)+'px', 'z-index': zIndex}">
            <div class="tl_scroll__thumb" ref="thumb_y" @mousedown="handleDragThumb($event, 'y')" :style="{'height': barHeight+'px', 'top': thumbY+'px'}"></div>
        </div>
        <div class="tl_scroll__bar horizontal" ref="bar_x" @mousedown="handleClickTrack($event, 1)" :style="{'height': size+'px', 'right': (showY ? size : 0)+'px', 'z-index': zIndex}">
            <div class="tl_scroll__thumb" ref="thumb_x" @mousedown="handleDragThumb($event, 'x')" :style="{'width': barWidth+'px', 'left': thumbX+'px'}"></div>
        </div>
    </section>
</template>

<script>
import {isIE, isShowScroll, tlScrollTo} from './util';
export default {
    name: 'TlScroll',
    props: {
        // 滚动条尺寸
        size: { 
            type: Number, 
            default: 6 
        },
        overflowX: { //是否显示横向滚动条
            type: Boolean,
            default: true
        },
        overflowY: { //是否显示竖向滚动条
            type: Boolean,
            default: true
        },
        zIndex: { //滚动条堆叠顺序
            type: Number
        }
    },
    data(){
        return {
            showX: false, //是否显示横向滚动条
            showY: false, //是否显示竖向滚动条

            barHeight: 0, //竖向滚动条高度
            barWidth: 0, //横向滚动条宽度
            
            ratioX: 1,//横向滚动条滚动条滚动和内容滚动的比例
            ratioY: 1, //竖向滚动条滚动条滚动和内容滚动的比例

            thumbY: 0, //竖向滚动条滚动值
            thumbX: 0, //横向滚动条滚动值

            stepY: 0, //竖向滚动条点击滚槽时步进偏移度
            stepX: 0, //横向滚动条点击滚槽时步进偏移度

            interval: null, //鼠标点击滚槽时会循环执行滚动，直至滚动至点击处，该属性保存定时对象
            drag: null, //拖拽滚动内条的时候标识拖动的是横向还是竖向
            client: 0, //拖拽时点击的位置点
        }
    },
    computed: {
        /**容器额外样式，用以控制padding及滚动条的显示 */
        boxClass(){
            let {showX, showY} = this;
            let cls = `${showX ? '__horizontal' : ''}${showY ? '__vertical' : ''}`;
            return cls ? 'tl'+cls : '';
        },
    },
    mounted(){
        this.$nextTick(this.updated);
        window.addEventListener('mouseup', this.mouseUp);
    },
    destroyed(){
        window.removeEventListener("mouseup",this.mouseUp);
        this.observer && this.observer.disconnect();
    },
    directives: {
        'resize': {
            bind: function(el, binding) {
                let width = '', height = '';
                function get() {
                    const elStyle = el.currentStyle ? el.currentStyle : document.defaultView.getComputedStyle(el, null);
                    if (width !== elStyle.width || height !== elStyle.height) {
                        let type = Number(/tl__scroll/.test(el.className));
                        binding.value({el, width: elStyle.width, height: elStyle.height, type});
                    }
                    width = elStyle.width;
                    height = elStyle.height;
                }
                el.__vueReize__ = setInterval(get, 20);
            },
            unbind: function(el) {
                clearInterval(el.__vueReize__);
            }
        }
    },
    methods: {
        /**方法防抖 */
        debounce(fun, delay) {
            let timeout;
            return function() {
                let contx = this; 
                let args = arguments;
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    fun.apply(contx, args);
                }, delay);
            };
        },
        /**更新滚动条位置 */
        updated(bindingData){
            let {box, view, skin} = this.$refs;
            let {size, overflowX, overflowY} = this;
            // 获取是否显示滚动条
            skin.removeAttribute('style');
            let {showX, showY} = isShowScroll(view, box, size, overflowX, overflowY);
            this.showX = showX;
            this.showY = showY;
            box.style.padding = `0 ${showY ? size : 0}px ${showX ? size : 0}px 0`;

            let {wrap} = this.$refs;

            skin.style.height = wrap.clientHeight + 17 + 'px';
            skin.style.width = wrap.clientWidth + 17 + 'px';

            // 横向滚动条
            if(showX){
                let scrollWidth = skin.scrollWidth;
                let offsetWidth = wrap.offsetWidth;

                this.barWidth = offsetWidth ** 2 / scrollWidth;
                let diff = offsetWidth - this.barWidth;
                this.ratioX = (scrollWidth - offsetWidth) / diff;
                this.thumbX = skin.scrollLeft / this.ratioX;
                this.stepX = diff / 5;
            }else{
                this.barWidth = 0;
            }

            // 竖向滚动条
            if(showY){
                let scrollHeight = skin.scrollHeight;
                let offsetHeight = wrap.offsetHeight;

                this.barHeight = offsetHeight ** 2 / scrollHeight;
                let diff = offsetHeight - this.barHeight;
                this.ratioY = (scrollHeight - offsetHeight) / diff;
                this.thumbY = skin.scrollTop / this.ratioY;
                this.stepY = diff / 5;
            }else{
                this.barHeight = 0;
            }
            this.$emit('updated', bindingData);
        },

        /** 滚动事件 */
        handleScroll(){
            let skin = this.$refs.skin;
            let y = skin.scrollTop / this.ratioY;
            let x = skin.scrollLeft / this.ratioX;

            if(y != this.thumbY){
                this.thumbY = y;
                this.$emit('scroll', skin.scrollTop, skin, 0);
            }
            if(x != this.thumbX){
                this.thumbX = x;
                this.$emit('scroll', skin.scrollLeft, skin, 1);
            }
        },

        /** 滚动槽点击 */
        handleClickTrack(e, type){

            let _this = this;
            let {wrap, skin} = _this.$refs;

            let offset;
            let thumb;
            let max;
            let isGt;
            let step;
            let ratio;
            let gtStop;

            // 竖向滚动条
            if(type == 0){
                offset = e.offsetY;
                thumb = _this.thumbY;
                max = wrap.clientHeight - _this.barHeight;
                isGt = offset > thumb;
                step = isGt ? _this.stepY : -_this.stepY;
                ratio = _this.ratioY;
                gtStop = offset-_this.barHeight;

            }else{
                offset = e.offsetX;
                thumb = _this.thumbX;
                max = wrap.clientWidth - _this.barWidth;
                isGt = offset > thumb;
                step = isGt ? _this.stepX : -_this.stepX;
                ratio = _this.ratioX;
                gtStop = offset-_this.barWidth;
            }

            let interval = setInterval(() => {
                thumb += step;
                if(thumb > max){
                    thumb = max;
                    clearInterval(interval);
                }
                else if(thumb < 0){
                    thumb = 0;
                    clearInterval(interval);
                }
                if((isGt && thumb>= gtStop) || (!isGt && thumb<= offset)){
                    clearInterval(interval);
                }
                tlScrollTo(skin, thumb * ratio, type);
            }, 50)
            _this.interval = interval;
        },

        /** 滚动内条点击 */
        handleDragThumb(e, type){
            isIE() ? (e.returnValue = false, e.cancelBubble = true) : (e.stopPropagation(), e.preventDefault());
            document.onselectstart = () => false;
            this.drag = type;
            if(type == 'x'){
                this.client = e.clientX;
            }else{
                this.client = e.clientY;
            }
            window.addEventListener('mousemove', this.mouseMove);
        },

        /** 鼠标移动事件 */
        mouseMove(e){
            let {drag, client, ratioX, ratioY} = this;
            let {skin} = this.$refs;
            if(drag){
                if(drag == 'x'){
                    skin.scrollLeft += (e.clientX - client) * ratioX;
                    this.client = e.clientX;
                }else{
                    skin.scrollTop += (e.clientY - client) * ratioY;
                    this.client = e.clientY;
                }
            }
        },

        /**鼠标松开 */
        mouseUp(){
            clearInterval(this.interval);
            this.drag = null;
            document.onselectstart = () => true;
            window.removeEventListener('mousemove', this.mouseMove);
        },

        /**暴露给外部用 */
        scroll(x=0, y=0){
            this.scrollTop(y);
            this.scrollLeft(x);
        },

        /**暴露给外部用 */
        scrollLeft(x){
            if(x === undefined){
                return this.$refs.skin.scrollLeft;
            }
            this.$refs.skin.scrollLeft = x;
        },

        /**暴露给外部用 */
        scrollTop(y){
            if(y === undefined){
                return this.$refs.skin.scrollTop;
            }
            this.$refs.skin.scrollTop = y;
        }
    }
};
</script>
<style lang="less">
.tl__scroll, .tl_scroll__wrap{position: relative;overflow: hidden;box-sizing: border-box;}
.tl__horizontal .horizontal,
.tl__vertical .vertical,
.tl__horizontal__vertical .horizontal,
.tl__horizontal__vertical .vertical{display: block;}


.tl_scroll__wrap{width: 100%;height: 100%;}
.tl_scroll__skin{overflow: scroll;}
.tl_scroll__skin::-webkit-scrollbar {width: 17px;height: 17px;}
.tl_scroll__view{display: inline-block;min-width: 100%;}
.tl_scroll__bar{
    &{position: absolute;display: none;/*background-color: #F5F5F5;*/}
    &.vertical{
        &{top: 0;right: 0;}
        .tl_scroll__thumb{width: 100%;}
    }
    &.horizontal{
        &{left: 0;bottom: 0;}
        .tl_scroll__thumb{height: 100%;}
    }
    .tl_scroll__thumb{
        &{position: relative;background: #ccc;border-radius: 10px;}
        &:active{background: #737272;}
    }
}
</style>