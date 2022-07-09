<template>
  <div class="tar-bar-item" @click="itemClick">
    <slot name="item-icon" v-if="!isActive"></slot>
    <slot name="item-icon-active" v-else></slot>

    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        // isActive:true;
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path);
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {};
      }
    }
  }
</script>

<style scoped>
  .tar-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tar-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align:middle;
    margin-top: 2px;

  }

</style>
