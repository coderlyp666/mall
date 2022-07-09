<template>
  <div class="directory-list">
    <div
      v-for="(item, index) in categoryData"
      :key="index"
      class="directory-list-item"
    >
      <!-- <directory-content-item :item="item" /> -->
      <a :href="item.link" class="a">
        <img :src="item.image" />
        <div class="item-text">
          {{ item.title }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import DirectoryContentItem from "./DirectoryContentItem";
export default {
  name: "DirectoryContent",
  props: {
    categoryData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    //  DirectoryContentItem,
    Scroll,
  },
};
</script>

<style scoped>
/* .content {
  width: calc(100% - 100px);
  height: calc(100% - 44px - 49px);
  display: inline-block;
  float: right;
  position: absolute;
  right: 0;
  margin-top: 10px;
} */
.directory-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  position: relative;
}
.directory-list-item img {
  width: 65px;
  height: 65px;
}
.directory-list-item {
  width: 33%;
  text-align: center;
  font-size: 12px;
  height: auto;
  margin-bottom: 10px;
}
.a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
