<template>
  <div class="buttom-bar">
    <div class="select-all">
      <check-button
        class="check-button"
        @click.native="clickSelectAll"
        :isChecked="isSelectAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计: ¥{{ totalPrice }}</div>
    <div class="buy-product" @click="calcClick">去计算({{ cartCount }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartButtomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.count * item.nowPrice;
        }, 0)
        .toFixed(2);
    },
    cartCount() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      //return !this.cartList.filter((item) => !item.checked).length;
      return this.cartList.length
        ? !this.cartList.filter((item) => !item.checked).length
        : false;
    },
  },
  methods: {
    clickSelectAll() {
      console.log("clickSelectAll");
      this.$store.commit("changeIsSelectAll");
      if (this.$store.state.isSelectAll) {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      }
    },
    calcClick() {
      // 判断去计算时，购物车里面的数据有没有，然后弹出文字
      if (!this.cartCount) {
        this.$toast.show("请选择购买的商品");
      }
    },
  },
};
</script>

<style scoped>
.buttom-bar {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 50px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.buttom-bar .select-all {
  width: 60px;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.buttom-bar .select-all .check-button {
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.buttom-bar .total-price {
  flex: 1;
  margin-left: 20px;
}
.buttom-bar .buy-product {
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
}
</style>
