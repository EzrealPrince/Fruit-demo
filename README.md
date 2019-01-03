## 初始化项目
 `npm install`
## 启动项目
 `npm run start`


## 配置的MOCk数据
### 对应的练习页面
https://lanhuapp.com/web/#/item/board/detail?pid=201db133-ce5e-4f89-a277-325cadb9116d&project_id=201db133-ce5e-4f89-a277-325cadb9116d&image_id=e92c4de6-b04a-490d-8322-0edecbfd391b
### 1.上部的倒计时

#### 方式：`POST` 
#### 参数：`fruit='list'`
#### url: `/api/fruit/timeLimitedSales`

 
### 2.优惠专区

#### 方式：`GET/POST` 
#### 参数：`无参数`
#### url: `/api/fruit/onSaleTime`

### 3.花样礼盒

#### 方式：`GET/POST`
#### 参数：`无参数`
#### url: `/api/fruit/figureBox`

### 4.下部的推荐滚动数据

#### 方式：`GET`
#### 参数：`recommed='list'`
#### url: `/api/fruit/recommend/fruit`

## 静态页面放入根目录static即可

## 要求
### 原生Ajax请求数据 并异步渲染页面