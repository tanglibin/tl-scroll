<template>
  <div>
    <button @click="height+=100">wrap高度+</button>
    <button @click="height-=100">wrap高度-</button>
    <button @click="m1">增加内容</button>
    <button @click="m2">减少内容</button>
    <tl-scroll style="width:300px; border:1px solid #f00" :style="{height: height+'px'}" @updated="updated" :overflow-x="true">
        <p v-for="(item, i) in list" :key="i" style="white-space: nowrap;">{{item}}</p>
    </tl-scroll>
  </div>
</template>

<script>
import TlScroll from '../src/Index.vue'
export default {
    components:{
      TlScroll
    },
    data(){
        return {
            height: 300,
            list: [
                '春江潮水连海平，海上明月共潮生。',
                '滟滟随波千万里，何处春江无月明！',
                '江流宛转绕芳甸，月照花林皆似霰；',
                '空里流霜不觉飞，汀上白沙看不见。',
                '江天一色无纤尘，皎皎空中孤月轮。',
                '江畔何人初见月？江月何年初照人？',
                '人生代代无穷已，江月年年望相似。',
                '不知江月待何人，但见长江送流水。',
                '白云一片去悠悠，青枫浦上不胜愁。',
                '谁家今夜扁舟子？何处相思明月楼？',
                '可怜楼上月裴回，应照离人妆镜台。',
                '玉户帘中卷不去，捣衣砧上拂还来。',
                '此时相望不相闻，愿逐月华流照君。',
                '鸿雁长飞光不度，鱼龙潜跃水成文。',
                '昨夜闲潭梦落花，可怜春半不还家。',
                '江水流春去欲尽，江潭落月复西斜。',
                '斜月沉沉藏海雾，碣石潇湘无限路。',
                '不知乘月几人归，落月摇情满江树。落月摇情满江树。落月摇情满江树。',
            ]
        }
    },
    methods: {
        m1(){
            let arr = [
                'a此时相望不相闻，愿逐月华流照君。',
                'b鸿雁长飞光不度，鱼龙潜跃水成文。',
                'c昨夜闲潭梦落花，可怜春半不还家。',
                'd江水流春去欲尽，江潭落月复西斜。',
                'e斜月沉沉藏海雾，碣石潇湘无限路。',
                'f不知乘月几人归，落月摇情满江树。',
            ]
            this.list = this.list.concat(arr);
        },
        m2(){
            this.list = this.list.slice(0, 5)
        },
        updated(bindingData={}){
            console.log(bindingData);
        }
    }
}
</script>