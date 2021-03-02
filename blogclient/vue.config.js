module.exports = {
    // publicPath: './',
    // outputDir: 'dist',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', require('path').join(__dirname, 'src'))
    },
    configureWebpack: {
        // debug mode disabled area
        // webpack可以不处理应用的某些依赖库,不希望webpack将它又编译进文件中。
        // externals: {
        //     'element-ui': 'Element',
        //     // 'vue-router': 'VueRouter',
        //     // axios: 'axios',
        //     // echarts: 'echarts',
        //     // vue: 'Vue',
        //     // vuex: 'Vuex'
        // }
        // debug mode disabled area
    },
    // proxyTable: {
    //     port: 8080,
    //     host: 'localhost',
    //     proxyTable: {
    //         '/api': {
    //             target: 'http://127.0.0.1:7001',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': '/'
    //             }
    //         }
    //     }
    // },
    devServer: {
        port: 8080,
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