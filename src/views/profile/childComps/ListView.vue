<template>
  <div class="ListView">
    <div class="topView">
      <div class="item">
        <div class="money"><span>00.0</span>元</div>
        <div class="text">我的余额</div>
      </div>
      <div class="item">
        <div class="money"><span>00.0</span>元</div>
        <div class="text">我的余额</div>
      </div>
      <div class="item">
        <div class="money"><span>00.0</span>元</div>
        <div class="text">我的余额</div>
      </div>
    </div>
    <div class="centerView">
      <div class="centerViewList" style="border-bottom: 18px solid #f5f5f5">
        <div class="centerViewListItem">
          <span>我的消息</span>
        </div>
        <div class="centerViewListItem">
          <span>积分商城</span>
        </div>
        <div class="centerViewListItem">
          <span>会员卡</span>
        </div>
      </div>
      <div class="centerViewList">
        <div class="centerViewListItem">
          <span>我的消息</span>
        </div>
        <div class="centerViewListItem">
          <span>积分商城</span>
        </div>
        <div class="centerViewListItem">
          <span>会员卡</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
};
</script>

<style>
.topView {
  height: 100px;
  display: flex;
  border-bottom: 18px solid #f5f5f5;
}
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #cccccc;
}

.money {
  margin-bottom: 3px;
}
.money span {
  font-size: 28px;
  font-weight: 700;
  color: red;
}
.centerView {
  width: 100%;
}
.centerViewListItem {
  width: 90%;
  border-bottom: 2px solid #f0f0f0;
  margin-left: 10%;
  height: 50px;
  color: #000;
  font-size: 18px;
  line-height: 50px;
}
</style>
