<template>
  <div class="directory-list-item">
    <a :href="item.link">
      <div class="directory-list-item-img">
        <img :src="item.image" />
      </div>
      {{ item.title }}
    </a>
  </div>
</template>

<script>
export default {
  name: "DirectoryContentItem",
  item: {
    type: Object,
    default() {
      return {};
    },
  },
};
</script>

<style></style>
