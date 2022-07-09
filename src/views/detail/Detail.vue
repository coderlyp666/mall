<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      :theme-top-ys="themeTopYs"
      @titleClick="titleClick"
      ref="nav"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <goods-base-info-vue :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="goods" />
    </scroll>
    <back-top @click.native="BackClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :massage="massage" :show="isShow" /> -->
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import GoodsBaseInfoVue from "./childComps/GoodsBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";

import { backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

//import Toast from "../../components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      // massage: "",
      // isShow: false,
    };
  },
  mixins: [backTopMixin],
  created() {
    //1.保存请求过来的iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      //2.根据iid请求详情数据
      const data = res.result;
      console.log(res);
      //2.1获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      //2.2获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //取出店铺信息
      this.shop = new Shop(data.shopInfo);

      //取出参数信息
      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //获取推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailShopInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsBaseInfoVue,
    GoodsList,

    Scroll,

    // Toast,
  },

  methods: {
    // 给getThemeTopY进行赋值
    ...mapActions(["addCart"]),
    /* // 第一次渲染：
      // this.$refs.params.$el这个没有值，还没有被渲染玩
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 其他页面渲染完成之后，在进行这个函数的回调
      // 第二次获取
      // 从home点进去，图片是没有加载完成的，就是图片没有就算再offsetTop之内
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      }); */

    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // 获取滚动的位置
      this.isShowBackTop = -position.y > 1000;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          //  console.log(this.currentIndex);
        }
      }
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.nowPrice = this.goods.nowPrice;
      product.iid = this.iid;

      this.addCart(product).then((res) => {
        // this.massage = res;
        // this.isShow = true;
        // console.log(res);
        // setTimeout(() => {
        //   this.isShow = false;
        // }, 2000);
        this.$toast.show(res);
      });
      // this.$store.dispatch("addCart", product).then((res) => {
      //    console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 11;
}
.content {
  height: calc(100% - 44px);
}
</style>
