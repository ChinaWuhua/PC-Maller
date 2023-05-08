const express = require("express")
const router = express.Router()
const {db_async, db, responseFail, responseSuccess} = require('../DB_operator')
// 用户概览
router.post('/queryUsers', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select * from user limit ${(data.page-1) * 10}, 10
  `
  const sql_total = `select count(*) as total from user`
  db.query(sql, (err, val) => {
    if (!err) {
      db.query(sql_total, (e,v) => {
        if (!e) {
          const response = Object.assign(responseSuccess);
          response.data = val
          response.total = v[0].total
          response.page = data.page
          res.send(response)
          return;
        }
        const response = Object.assign(responseFail);
        res.send({...response, sql: sql_total, msg: e})
      })
    } else {
      const response = Object.assign(responseFail);
      res.send({...response, sql: sql, msg: err})
    }
  })
})
router.post('/exportUsers', async (req, res) => {
  const sql = `
    select * from user
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
})
// 订单概览
router.post('/queryOrders', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select * from orderlist order by createTime asc limit ${(data.page-1) * 10}, 10
  `
  const sql_total = `select count(*) as total from orderlist`
  db.query(sql, (err, val) => {
    if (!err) {
      db.query(sql_total, (e,v) => {
        if (!e) {
          const response = Object.assign(responseSuccess);
          response.data = val
          response.total = v[0].total
          response.page = data.page
          res.send(response)
          return;
        }
        const response = Object.assign(responseFail);
        res.send({...response, sql: sql_total, msg: e})
      })
    } else {
      const response = Object.assign(responseFail);
      res.send({...response, sql: sql, msg: err})
    }
  })
})
router.post('/exportOrders', async (req, res) => {
  const sql = `
    select * from orderlist
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
})
// 商品销售记录概览
router.post('/querySoldGoods', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select * from ordergoods limit ${(data.page-1) * 10}, 10
  `
  const sql_total = `select count(*) as total from ordergoods`
  db.query(sql, (err, val) => {
    if (!err) {
      db.query(sql_total, (e,v) => {
        if (!e) {
          const response = Object.assign(responseSuccess);
          response.data = val
          response.total = v[0].total
          response.page = data.page
          res.send(response)
          return;
        }
        const response = Object.assign(responseFail);
        res.send({...response, sql: sql_total, msg: e})
      })
    } else {
      const response = Object.assign(responseFail);
      res.send({...response, sql: sql, msg: err})
    }
  })
})
router.post('/exportGoods', async (req, res) => {
  const sql = `
    select * from goods
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});
// 已有商品概览
router.post('/queryAllGoods', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select * from goods limit ${(data.page-1) * 10}, 10
  `
  const sql_total = `select count(*) as total from goods`
  db.query(sql, (err, val) => {
    if (!err) {
      db.query(sql_total, (e,v) => {
        if (!e) {
          const response = Object.assign(responseSuccess);
          response.data = val
          response.total = v[0].total
          response.page = data.page
          res.send(response)
          return;
        }
        const response = Object.assign(responseFail);
        res.send({...response, sql: sql_total, msg: e})
      })
    } else {
      const response = Object.assign(responseFail);
      res.send({...response, sql: sql, msg: err})
    }
  })
})
router.post('/exportAllGoods', async (req, res) => {
  const sql = `
    select * from goods
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
})

module.exports = router