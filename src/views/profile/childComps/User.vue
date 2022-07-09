<template>
  <div class="user">
    <div class="user-left">
      <div class="portrait"></div>
      <div class="message">
        <div class="login">登录/注册</div>
        <div class="phone">暂无绑定手机号</div>
      </div>
    </div>
    <div class="user-right">></div>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style>
.user {
  height: 150px;
  background-color: var(--color-tint);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  padding: 0 10px;
  padding-top: 20px;
}
.user-left {
  display: flex;
  align-items: center;
}
.portrait {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
}
.login {
  font-size: 22px;
  margin-bottom: 4px;
}
</style>
