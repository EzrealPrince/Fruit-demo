import utils from './utils.js'
import api from '../api/api.js'
import template from '../../template/fruit.js';
function swiperBox() {
  this.requestData()
}
swiperBox.prototype.requestData = function () {
  utils.requestGet(api.swiperBox,api.requestData.swiperBox).then((response) => {
    console.log(response)
    this.init(response.data)
  })
}
swiperBox.prototype.init = function (response) {
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
  for(let i = 0; i < response.length; i++) {
    let temp = {
      imgSrc: response[i].pic,
      linkHref: '#'
    }
    swiperBoxData.imagesAndUrl.push(temp)
  }
  swiperBoxData.canPlayFlag = response.length <= swiperBoxData.viewImageCount ? true : false
  let newSwiper = new window.swiper("swiper-box",swiperBoxData)
  this.addElement(response)
}
swiperBox.prototype.addElement = function (data) {   //给轮播图添加其他元素
  let swiperItem = document.querySelectorAll('.figure-bar-slider-item')
  let html = ''
  if(data.length <= 5) {  //如果传回来的数据个数小于一页的最大容量
    for(let i = 0; i < 5; i++) {
      html = utils.render(template.swiperBox,data[data.length - 1 - i])
      swiperItem[i].innerHTML = html
    }
    return
  }
  for(let i = swiperItem.length - 1; i > swiperItem.length - 6; i--) {
    html = utils.render(template.swiperBox,data[swiperItem.length + 1 - i])
    swiperItem[i].innerHTML = html
  }
  for(let i = 0; i < 5; i++) {
    html = utils.render(template.swiperBox,data[data.length - 1 - i])
    swiperItem[i].innerHTML = html
  }
  for(let i = 0; i < data.length; i++) {
    html = utils.render(template.swiperBox, data[i])
    swiperItem[i + 5].innerHTML = html
  }
  // for(let i = swiperItem.length - 1; i > swiperItem.length - 6; i--) {
  //   html = `
  //   <div class="figure-bar-slider-item-intro">
  //     <p class="figure-bar-slider-item-intro-title">${data[swiperItem.length + 1 - i].title}</p>
  //     <p class="figure-bar-slider-item-intro-detailed">
  //       ${data[swiperItem.length + 1 - i].desc}
  //     </p>
  //     <div class="figure-bar-slider-item-intro-price">
  //       <span>￥${data[swiperItem.length + 1 - i].sourcePrice}</span>
  //       <span>${data[swiperItem.length + 1 - i].number + data[swiperItem.length + 1 - i].unit}</span>
  //     </div>
  //   </div>`
  //   swiperItem[i].innerHTML = html
  // }
  // for(let i = 0; i < 5; i++) {
  //   console.log('i = ',swiperItem.length - 1 - i)
  //   html = `
  //   <div class="figure-bar-slider-item-intro">
  //     <p class="figure-bar-slider-item-intro-title">${data[data.length - 1 - i].title}</p>
  //     <p class="figure-bar-slider-item-intro-detailed">
  //       ${data[data.length - 1 - i].desc}
  //     </p>
  //     <div class="figure-bar-slider-item-intro-price">
  //       <span>￥${data[data.length - 1 - i].sourcePrice}</span>
  //       <span>${data[data.length - 1 - i].number + data[data.length - 1 - i].unit}</span>
  //     </div>
  //   </div>`
  //   swiperItem[i].innerHTML = html
  // }
  // for(let i = 0; i < data.length; i++) {
  //   html = `
  //   <div class="figure-bar-slider-item-intro">
  //     <p class="figure-bar-slider-item-intro-title">${data[i].title}</p>
  //     <p class="figure-bar-slider-item-intro-detailed">
  //       ${data[i].desc}
  //     </p>
  //     <div class="figure-bar-slider-item-intro-price">
  //       <span>￥${data[i].sourcePrice}</span>
  //       <span>${data[i].number + data[i].unit}</span>
  //     </div>
  //   </div>`

  //   swiperItem[i + 5].innerHTML = html
  // }
}
$(document).ready(function(){
  console.log("swiperBox")
  let newSwiperBox = new swiperBox()
});