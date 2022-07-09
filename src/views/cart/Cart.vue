<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-buttom-bar ref="cartbuttom" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

import CartList from "./childCart/CartList.vue";
import CartButtomBar from "./childCart/CartButtomBar.vue";

import { mapGetters } from "vuex";
export default {
  components: { NavBar, CartList, CartButtomBar },
  computed: {
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      cartLength: "cartLength",
    }),
  },
  name: "Cart",
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
