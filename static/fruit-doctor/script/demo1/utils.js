export default function utils () {
  
}
utils.addUrlParam = function (url, name, value) {    //get请求对应的给url添加参数的方法
  url += (url.indexOf('?') == -1) ? "?" : "&"
  url += name + "=" + value
  return url
}
/**
* * ajax的GET请求
*
* @static
* @param {String} url 请求地址
* @param {Object} params 请求参数
* @param {function} successcb 成功回调
* @param {function} errorcb 失败回调
* @returns
*/
utils.requestGet = function (url,params) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    if(params) {
      for(let item in params) {
        url = utils.addUrlParam(url,item,params[item])
      }
    }
    xhr.open('GET', url, true)
    xhr.send(null)
    console.log("url = " + url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          console.log("请求失败")
          reject(xhr.responseText)
        }
      }
    }
  })
}
/**
* * ajax的POST请求
*
* @static
* @param {String} url 请求地址
* @param {Object} data 请求参数
* @param {function} successcb 成功回调
* @param {function} errorcb 失败回调
* @returns
*/
utils.requestPost = function (url,data) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('content-type','application/json')
    xhr.send(JSON.stringify(data))
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.responseText)
          console.log("请求失败")
        }
      }
    }
  })
}
utils.render = function (template,data) {
  let reg = /\{{2}([a-zA-Z]+[1-9]*)\}{2}/g
  return template.replace(reg, function() {
    return data[arguments[1]]
  })
}