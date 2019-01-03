const Mock = require('mockjs')
const fs = require('fs')

module.exports = function(jsonFilePath){
    return new Promise((resolve,reject) => {
        fs.readFile(jsonFilePath, function(err, data) {
            // 读取文件失败/错误
            if (err) {
                return reject(err)
            }
            return resolve(JSON.parse(data.toString()))
        });
    })
}