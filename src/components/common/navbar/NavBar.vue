<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* 添加阴影   
        text-shadow:offsetX offsetY blur color;
        offsetX:水平偏移（X轴）
        offsetY:垂直偏移（Y轴）
        blur:阴影的模糊值
        color:阴影颜色
			*/
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
    /* background-color: red; */
  }
  .center {
    /* 占据所有剩余宽度 */
    flex: 1;
    /* background-color: blue; */
  }
</style>