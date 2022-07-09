<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="BackClick">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  props: {
    themeTopYs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;

      // this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 200);
      this.$emit("titleClick", index);
      // console.log(index);
      // console.log(this.themeTopYs[index]);
    },
    BackClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>
