<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">鹏哥商城</div>
    </nav-bar>
    <user />
    <list-view />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import User from "./childComps/User";
import ListView from "./childComps/ListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    User,
    ListView,
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  color: white;
  font-weight: 600;
}
</style>
