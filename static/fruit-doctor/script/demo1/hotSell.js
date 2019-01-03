import utils from './utils.js'
import timer from'./timer.js'
import template from '../../template/fruit.js'
import api from '../api/api.js'
function hotSell() {
  this.requestData()
}
hotSell.prototype.requestData = function () {
  utils.requestPost(api.hotSell,api.requestData.hotSell).then((response) => {
    console.log(response)
    this.init(response.data)
  })
}
hotSell.prototype.init = function (response) {
  let hotSell = document.querySelector('.hot-sell')
  let html = ''
  // 根据数据渲染热销模块
  for(let i = 0; i < response.length; i++) {
    response[i].endTime = timer.formatTime(response[i].endTime)
    html += utils.render(template.hotSell,response[i])
  }
  hotSell.innerHTML = html
  this.countDown(response)
}
hotSell.prototype.countDown = function (response) {   //添加倒计时
  let changeTimeNode = document.querySelectorAll('.hot-sell-content-time span')
  for(let i = 0; i < changeTimeNode.length; i++) {
    let countDown = new timer(changeTimeNode[i],response[i].endTime)
  }
}
$(document).ready(function(){
  console.log("hotSell")
  let newHotSell = new hotSell()
});