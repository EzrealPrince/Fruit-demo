let params = {    //ajax请求到的所有数据
  saleBar: {},
  figureBox: {},
  hotSell: {},
  swiperBox: {}
}
function formatTime(number) {   //将获得到的随机数字转成时间字符串
  let hour = Math.floor(number / 3600)
  if (hour < 10) hour = '0' + hour
  let minute = Math.floor((number % 3600) / 60)
  if (minute < 10) minute = '0' + minute
  let second = Math.floor(number % 60)
  if (second < 10) second = '0' + second
  return hour + '小时' + minute + '分' + second + '秒'
}
function reverseFormatTime(str) {   //将时间字符串转成对应的数字
  let hour = parseInt(str[0] + str[1])
  let minute = parseInt(str[4] + str[5])
  let second = parseInt(str[7] + str[8])
  return 3600 * hour + 60 * minute + second
}
function addUrlParam(url, name, value) {    //get请求对应的给url添加参数的方法
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
function requestGet (url,params,successcb,errorcb) {
  let xhr = new XMLHttpRequest()
  if(params) {
    for(let item in params) {
      url = addUrlParam(url,item,params[item])
    }
  }
  xhr.open('GET', url, true)
  xhr.send(null)
  console.log("url = " + url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        successcb(JSON.parse(xhr.responseText))
      } else {
        console.log("请求失败")
        errorcb && errorcb(xhr.responseText)
      }
    }
  }
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
function requestPost (url,data,successcb,errorcb) {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('content-type','application/json')
  xhr.send(JSON.stringify(data))
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        successcb(JSON.parse(xhr.responseText))
      } else {
        errorcb && errorcb(xhr.responseText)
        console.log("请求失败")
      }
    }
  }
}

//根据数据来渲染html页面
function init(params) {
  let hotSell = document.querySelector('.hot-sell')
  let saleBar = document.querySelector('.sale-bar')
  let figureBox = document.querySelector('.figure-bar')

  let html = ''
  let hotSellData = params.hotSell.data
  let saleBarData = params.saleBar.data
  let figureBoxData = params.figureBox.data

  // 根据数据渲染热销模块
  for(let i = 0; i < hotSellData.length; i++) {
    hotSellData[i].endTime = formatTime(hotSellData[i].endTime)
    html += `
      <a href="#">
        <div class="hot-sell-content">
          <div class="hot-sell-content-image">
            <div class="hot-sell-content-image-box">
              <span>限时抢购</span>
              <div></div>
            </div>
          </div>
          <p class="hot-sell-content-title">${hotSellData[i].title}</p>
          <p class="hot-sell-content-intro">${hotSellData[i].desc}</p>
          <div class="hot-sell-content-time">
            <span>${hotSellData[i].endTime}</span>
          </div>
          <div class="hot-sell-content-price">
            <span>￥${hotSellData[i].sourcePrice}</span>
            <span>${hotSellData[i].number + hotSellData[i].unit}</span>
            <span>原价${hotSellData[i].salePrice}</span>
          </div>
          <div class="hot-sell-content-buy">
            <span>${hotSellData[i].buyPeoples}人已购买</span>
            <div class="hot-sell-content-buy-confirm">
              <span>立即抢购</span>
            </div>
          </div>
        </div>
      </a>`
  }
  hotSell.innerHTML = html

  // 渲染优惠模块
  html = `
    <div class="sale-bar-title">
      <span>优惠专区</span>
      <span>On sale time</span>
      <div>more >></div>
    </div>
    <hr>
    <div class="sale-bar-main">
  `
  for(let i = 0; i < saleBarData.length; i++) {
    html +=  `
    <div class="sale-bar-main-content">
      <a href="#">
        <div class="sale-bar-main-image"></div>
        <p>${saleBarData[i].title}</p>
        <div class="sale-bar-price">
          <span>&yen;${saleBarData[i].sourcePrice}</span>
          <span>${saleBarData[i].number + saleBarData[i].unit} 装</span>
        </div>
        <div class="sale-bar-real-price">
          原价 ￥${saleBarData[i].salePrice}元
        </div>
      </a>
    </div>
  `
  }
  html += '</div>'
  saleBar.innerHTML = html

  // 渲染礼盒模块
  html = `
    <div class="sale-bar-title">
      <span>花样礼盒</span>
      <span>Figure box</span>
      <div>more >></div>
    </div>
    <hr>
    <div class="figure-bar-main">
  `
  for(let i = 0; i < figureBoxData.length; i++) {
    html += `
      <div class="figure-bar-main-content-box">
        <a href="#">
          <div class="figure-bar-main-content">
            <div class="figure-bar-main-content-image"></div>
            <p class="figure-bar-main-content-title">${figureBoxData[i].title}</p>
            <span class="figure-bar-main-content-price">
              ￥${figureBoxData[i].sourcePrice}
            </span>
            <span class="figure-bar-main-content-price-real">原价:￥${figureBoxData[i].salePrice}元</span>
          </div>
        </a>
      </div>
    `
  }
  html += '</div>'
  figureBox.innerHTML = html

  //渲染底部轮播图模块
  let changeTimeNode = hotSell.querySelectorAll('.hot-sell-content-time span')
  for(let i = 0; i < changeTimeNode.length; i++) {
    setInterval(function () {
      changeTimeNode[i].innerText = formatTime(reverseFormatTime(changeTimeNode[i].innerText) - 1)
      // if(reverseFormatTime(changeTimeNode[i].innerText) <= 0) {
        
      // }
    },1000)
  }
}
window.onload = function () {
  console.log("页面构建完成")
  //获取数据
  let requestOnSaleTime =  new Promise(function(resolve, reject) {
    requestGet (
      "/api/fruit/onSaleTime",
      {},
      function(data) {
        console.log('requestOnSaleTime success')
        params.saleBar = data
        resolve()
      }
    )
  })
  let requestFigureBox =  new Promise(function(resolve, reject) {
    requestGet (
      "/api/fruit/figureBox",
      {},
      function(data) {
        console.log('requestFigureBox success')
        params.figureBox = data
        resolve()
      },
      function (data) {
        console.log("请求失败" + data)
      }
    )
  })
  let requestSwiperBox = new Promise(function(resolve, reject) {
    requestGet(
      "/api/fruit/recommend/fruit",
      {recommend: "list"},
      function(data) {
        console.log("requestSwiperBox success")
        params.swiperBox = data
        resolve()
      }
    )
  })
  let requestHotSell = new Promise(function(resolve, reject) {
    requestPost(
      "/api/fruit/timeLimitedSales",
      {getFruit: 'list'},
      function(data) {
        console.log('requestHotSell success')
        params.hotSell = data
        resolve()
      }
    )
  })
  // 全部数据请求完成开始渲染页面
  let successRequest = Promise.all([requestHotSell,requestOnSaleTime,requestFigureBox,requestSwiperBox])
  successRequest.then(function () {
    init(params)
    let swiperBoxData = {
      transitionTime: 0.8,   //动画过渡时长
      transitonDelay: 3,     //延时
      viewPortWidth: 1000,   //视口的宽度
      viewImageCount: 5,     //一个视口拥有的图片总数
      changeImageCount: false,   //一次滑动几个图片，true为1张
      imageWidth: 187,   //单张图片的宽度
      canPlayFlag: false,    //可滑动标志位
      imagesAndUrl: []
    }
    for(let i = 0; i < params.swiperBox.data.length; i++) {
      let temp = {
        imgSrc: params.swiperBox.data[i].pic,
        linkHref: '#'
      }
      swiperBoxData.imagesAndUrl.push(temp)
    }
    swiperBoxData.canPlayFlag = params.swiperBox.data.length <= swiperBoxData.viewImageCount ? true : false
    console.log("canPlayFlag = " + swiperBoxData.canPlayFlag + params.swiperBox.data.length)
    let newSwiper = new window.swiper("swiper-box",swiperBoxData)
  })
}