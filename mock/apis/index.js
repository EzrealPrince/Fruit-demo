const userMockAction = require('./user-mock-action')

const fruitMockAction = require('./fruit-mock-action')
const apis = {
    //用户相关
    "/user": userMockAction,

    //水果
    "/fruit": fruitMockAction
}
module.exports = apis