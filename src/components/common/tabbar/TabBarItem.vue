<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot  name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }  
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 通过计算属性判断处于活跃状态路由的路径是否包含通过props传递的路径  是(返回true)  否(返回false)
        // 例: /home -> item1(/home) = true
        //     /home -> item1(/category) = false
        //     /home -> item1(/shopcart) = false
        //     /home -> item1(/profile) = false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        // 条件运算符也叫做三元运算符
        // 1.语法：条件表达式？语句1：语句2；
        // 2.执行的流程：
        //  (1).条件运算符在执行时，首先对条件表达式进行求值
            // 如果该值为true，则执行语句1，并返回执行结果
            // 如果该值为false，则执行语句2，并返回执行结果
        //  (2).如果条件的表达式的求值结果是一个非布尔值；
            // 会将其转换为布尔值，然后再运算
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path)
      }
    },
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }  
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /* 删除图片多出的3像素(缩小图片与文字之间的距离) */
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>