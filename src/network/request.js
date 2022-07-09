import axios from "axios";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000,
  });

  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(
    (config) => {
      // console.log(config)
      // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

      // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

      // 3.对请求的参数进行序列化(看服务器是否需要序列化)
      // config.data = qs.stringify(config.data)
      // console.log(config);
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  //2.2响应拦截
  instance.interceptors.response.use(
    (config) => {
      // console.log(config.data);
      return config.data;
    },
    (error) => {
      console.log(error);
    }
  );

  //3.发送真正的网络请求
  return instance(config);
}
