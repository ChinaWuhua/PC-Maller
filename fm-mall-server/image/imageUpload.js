const express = require('express');
const app = express();

// 商品图片储存路径
app.use('/goods/image/', express.static('../medias/goodsPictrue'))

// 1. 引入配置好的multerConfig
const multerConfig = require('./imageUploadConfig');

// 2. 定义静态变量
const fileName = "file"  // 上传的 fileName 名称
const updateBaseUrl = "http://localhost:3000" // 上传到服务器地址
const imgPath = "/goods/image/" // 上传到服务器的虚拟目录

// 上传接口的 请求参数req  响应参数res
const upload = (req, res) => {
  return new Promise((resolve, reject) => {
    multerConfig.single(fileName)(req, res, function (err) {
      if (err) {
        reject(err)
      } else {
        // `req.file.filename`  请求文件名称后缀 
        // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
        // resolve(updateBaseUrl + imgPath + req.file.filename)
        resolve(req.file.filename)
      }
    });
  })
}

module.exports = upload;