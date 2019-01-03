import utils from './utils.js'
import template from '../../template/fruit.js'
import api from '../api/api.js'
function figureBox() {
  this.requestData()
}
figureBox.prototype.requestData = function () {
  utils.requestGet(api.figureBox,api.requestData.figureBox).then((response) => {
    console.log(response)
    this.init(response.data)
  })
}
figureBox.prototype.init = function (response) {
  let figureBox = document.querySelector('.figure-bar')
  let html = `
    <div class="sale-bar-title">
      <span>花样礼盒</span>
      <span>Figure box</span>
      <div>more >></div>
    </div>
    <hr>
    <div class="figure-bar-main">
  `
  for(let i = 0; i < response.length; i++) {
    html += utils.render(template.figureBox,response[i])
    // html += `
    //   <div class="figure-bar-main-content-box">
    //     <a href="#">
    //       <div class="figure-bar-main-content">
    //         <div class="figure-bar-main-content-image"></div>
    //         <p class="figure-bar-main-content-title">${response[i].title}</p>
    //         <span class="figure-bar-main-content-price">
    //           ￥${response[i].sourcePrice}
    //         </span>
    //         <span class="figure-bar-main-content-price-real">原价:￥${response[i].salePrice}元</span>
    //       </div>
    //     </a>
    //   </div>
    // `
  }
  html += '</div>'
  figureBox.innerHTML = html
}
$(document).ready(function(){
  console.log("figureBox")
  let newFigureBox = new figureBox()
});