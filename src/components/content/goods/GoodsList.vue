<template>
    <div class="goods-list">
      <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index"/>
<!--      {{goods}}-->
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }

      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
