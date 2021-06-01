module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '乒乓球视觉训练系统';
      return args;
    })
  },

}