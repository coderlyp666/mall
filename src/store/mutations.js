import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

// mutations唯一的目的就是修改state种状态
// mutations中的每一个方法尽可能完成的事情比较单一一点
export default {
  [ADD_COUNTER](state, params) {
    params.count++;
  },
  [ADD_TO_CART](state, params) {
    params.checked = true;
    state.cartList.push(params);
  },
  changeIsSelectAll(state) {
    state.isSelectAll = !state.isSelectAll;
  },
  IsSelectAllFalse(state) {
    state.isSelectAll = false;
  },
  IsSelectAllTrue(state) {
    state.isSelectAll = true;
  },
};
