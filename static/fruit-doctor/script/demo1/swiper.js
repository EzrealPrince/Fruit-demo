function swiper(elementName,OPTIONS) {
  this.box = document.getElementById(elementName)
  this.transitionTime = OPTIONS.transitionTime   //动画时间
  this.transitonDelay = OPTIONS.transitonDelay   //单页延迟
  this.viewImageCount = OPTIONS.viewImageCount   //一个视口的图片数
  this.canPlayFlag = OPTIONS.canPlayFlag   //是否可以滚动
  this.imagesAndUrl = OPTIONS.imagesAndUrl   //图片地址和点击链接
  this.changeImageCount = OPTIONS.changeImageCount  //一次轮播几张图片
  this.imageWidth = OPTIONS.imageWidth   //单张图片的宽度
  this.viewPortWidth = OPTIONS.viewPortWidth   //视口总宽度

  this.imagesAndUrl.length < this.viewImageCount && (this.viewImageCount = this.imagesAndUrl.length)  //如果给定的图片总数不够

  this.init()
  //开始进行循环轮播
  this.swiperList = this.box.querySelector('.swiper-list')
  this.swiperPoint = this.box.querySelectorAll('.swiper-point')
  this.swiperPointList = this.box.querySelector('.swiper-point-list')
  this.clickLeft = this.box.querySelector('.swiper-btn-left')
  this.clickRight = this.box.querySelector('.swiper-btn-right')
  this.swiper = this.box.querySelector('.swiper')
  
  this.calculateSwiper()  

  this.animationFlag = false   //播放动画过程标志位
  this.index = this.viewImageCount + 1
  this.autoPlayInterval = null
  this.addEvent()
}

//构建html布局
swiper.prototype.init = function () {
  this.box.style.width = this.viewPortWidth + 'px'
  let html = `
    <div class="swiper">
      <div class="swiper-list" style="width: ${this.box.clientWidth * (this.imagesAndUrl.length + 2)}px;transform: translate3d(-${this.box.clientWidth}px, 0px, 0px)">`
  //第一个为最后一张图
  let temStr = ''
  for(let i = 0; i < this.viewImageCount; i++) {
    temStr += `
      <div class="swiper-item" style="margin-left: 0px;">
        <a href="${this.imagesAndUrl[this.imagesAndUrl.length - this.viewImageCount + i].linkHref}"><div class="figure-bar-slider-item" style="background-image: url(${'\'' + this.imagesAndUrl[this.imagesAndUrl.length - this.viewImageCount + i].imgSrc + '\''});width: ${this.imageWidth}px;height: ${this.imageWidth}px"></div></a>
      </div>`
  }
  this.imagesAndUrl.map( item => {
  temStr += `<div class="swiper-item" style="margin-left: 0px;">
                <a href="${item.linkHref}"><div class="figure-bar-slider-item" style="background-image: url( ${'\'' + item.imgSrc + '\''});width: ${this.imageWidth}px;height: ${this.imageWidth}px"></div></a>
            </div>`
  })
  //最后多一个第一张图
  for(let i = 0; i < this.viewImageCount; i++) {
    temStr += `
      <div class="swiper-item" style="margin-left: 0px;">
        <a href="${this.imagesAndUrl[i].linkHref}"><div class="figure-bar-slider-item" style="background-image: url(${'\'' + this.imagesAndUrl[i].imgSrc + '\''});width: ${this.imageWidth}px;height: ${this.imageWidth}px"></div></a>
      </div>`
  }
  html += temStr + "</div>";
  html += `<div class="swiper-point-btn">`
  //添加点点
  temStr = `<div class="swiper-point-list" style="width: ${13 * this.imagesAndUrl.length}px">
              <div class="swiper-point swiper-point-active"></div>`
  for(let i = 1; i <= Math.floor((this.imagesAndUrl.length - 1) / this.viewImageCount); i++) {
    temStr += `<div class="swiper-point"></div>`
  }
  html += temStr + "</div>"
  //添加左右按钮
  temStr = `<div class="swiper-btn swiper-btn-left"><</div>
  <div class="swiper-btn swiper-btn-right">></div>`

  html += temStr;

  this.box.innerHTML += html + "</div></div>"
}
//计算轮播图间隔以及宽度
swiper.prototype.calculateSwiper = function () {
  let swiperItem = this.swiperList.querySelectorAll('.swiper-item')
  let swiperItemImage = this.swiperList.querySelectorAll('.swiper-item a image')
  for(let i = 0; i < swiperItemImage.length; i++) {
    swiperItemImage[i].style.width = this.imageWidth + 'px'
  }
  for(let i = 0; i < swiperItem.length; i++) {
    swiperItem[i].style.margin = '0 ' + (this.box.clientWidth - this.viewImageCount * this.imageWidth) / (this.viewImageCount * 2) + 'px'
  } 
}
//自动播放
swiper.prototype.autoPlay = function () {
  this.autoPlayInterval = setInterval(() => {
    this.changeImageCount ? this.index++ : this.index += this.viewImageCount
    // if(!this.changeImageCount && this.imageAndUrl.length - this.index < this.viewImageCount) {   //如果一次滑动多张图片而且剩余图片数不能构成完整的一个视口
    //   this.index -= (this.imageAndUrl.length % this.viewImageCount - this.viewImageCount) 
    // }
    this.render()
  },this.transitonDelay * 1000)
}

//根据index值渲染当前swiper
swiper.prototype.render = function () {
  if(this.canPlayFlag) return
  this.animationFlag = true
  this.swiperList.style.transition = 'transform ' + this.transitionTime + 's'
  this.swiperList.style.transform = 'translate3d(' + (-1) * this.box.clientWidth / this.viewImageCount * this.index + 'px, 0px, 0px)'
  setTimeout( () => {
    if(this.index > this.imagesAndUrl.length) {
      this.swiperList.style.transition = 'none'
      this.index = 1
      this.swiperList.style.transform = 'translate3d(' + (-1) * this.box.clientWidth / this.viewImageCount * this.index + 'px, 0px, 0px)'
    } else if(this.index <= this.viewImageCount - 1) {
      this.swiperList.style.transition = 'none'
      this.index = this.imagesAndUrl.length
      this.swiperList.style.transform = 'translate3d(' + (-1) * this.box.clientWidth / this.viewImageCount * this.index + 'px, 0px, 0px)'
    }
    this.animationFlag = false
  },this.transitionTime * 1000)
  this.renderPoint()
}
//画点点
swiper.prototype.renderPoint = function () {   
  let activeFlag = Math.floor(this.index / this.viewImageCount)
  if(activeFlag == 0) {
    activeFlag = this.swiperPoint.length
  } else if(activeFlag > this.swiperPoint.length) {
    activeFlag = 1
  }
  for(let i = 0; i < this.swiperPoint.length; i++) {
    this.swiperPoint[i].className = 'swiper-point'
  }
  this.swiperPoint[activeFlag - 1].className += ' swiper-point-active'
}
//注册事件
swiper.prototype.addEvent = function () {     
  this.clickLeft.addEventListener('click',(e) => { 
    if(this.animationFlag) return
    this.changeImageCount ? this.index-- : this.index -= this.viewImageCount
    this.render()
  })
  this.clickRight.addEventListener('click',(e) => {
    if(this.animationFlag) return
    this.changeImageCount ? this.index++ : this.index += this.viewImageCount
    this.render()
  })
  this.swiper.addEventListener('mouseenter',(e) => {
    this.clickLeft.className = 'swiper-btn swiper-btn-left swiper-btn-active'
    this.clickRight.className += 'swiper-btn swiper-btn-right swiper-btn-active'
    clearInterval(this.autoPlayInterval)
  })
  this.swiper.addEventListener('mouseleave',(e) => {
    this.clickLeft.className = 'swiper-btn swiper-btn-left'
    this.clickRight.className = 'swiper-btn swiper-btn-right'
    this.autoPlay()
  })
  this.swiperPointList.addEventListener('click',(e) => {
    console.dir(e.target)
    let obj = e.target
    if(obj.className != "swiper-point") return
    this.pointClick(obj)
  })
}
//点击的响应事件
swiper.prototype.pointClick = function (obj) {
  for(let i = 0; i < this.swiperPoint.length; i++){
    if(this.swiperPoint[i] === obj){
      this.index = i + 1
      this.render()
      break
    }
  }
}

swiper.prototype.setTransitionTime = function (newTime) {
  this.transitionTime = newTime
}
swiper.prototype.settransitonDelay = function (newDelay) {
  this.transitonDela = newDelay
}
swiper.prototype.setImageAndUrl = function (newImageAndUrl) {
  this.imageAndUrl = newImageAndUrl
}

window.swiper = swiper