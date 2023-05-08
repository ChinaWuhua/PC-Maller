const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  // lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {'^/api': ''}
    }
    }
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
        args[0].title = '欢迎访问本商城'
        return args
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
