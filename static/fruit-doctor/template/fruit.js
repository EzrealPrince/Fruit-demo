export default function template () {}
template.figureBox = `<div class="figure-bar-main-content-box">
<a href="#">
  <div class="figure-bar-main-content">
    <div class="figure-bar-main-content-image"></div>
    <p class="figure-bar-main-content-title">{{title}}</p>
    <span class="figure-bar-main-content-price">
      ￥{{sourcePrice}}
    </span>
    <span class="figure-bar-main-content-price-real">原价:￥{{salePrice}}元</span>
  </div>
</a>
</div>`
template.hotSell = `
  <a href="#">
    <div class="hot-sell-content">
      <div class="hot-sell-content-image">
        <div class="hot-sell-content-image-box">
          <span>限时抢购</span>
          <div></div>
        </div>
      </div>
      <p class="hot-sell-content-title">{{title}}</p>
      <p class="hot-sell-content-intro">{{desc}}</p>
      <div class="hot-sell-content-time">
        <span>{{endTime}}</span>
      </div>
      <div class="hot-sell-content-price">
        <span>￥{{sourcePrice}}</span>
        <span>{{number}}{{unit}}</span>
        <span>原价{{salePrice}}</span>
      </div>
      <div class="hot-sell-content-buy">
        <span>{{buyPeoples}}人已购买</span>
        <div class="hot-sell-content-buy-confirm">
          <span>立即抢购</span>
        </div>
      </div>
    </div>
  </a>`
    
template.saleBar = `
<div class="sale-bar-main-content">
  <a href="#">
    <div class="sale-bar-main-image"></div>
    <p>{{title}}</p>
    <div class="sale-bar-price">
      <span>&yen;{{sourcePrice}}</span>
      <span>{{number}}{{unit}}装</span>
    </div>
    <div class="sale-bar-real-price">
      原价 ￥{{salePrice}}元
    </div>
  </a>
</div>`
template.swiperBox =  `
<div class="figure-bar-slider-item-intro">
  <p class="figure-bar-slider-item-intro-title">{{title}}</p>
  <p class="figure-bar-slider-item-intro-detailed">
    {{desc}}
  </p>
  <div class="figure-bar-slider-item-intro-price">
    <span>￥{{sourcePrice}}</span>
    <span>{{number}}{{unit}}</span>
  </div>
</div>`