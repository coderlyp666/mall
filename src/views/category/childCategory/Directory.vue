<template>
  <div class="directory-list">
    <scroll id="directory" ref="scroll">
      <div
        class="directory-list-item"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Directory",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Scroll,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //console.log(this.currentIndex);
      this.$emit("selectItem", this.currentIndex);
    },
  },
};
</script>

<style scoped>
#directory {
  position: absolute;
  background-color: #f6f6f6;
  height: calc(100% - 44px - 49px);
  width: 100px;
  overflow: hidden;
}
.directory-list-item {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.active {
  background-color: white;
  border-left: 4px solid var(--color-tint);
  font-weight: 700;
  color: var(--color-tint);
}
</style>
