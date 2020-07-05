const path = require('path')

module.exports = {
    publicPath: '/form/index',
    runtimeCompiler: true,
    devServer: {
        proxy: {
            '/ycl': {
                target: 'http://127.0.0.1:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/ycl': ''
                }
            }
        },
        open: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname,  "./src"),
            }
        }
    }
}