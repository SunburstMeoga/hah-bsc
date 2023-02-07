/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "/api": {
        target: "http://159.138.252.227/",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    https: false
  }
})
*/
module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://159.138.252.227/",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    open: true,
    https: false
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: "initial",
      minSize: 30000,
      //maxSize: 50000,         
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js',
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    });
  }
}