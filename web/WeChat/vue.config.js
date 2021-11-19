'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = 'vue mobile' // page title

const port = 9550 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   * lintOnSave是否开启eslint//process.env.NODE_ENV === 'development'
   */
  publicPath: '/',
  outputDir: 'dist', // process.env.NODE_ENV === "production" ?'dist-prod':process.env.NODE_ENV === "staging" ?'dist-test':'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: { // 代理
      '/api': {
        target: 'baidu.com', // 目标地址
        changeOrigin: true, // 改变源，开启跨域
        secure: false, // 检查https
        ws: true, // websocket开启
        pathRewiter: { // 重写路径
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    performance: {
      // 关闭分包过大，性能警告提示
      hints: false
    }
  },

  pluginOptions: {
    'process.env': {
      NODE_ENV: '"development"'
    }
  }
}
