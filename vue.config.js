let proxyObj = {};
proxyObj['/'] = {
    ws: false,
    // 转发到
    target: "http://localhost:8090",
    changeOrigin: true,
    // 重写路径
    pathRewrite: {
        '^/':''
    }
}

module.exports = {
    //开发代理
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}