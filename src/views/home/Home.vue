<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 必须为scroll标签指定高度 -->
    <!-- :probe-type: 只要不加冒号, 会把值统一当成字符串传过去 -->
    <scroll class="content" ref="scroll"  :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <!-- <goods-list :goods="goods[currentType].list"></goods-list> -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- .native: 监听组件根元素的原生事件 -->
    <!-- 如果想要监听组件的点击事件, 必须添加.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  
    <!-- ul>li{列表$}*10 -->
    <!-- <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
    </ul> -->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView';
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home';

  // import {
  //   getHomeMultidata,
  //   getHomeGoods
  // } from 'network/home';

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // 等组件一创建完就发送网络请求
    created() {     // 在created里面只写主要逻辑
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    }, 
    methods: {    
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2: 
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        // scrollTo(x, y, ms)
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)

        // 解决滚动的bug问题
        // 监听在图片加载完的时候调用refresh()方法
        // 重新计算所有可滚动区域(最新的可滚动高度)
        // this.$refs.scroll.scroll.refresh()
      },

      /**
       * 网络请求相关的方法
       */
      // 在methods里面进行相关的请求
      getHomeMultidata() {
        // 函数里面的所有数据都是局部变量, 当函数一旦执行完, 函数里面所有变量都会被内存回收掉
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // ...: 可以对当前数组进行解析, 将里面的元素一一取出来, 再push到另一个数组里面
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          
          // this.$refs.scroll.scroll.finishPullUp()
          this.$refs.scroll.finishPullUp()
        }) 
      },
      
    },
  }
</script>
  

<style scoped>
  /* scoped: 作用域 
    加上scoped属性之后，在这里写的所有样式只会针对于当前组件起效果
   */

  #home {
    /* padding-top: 44px;  */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9; 
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>