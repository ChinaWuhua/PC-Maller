const express = require("express")
const router = express.Router()
const moment = require('moment')
const { db_async } = require('../DB_operator')
const nodemailer = require('../mailer/validateCode');

// 生成验证码
function createCode () {
  return toString(Math.random()).substr(2,6)
}

// 禁用账号
router.post('/setOff', async (req, res) => {
  const data = req.body
  const sql = `update user set disabled='true' where email='${data?.email}'`
  const result = await db_async(sql).then(res => res).catch((err) => err)
  res.send(result)
})

// 启用账号
router.post('/setOn', async (req, res) => {
  const data = req.body
  const sql = `update user set disabled='false' where email='${data?.email}'`
  const result = await db_async(sql).then(res => res).catch((err) => err)
  res.send(result)
})

// 重置密码
router.post('/reset', async (req, res) => {
  const data = req.body
  const sql = `update user set password='fm123456' where email='${data?.email}'`
  const result = await db_async(sql).then(res => res).catch((err) => err)
  res.send(result)
})

// 首次登陆-校验邮箱验证码
router.post('/validateCode', async (req, res) => {
  const sql_validate_code = `
    select code from registing where email='${req.body.email}'
  `
  const check = await db_async(sql_validate_code).then(res => res).catch((err) => err)
  if (check.statu === 'success') {
    const match = check.data.find(item => item.code === req.body.code)
    if (!match) {
      res.send({
        statu: 'fail',
        data: 'please check the email code'
      })
      return
    }
  }
  const sql_update_user_validate = `
    update user set email_validate = 'true' where email = '${req.body.email}'
  `
  db_async(sql_update_user_validate)
  const sql = `SELECT * FROM user where email='${req.body.email}'`
  const result = await db_async(sql).then(res => res).catch((err) => err)
  res.send({
    ...result,
    data: result.data[0]
  })
})

// 登录
router.post('/login', async (req, res) => {
  const data = req.body
  const sql = `SELECT * FROM user where email='${data?.email}'`
  const check = await db_async(sql).then(res => res).catch((err) => err)
  const params = check.data[0];
  // 邮箱未注册
  if (check.data.length <= 0) {
    res.send({
      ...check,
      statu: 'fail',
      data: 'un-Regist email'
    })
    return
  } 
  // 密码错误
  else if (params?.password !== data?.password) {
    res.send({
      ...check,
      statu: 'fail',
      data: 'password error'
    })
    return
  } 
  // 账号已禁用
  else if (check.data[0].disabled === 'true') {
    res.send({
      ...check,
      statu: 'fail',
      data: 'Account is disabled'
    })
    return
  } 
  // 首次登陆，校验邮箱
  else if (!check.data[0].email_validate) {
    const startTime = moment().format('YYYY-MM-DD HH:mm');
    const endTime = moment(startTime).add(2, 'm')
    const code = createCode()
    const mail = check.data[0].email//请求携带的邮件
    const sql_record_code_emial = `
      insert into 
        registing(email,code,begin,end) 
        values('${mail}','${code}','${moment(startTime).format('YYYY-MM-DD HH:mm')}','${moment(endTime).format('YYYY-MM-DD HH:mm')}')
        ON DUPLICATE KEY UPDATE
        code='${code}'
    `
    db_async(sql_record_code_emial)
    const result = await nodemailer(mail, code).then(res => res).catch(err => err)
    res.send({
      ...result,
      statu: 'validate'
    })
    return
  }
  res.send({
    statu: 'success',
    data: params
  })
});

module.exports = router