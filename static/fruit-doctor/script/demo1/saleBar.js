import utils from './utils.js'
import template from '../../template/fruit.js'
import api from '../api/api.js'
function saleBar() {
  this.requestData()
}
saleBar.prototype.requestData = function () {
  utils.requestGet(api.saleBar,api.requestData.saleBar,).then((response) => {
    console.log(response)
    this.init(response.data)
  })
}
saleBar.prototype.init = function (response) {
  let saleBar = document.querySelector('.sale-bar')
  let html = `
    <div class="sale-bar-title">
      <span>优惠专区</span>
      <span>On sale time</span>
      <div>more >></div>
    </div>
    <hr>
    <div class="sale-bar-main">
  `
  for(let i = 0; i < response.length; i++) {
    html += utils.render(template.saleBar,response[i])
  }
  //   html +=  `
  //   <div class="sale-bar-main-content">
  //     <a href="#">
  //       <div class="sale-bar-main-image"></div>
  //       <p>${response[i].title}</p>
  //       <div class="sale-bar-price">
  //         <span>&yen;${response[i].sourcePrice}</span>
  //         <span>${response[i].number + response[i].unit} 装</span>
  //       </div>
  //       <div class="sale-bar-real-price">
  //         原价 ￥${response[i].salePrice}元
  //       </div>
  //     </a>
  //   </div>
  // `
  html += '</div>'
  saleBar.innerHTML = html
}
$(document).ready(function(){
  console.log("saleBar")
  let newSaleBar = new saleBar()
});