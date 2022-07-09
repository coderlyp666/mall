<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div class="center" slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommends-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="BackClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendsView from "./childComps/RecommendsView";
import FeatureView from "./childComps/FeatureView";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { backTopMixin } from "common/mixin";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      seveY: 0,
    };
  },
  mixins: [backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    RecommendsView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  mounted() {
    //请求多条数据
    this.getHomeMultidata();

    //请求商品
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //监听item中图片加载完成的事件
    this.$bus.$on("ItemImageLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  activated() {
    //将获取的位置赋值
    this.$refs.scroll.scrollTo(0, this.seveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //离开前获取已经滚动到的位置
    this.seveY = this.$refs.scroll.scroll.y;
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      if (index == 0) {
        this.currentType = "pop";
      } else if (index == 1) {
        this.currentType = "new";
      } else {
        this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabControls是否吸顶（position : fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    pullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //console.log(this.$refs.tabControl2.$el.offsetTop - 52);
    },

    /*网络请求的相关方法*/
    // 获取轮播图和导航栏的数据的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据的方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.center {
  color: white;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.tab-control {
  position: relative;
  z-index: 10;
  background-color: white;
  padding-bottom: 5px;
}
</style>
