import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  addCart(context, params) {
    return new Promise(function (resolve) {
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === params.iid
      );

      //2.判断oldProduct
      if (oldProduct) {
        //oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("该商品数量加1");
      } else {
        params.count = 1;
        //context.state.cartList.push(params);
        context.commit(ADD_TO_CART, params);
        resolve("你以添加该商品");
      }
    });
  },
};
