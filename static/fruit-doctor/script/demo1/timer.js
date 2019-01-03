export default function timer(element,timeNumber) {
  this.number =  timer.reverseFormatTime(timeNumber)
  this.timeStr = ''

  this.element = element
  this.init()
}
timer.formatTime = function (number) {   //将获得到的随机数字转成时间字符串
  let hour = Math.floor(number / 3600)
  if (hour < 10) hour = '0' + hour
  let minute = Math.floor((number % 3600) / 60)
  if (minute < 10) minute = '0' + minute
  let second = Math.floor(number % 60)
  if (second < 10) second = '0' + second
  return hour + '小时' + minute + '分' + second + '秒'
}
timer.reverseFormatTime = function (str) {   //将时间字符串转成对应的数字
  let hour = parseInt(str[0] + str[1])
  let minute = parseInt(str[4] + str[5])
  let second = parseInt(str[7] + str[8])
  return  3600 * hour + 60 * minute + second
}
timer.prototype.init = function () {
  let calculateTimer = setInterval( () => {
    this.number--
    this.timeStr = timer.formatTime(this.number)
    this.element.innerText = this.timeStr
    if(this.number <= 0) {
      this.destoryEle()   //如果倒计时为0则进行相应样式处理
      clearInterval(calculateTimer)
    }
  },1000)
}

timer.prototype.destoryEle = function () {
  this.element.innerText = '已过期'
  // TODO 其他样式的修改
}