<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image"/>

        <div> <span>{{item.title}}</span></div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendsView",
    props:{
    recommends:{
      type: Array,
      default() {
        return [];
      }
    }
    }
  }
</script>

<style scoped>
.recommends{
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eeeeee;
  font-size: 12px;
}
.recommends div{
  flex: 1;
}
  .recommends img{
    width: 65px;
    height: 65px;
  }
</style>
