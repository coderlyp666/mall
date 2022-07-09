<template>
  <div class="toast" v-show="isShow">
    <div>{{ massage }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // massage: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      massage: "",
      isShow: false,
    };
  },
  methods: {
    show(massage = "默认文字", duration = 2000) {
      this.massage = massage;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
