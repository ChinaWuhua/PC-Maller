const express = require("express")
const router = express.Router()
const uuid = require('uuid')
const {db_async, db} = require('../DB_operator')
const nodemailer = require('../mailer/orderNotice');
const moment = require('moment')
// 查询商品列表
router.post('/products', async (req, res) => {
  const data = req.body // 查询条件
  const condition = data.keyword ? ` and tradeName like '%${data.keyword}%'` : ''
  const sql = `select * from goods where statu='true' ${condition} order by tradePrice asc`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
});
// 添加心愿单
router.post('/addwish', async (req, res) => {
  const data = req.body // 查询条件
  // 防止重复插入数据
  const sql = `
    INSERT INTO goods_wish(id,ownerID) 
    SELECT '${data.productID}','${data.ownerID}' 
    FROM DUAL 
    WHERE NOT EXISTS(SELECT id,ownerID FROM goods_wish WHERE ownerID='${data.ownerID}' AND id='${data.productID}')
  `
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
});
// 移出心愿单
router.post('/removewish', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `delete from goods_wish where id='${data.productID}' and ownerID='${data.ownerID}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send({...
    check,
    data: 'Done !'
  })
});
// 查询心愿单
router.post('/querywish', async (req, res) => {
  const data = req.body // 查询条件
  // 根据goods_wish表的ownerID及商品id对goods表进行筛选
  const sql = `select * from goods where id in (select id from goods_wish where ownerID='${data.id}')`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
});
// 添加购物车接口接口侦听
router.post('/addcar', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `select * from car where productID='${data.productID}' and ownerID='${data.ownerID}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  if (check.statu !== 'success') {
    res.send(check)
  } else if (check.data.length > 0) {
    // 已存在，执行数量累加操作
    caculateToCar(res, data)
  } else {
    // 不存在，执行新增操作
    addToCar(res, data)
  }
});
// 新增至购物车数据库
const addToCar = async (res, data) => {
  const sql = `insert into car(productID,ownerID,count) values('${data.productID}','${data.ownerID}',${data.count})`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
}
// 累加购物车数量数据库
const caculateToCar = async (res, data) => {
  const sql = `update car set count=count+${data.count} where productID='${data.productID}' and ownerID='${data.ownerID}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  res.send(check)
}
// 移出购物车
router.post('/removecar', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    delete from car where productID='${data.productID}' and ownerID='${data.ownerID}'
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});
// 查询购物车
router.post('/querycar', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select
      goods.tradeName,
      goods.tradePrice,
      goods.id as productID,
      goods.tradeStock,
      goods.statu,
      goods.creatorID,
      goods.createorName,
      goods.description,
      goods.image,
      car.count,
      car.ownerID,
      car.productID
    from
      goods
    left join
      car
    on goods.id=car.productID
    where
      goods.id in (select productID from car where ownerID='${data.ownerID}')
    and
      car.ownerID='${data.ownerID}'
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});
// 购物车数量变更
router.post('/modifycar', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    update car set count=${data.count} where productID='${data.productID}' and ownerID='${data.ownerID}'
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});
// 接收订单请求
// 校验库存
const validateStock = async (res, data) => {
  let ids = ''
  data.data.forEach(item => {
    ids += `${ids.length < 1 ? '' : ','}'${item.productID}'`
  })
  const sql = `
    select * from goods where id in (${ids})
  `
  const result = await db_async(sql).then(result => result).catch((err) => err)
  const notPass = []
  result.data.forEach(item => {
    const o = data.data.find(child => child.id === item.productID)
    if (o && o.count > item.tradeStock) {
      notPass.push(o)
    }
  })
  if (notPass.length > 0) {
    res.send({
      statu: 'fail',
      data: notPass.map(item => item.tradeName).join('、') + ' is over the stock, please check'
    })
    return {
      statu: 'fail'
    }
  }
  return {
    statu: 'success'
  }
}
router.post('/createOrder', async (req, res) => {
  const data = req.body // 查询条件
  // 校验库存
  const validate = await validateStock(res, data).then(result => result).catch(err => err)
  if (validate.statu !== 'success') {
    return
  }
  const orderID = uuid.v4();
  const date = moment().format('YYYY-MM-DD HH:mm');
  // 第一步：将订单中的商品按所属商家划分
  const orders = {}
  data.data.forEach(item => {
    if (item.statu === 'true') {
      if (orders['f-' + item.creatorID]) {
        orders['f-' + item.creatorID].data.push(item)
      } else {
        orders['f-' + item.creatorID] = {
          farmerID: item.creatorID,
          customerID: data.userid,
          data: [item]
        }
      }
    }
  })
  // 第二步：生成订单，每条订单记录包含顾客、商家
  let values_orderList = ''
  let values_orderGoods = ''
  let values_stock = ''
  let values_productID = ''
  let values_sold = ''
  for (let item in orders) {
    let amount = 0
    let value_products = ''
    orders[item].data.forEach(item => {
      if (item.statu === 'true') {
        amount += (item.tradePrice*item.count).toFixed(2)*1
        value_products += `${value_products.length > 0 ? ', ' : ''}${item.tradeName}*${item.count}`
        values_stock += ` WHEN '${item.productID}' THEN tradeStock-${item.count}`
        values_sold += ` WHEN '${item.productID}' THEN tradeSold+${item.count}`
        values_productID += `${values_productID.length > 0 ? ',' : ''}'${item.productID}'`
        values_orderGoods += `${values_orderGoods.length > 0 ? ',' : ''}(${item.count},'${item.productID}','${item.tradeName}',${item.tradePrice},'${orderID}','${item.creatorID}','${date}')`
      } 
    })
    values_orderList += `${values_orderList.length > 0 ? ',' : ''}('${orderID}','${date}','${data.userid}','${orders[item].farmerID}','ordered','${amount}','${data.customerName}','${value_products}')`
  }
  const sql_orderList = `
    insert into 
      orderList(orderID,createTime,customerID,farmerID,orderStatu,amount,customerName,products) 
    values
      ${values_orderList}
  `
  // 第三步：生成订单商品快照
  const sql_orderGoods = `
    insert into 
      orderGoods(count,productID,tradeName,tradePrice,orderID,creatorID,soldTime) 
    values
      ${values_orderGoods}
  `
  // 第四步：删除购物车相关商品记录
  const sql_clean_car = `
    delete from car where ownerID='${data.userid}'
  `
  // 第五步：扣减库存
  const sql_renew_stock = `
    UPDATE goods
      SET tradeStock = CASE id
        ${values_stock}
      END
      WHERE 
        id in (${values_productID})
  `
  // 第六步：将库存为零的商品下架
  const sql_renew_statu = `
    update goods
      set statu = 'false'
    where
      tradeStock=0
  `
  // 第七步：更新销量
  const sql_renew_sold = `
    update goods
    SET tradeSold = CASE id
      ${values_sold}
    END
    WHERE 
      id in (${values_productID})
  `
  // 数据更新
  const create_order_list_result = await db_async(sql_orderList).catch((err) => err)
  const create_order_goods_result = await db_async(sql_orderGoods).catch((err) => err)
  const clean_car_result = await db_async(sql_clean_car).catch((err) => err)
  const renew_stock = await db_async(sql_renew_stock).catch((err) => err)
  const renew_statu = await db_async(sql_renew_statu).catch((err) => err)
  const renew_sold = await db_async(sql_renew_sold).catch((err) => err)
  // 批量发送商家提醒邮件
  send_email_to_farmer(orders, data.customerName, orderID, date)
  res.send({
    orderList: create_order_list_result.statu,
    orderGoods: create_order_goods_result.statu,
    cleanResult: clean_car_result.statu,
    renewStock: renew_stock.statu,
    renew_statu: renew_statu.statu,
    renew_sold: renew_sold.statu,
    statu: 'success'
  })
});
const send_email_to_farmer = async (orders, customerName, orderID, date) => {
  let farmerIDs = ''
  for (let item in orders) {
    const pre = farmerIDs.length > 0 ? ',' : ''
    farmerIDs += `${pre}'${orders[item].farmerID}'`
  }
  const sql = `
    select email,id from user where id in (${farmerIDs})
  `
  const result = await db_async(sql).then(result => result).catch((err) => err)
  result.data.forEach(item => {
    const match = orders['f-' + item.id]
    nodemailer(item.email, match.data, customerName, orderID, date)
  })
}
// #todo取消订单, 归还库存, 扣减销量
// 查询订单
router.post('/queryOrderList', async (req, res) => {
  const data = req.body // 查询条件
  let condition = ``
  if (data.role==='Customer') {
    condition = `customerID='${data.id}'`
  } else {
    condition = `farmerID='${data.id}'`
  }

  const sql = `
    select SQL_CALC_FOUND_ROWS * from orderlist where ${condition} and products like '%${data.keyword}%' order by createTime ASC limit ${(data.page-1) * 10}, 10
  `
  const sql_total = `
    SELECT FOUND_ROWS() as total
  `
  db.query(sql, (err_1, val_1) => {
    db.query(sql_total, (err_2, val_2) => {
      const params = {
        statu: 'success',
        data: val_1,
        total: val_2[0].total,
        page: data.page
      }
      if (err_1 || err_2) {
        params.statu = 'fail'
        params.error = {err_1, err_2}
      }
      res.send(params)
    })
  })
});
// 获取导出订单数据
router.post('/exportOrderList', async (req, res) => {
  const data = req.body // 查询条件
  let condition = ``
  if (data.role==='Customer') {
    condition = `customerID='${data.id}'`
  } else {
    condition = `farmerID='${data.id}'`
  }
  const sql = `
    select * from orderlist where ${condition} and products like '%${data.keyword}%' order by createTime desc
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});
// 订单详情
router.post('/queryOrderGoods', async (req, res) => {
  const data = req.body // 查询条件
  const sql = `
    select * from orderGoods where orderID='${data.orderID}' and creatorID='${data.farmerID}'
  `
  const result = await db_async(sql).catch((err) => err)
  res.send(result)
});

module.exports = router