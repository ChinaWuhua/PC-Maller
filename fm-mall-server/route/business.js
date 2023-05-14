const express = require("express")
const router = express.Router()
const {db_async, responseFail, responseSuccess} = require('../DB_operator')
const multer = require('multer')
const xlsx = require('xlsx')
const uuid = require('uuid')
const upload = multer({ storage: multer.memoryStorage() }) // 上传文件使用缓存策略
const imageUpload = require('../image/imageUpload');
const path = require('path')
const moment = require('moment')
const fs = require('fs')

// 产品图片上传
router.post('/uploadImage', (req, res) => {
  imageUpload(req, res).then(imgsrc => {
    // 上传成功 存储文件路径 到数据库中
    Pictrue_BIND_Goods(res, imgsrc, req.body.id);
  }).catch(err => {
    res.send({
      ...responseFail,
      data: err
    })
  })
})
// 图片上传后即时绑定对应商品
const Pictrue_BIND_Goods = async (res, image, id) => {
  const sql = `update goods set image='${image}' where id='${id}'`
  const result = await db_async(`${sql}`).catch((err) => err)
  if (result.statu === 'success') {
    const response = Object.assign(responseSuccess);
    response.data = image;
    res.send(response)
  } else {
    const response = Object.assign(responseFail);
    response.data = result;
    res.send(response)
  }
}
// 产品图片获取
router.get('/getImage', (req, res) => {
  let file = path.join(__dirname,'../medias/goodsPictrue/' + req.query.id);
  res.download(file); 
})
// 查询已发布商品
router.post('/myTrades', async (req, res) => {
  const data = req.body
  const sql = `select * from goods where creatorID='${data.id}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
});
// 新增商品
router.post('/create', async (req, res) => {
  const data = req.body
  const id = uuid.v4();
  const creatTime = moment().format('YYYY-MM-DD HH:mm');
  const sql = `INSERT INTO goods(tradeName,tradePictrue,tradePrice,tradeStock,description,statu,createorName,creatorID,id,tradeCreateTime,tradeSold) VALUES('${data?.tradeName}', '${data?.tradePictrue}', ${data.tradePrice}, ${data.tradeStock}, '${data.description}', '${data.statu}', '${data.createorName}', '${data.creatorID}','${id}','${creatTime}',0)`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send({...check, id})
});
// 批量新增商品
const formatData = (item, createorName, creatorID) => {
  const id = uuid.v4();
  const creatTime = moment().format('YYYY-MM-DD HH:mm');
  return `('${item.tradeName || ''}',${item.tradePrice || ''},'${creatTime || ''}','${createorName || ''}','${item.tradeStock || 0}','${item.description || ''}','false','${id}','${creatorID || ''}',0)`
}
router.post('/batchImport', async (req, res) => {
  const data = req.body
  const createorName = data.createorName
  const creatorID = data.creatorID
  let sql = `INSERT INTO goods(tradeName,tradePrice,tradeCreateTime,createorName,tradeStock,description,statu,id,creatorID,tradeSold) values `
  let values = '';
  data.data.forEach(item => {
    const val = formatData(item, createorName, creatorID)
    values += `${values.length > 0 ? ',' : ''}${val}`
  })
  const result = await db_async(`${sql}${values}`).catch((err) => err)
  res.send(result)
});
// 更新商品
router.post('/modify', async (req, res) => {
  const data = req.body
  if (data?.oldImage) {
    try {
      const paths = path.join(__dirname,'../medias/goodsPictrue/' + data?.oldImage);
      fs.unlink(paths, (err) => {
        if (err) {
          console.log('error: ', err)
        } else {
          console.log('done')
        }
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }
  const sql = `UPDATE goods SET tradeName='${data.tradeName}',tradePictrue='${data.tradePictrue}',tradePrice=${data.tradePrice},tradeStock=${data.tradeStock},description='${data.description}',statu='${data.statu}' WHERE id='${data.id}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send({...check, id: data.id})
});
// 批量导入商品
router.post('/import', upload.any(), (req, res) => {
  if (!req.files || req.files.length === 0) {
    const response = {
      statu: 'fail',
      data: 'please chose a file'
    }
    return res.send(response)
  }

  const { originalname, buffer } = req.files[0]
  if (!originalname.endsWith('xls') && !originalname.endsWith('xlsx')) {
    const response = {
      statu: 'success',
      data: 'Only xls or xlsx file'
    }
    return res.send(response)
  }
  // 解析excel文件
  const workbook = xlsx.read(buffer, { type: "buffer" })
  const sheet = workbook.Sheets[workbook.SheetNames[0]] // 选择第一个工作簿
  const result = xlsx.utils.sheet_to_json(sheet)
  const response = {
    statu: 'success',
    data: result
  }
  return res.send(response)
})
// ！！！！请谨慎执行商品删除操作，随意删除商品数据，可导致购物车或订单数据内的商品数据丢失！！！！

module.exports = router