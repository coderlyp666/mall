<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton
        @click.native="checkClick"
        :is-checked="product.checked"
      ></CheckButton>
      -->
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ product.nowPrice }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
      // for (var i = 0; i < this.cartList.length; i++) {
      //   if (!this.cartList[i].checked) {
      //     this.$store.commit("IsSelectAllFalse");
      //     // this.$store.state.isSelectAll = false;
      //     break;
      //   } else {
      //     this.$store.commit("IsSelectAllTrue");
      //     //this.$store.state.isSelectAll = true;
      //   }
      // }
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 120px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
