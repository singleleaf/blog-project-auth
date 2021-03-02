const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  // 配置代理解决跨域
  devServer: {
    // port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://127.0.0.1:7001',
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
