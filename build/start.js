const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { dev: { PORT, HOST } } = require('../config')
const MockServer = require('../mock/mock-server')

const open = require('open');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
MockServer(app)
// 静态页面
// 这里一般设置你的静态资源路径
app.use('/', express.static('static'))


// 监听端口
app.listen(PORT, HOST, () => {
    console.log(`server running http://${HOST}:${PORT}`);
});

open(`http://${HOST}:${PORT}`)