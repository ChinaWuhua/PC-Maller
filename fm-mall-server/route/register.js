const express = require("express")
const router = express.Router()
const uuid = require('uuid')
const {db_async} = require('../DB_operator')
const moment = require('moment')
// const nodemailer = require('../mailer/validateCode');//发送邮件

// *********注册业务 开始************
// 生成验证码
// function createCode () {
//   return parseInt(Math.random() * 1000000)
// }
//发送验证码邮件 ************2023-05-07 经沟通，注册时不再需要校验邮箱，只在首次登陆时进行校验************
// router.post('/getcode', async (req, res, next) => {
//   let code = createCode() //随机生成验证码
//   const startTime = moment().format('YYYY-MM-DD HH:mm');
//   const endTime = moment(startTime).add(2, 'm')
  
//   // 校验邮箱是否已注册
//   const sql_validate_email = `
//     select email from user where email='${req.body.email}'
//   `
//   const validate_email = await db_async(sql_validate_email).then(res => res).catch((err) => err)
//   if (validate_email.statu === 'success' && validate_email.data.length > 0) {
//     res.send({
//       statu: 'fail',
//       data: 'The email is already registed'
//     })
//     return
//   }

//   const mail = req.body.email//请求携带的邮件
//   const result = await nodemailer(mail, code).then(result => result).catch(err => err)
//   if (result.statu === 'fail') {
//     res.data = 'there has a error when create a code, please wait a moment and try again'
//     res.send(result)
//     return;
//   }
//   // 记录邮箱地址及对应验证码
//   const sql_record_code_emial = `
//     insert into 
//       registing(email,code,begin,end) 
//       values('${req.body.email}','${code}','${moment(startTime).format('YYYY-MM-DD HH:mm')}','${moment(endTime).format('YYYY-MM-DD HH:mm')}')
//   `
//   const add = await db_async(sql_record_code_emial).then(res => res).catch((err) => err)
//   if (add.statu === 'fail') {
//     add.data = 'something wrong when create a code, please wait a moment and try again'
//   }
//   res.send({
//     ...add
//   })
// });
const sql_register = (params) => {
  const id = uuid.v4()
  const date = moment().format('YYYY-MM-DD HH:mm');
  return `INSERT INTO user(username,password,registDate,lastLoginDate,role,loginErrorTimes, id, email) VALUES ('${params?.email || ''}', '${params?.password || ''}', '${date}', '', '${params?.role || ''}', ${0}, '${id}', '${params?.email || ''}')`
}
// 注册接口
router.post('/add', async (req, res) => {
  const sql = sql_register(req.body)
  // 校验邮箱验证码 ************2023-05-07 经沟通，注册时不再需要校验邮箱，只在首次登陆时进行校验************
  // const sql_validate_code = `
  //   select code from registing where email='${req.body.email}'
  // `
  // const check = await db_async(sql_validate_code).then(res => res).catch((err) => err)
  // if (check.statu === 'success') {
  //   const match = check.data.find(item => item.code === req.body.code)
  //   if (!match) {
  //     res.send({
  //       statu: 'fail',
  //       data: 'please check the email code'
  //     })
  //     return
  //   }
  // }
  const result = await db_async(sql).then(res => res).catch(err => err)
  res.send(result)
});
// *********注册业务 结束************
module.exports = router