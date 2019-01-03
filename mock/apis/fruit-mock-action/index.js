const Mock = require('mockjs')
const path = require('path')
const MockRequire = require('../mock-require')

module.exports = {
    //限时抢购
    '/timeLimitedSales': function ({ headers,body, url, method, query, params }) {
        console.log("body = ",body,"method = ",method)
        return new Promise((resolve,reject)=>{
            if(method === 'POST'){
                if(body.getFruit && body.getFruit == 'list'){
                    return resolve( 
                        MockRequire(path.resolve(__dirname, './time-limited-sales.json')).then(temp => {
                            return Mock.mock(temp)
                        })
                    )
                } else {
                    reject({msg:`必传参数 getFruit=list 未传递或者错误`})
                }
                
            }else{
                reject({msg:'使用POST方式请求'})
            }
        })
        
        
    },
    //优惠专区
    '/onSaleTime': function(){
        return MockRequire(path.resolve(__dirname, './on-sale-time.json')).then(temp => {
            return Mock.mock(temp)
        })
    },
    //花样礼盒
    '/figureBox': function(){
        return MockRequire(path.resolve(__dirname, './figure-box.json')).then(temp => {
            return Mock.mock(temp)
        })
    },
    //推荐礼盒
    '/recommend/fruit': function({ headers,body, url, method, query, params }){
        return new Promise((resolve,reject)=>{
            if(method === 'GET'){
                if(query.recommend && query.recommend == 'list' ){
                    return resolve( 
                        MockRequire(path.resolve(__dirname, './recomend-fruit.json')).then(temp => {
                            return Mock.mock(temp)
                        })
                    )
                } else {
                    reject({msg:`必传参数 recommend=list 未传递或者错误`})
                }
                
            }else{
                reject({msg:'使用GET方式请求'})
            }
        })
    },
}
