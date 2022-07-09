<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center" class="center">商品分类</div>
    </nav-bar>

    <div class="fiex">
      <directory :categories="categories" @selectItem="selectItem"></directory>
      <scroll class="scroll">
        <directory-content
          :categoryData="categoryData"
          ref="directoryContent"
        />
        <tab-control
          class="tab-control"
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tabControl"
        />
        <goods-list :goods="goods" class="goods-list" ref="goods" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabcontrol/TabControl";

import Directory from "./childCategory/Directory";
import DirectoryContent from "./childCategory/DirectoryContent";

import GoodsList from "components/content/goods/GoodsList";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
export default {
  name: "Cetegory",
  data() {
    return {
      categories: [],
      categoryData: [],
      goods: [],
      getHeight: 0,
      currentType: "pop",
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    //网络请求相关方法
    getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        console.log(res);
        // 2.将请求的数据保存
        this.categories = res.data.category.list;
        //console.log(this.categories);

        // 3.请求第一个分类的目录数据
        this._getSubcategory(0);

        // 4.请求第一个分类的数据
        this._getCategoryDetail(this.currentType, 0);
        // this.getHeight = this.$refs.directoryContent.$el.offsetHeight;
        // console.log(this.$refs.directoryContent.$el.offsetHeight);
        // this.$refs.goods.$el.style.top = this.getHeight + 100 + "px";
        // console.log(this.$refs.goods.$el.offsetTop);
      });
    },
    _getSubcategory(index) {
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        this.categoryData = res.data.list;
        // console.log(this.categoryData);
      });
    },

    _getCategoryDetail(type, index) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[index].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        console.log(res);
        this.goods = [];
        this.goods = res;
      });
    },

    selectItem(index) {
      console.log(index);
      this._getSubcategory(index);
      this._getCategoryDetail(this.currentType, index);
    },

    tabClick(index) {
      if (index == 0) {
        this.currentType = "pop";
      } else if (index == 1) {
        this.currentType = "new";
      } else {
        this.currentType = "sell";
      }
      console.log(this.currentType);
      this.$refs.tabControl.currentIndex = index;
      // this.$refs.tabControl2.currentIndex = index;
    },
  },
  components: {
    NavBar,
    GoodsList,
    TabControl,

    Scroll,
    Directory,
    DirectoryContent,
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  color: white;
  font-weight: 600;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}

.scroll {
  position: absolute;
  width: calc(100% - 100px);
  height: calc(100% - 44px - 49px);
  right: 0;
  margin-top: 10px;
  overflow: hidden;
}
.goods-list {
  width: 100%;
}
</style>
