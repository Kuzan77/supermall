<template>
  <!-- 
    ref如果是绑定在组件中的, 那么通过this.$refs.refname获取到的是一个组件对象.
    ref如果是绑定在普通的元素中, 那么通过this.$refs.refname获取到的是一个元素对象.
   -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 通过document.querySelector拿到的东西不一定是准确的
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 必须设置click: true, 才能监听scroll标签里面一些元素的点击事件
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 返回顶部
      // time=300: ES6里面为参数指定默认值
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
  }
</script>

<style scoped>

</style>