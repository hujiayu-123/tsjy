module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: "https://3g7096967c.qicp.vip/",
                pathRewrite: {
                    '^/api': ""
                }
            }
        }
    },
}