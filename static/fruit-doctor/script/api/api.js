export default function api() {}
let path = "/api/fruit/"
api.hotSell = path + "timeLimitedSales"
api.figureBox = path + "figureBox"
api.saleBar = path + "onSaleTime"
api.swiperBox = path + "recommend/fruit"

api.requestData = {
  hotSell: {getFruit: 'list'},
  figureBox: {},
  saleBar: {},
  swiperBox: {recommend: "list"}
}