const express = require('express');
const app = express();

// 1. 引入配置好的multerConfig
const multerConfig = require('./imageUploadConfig');

// 2. 定义静态变量
const fileName = "file"  // 上传的 fileName 名称

// 上传接口的 请求参数req  响应参数res
const upload = (req, res) => {
  return new Promise((resolve, reject) => {
    multerConfig.single(fileName)(req, res, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(req.file.filename)
      }
    });
  })
}

module.exports = upload;