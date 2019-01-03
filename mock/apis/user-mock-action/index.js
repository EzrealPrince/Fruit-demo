const Mock = require('mockjs')
const path = require('path')
const MockRequire = require('../mock-require')

module.exports = {
    //授权登录
    '/security/oauth/token': function ({ headers,body, url, method, query, params,...a }) {
        return MockRequire(path.resolve(__dirname, './auth-token.json')).then(temp => {
            return Mock.mock(temp)
        })
    },
    //用户信息
    '/userinfo': function(){
        return MockRequire(path.resolve(__dirname, './user-info.json')).then(temp => {
            return Mock.mock(temp)
        })
    }
}
