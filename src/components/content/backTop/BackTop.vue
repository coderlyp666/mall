<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    z-index: 9;
    bottom: 60px;
    right: 12px;
  }

  .back-top img {
    width: 60px;
    height: 60px;
  }
</style>
