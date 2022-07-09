import Vue from "vue";
import Router from "vue-router";
// 2.定义路由映射,懒加载
const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/cart/Cart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

// 1.通过Vue.use安装路由
Vue.use(Router);
const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
];

// 3.创建对象
const router = new Router({
  routes,
  mode: "history",
});

// 4.到处对象
export default router;
