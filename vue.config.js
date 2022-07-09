module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        network: "@/network",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
