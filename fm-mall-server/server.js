const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const register = require('./route/register.js');
const user = require('./route/user.js');
const business = require('./route/business.js');
const customer = require('./route/customer.js');
const admin = require('./route/admin.js');

app.use(bodyParser.urlencoded({ extends: false }))
app.use(bodyParser.urlencoded({ txtended: false }))
app.use(bodyParser.json())
// 注册业务
app.use('/register', register)
// 身份认证
/* #todo: 1、加密传输 2、动态权限 */
app.use('/user', user)
// 商家业务
app.use('/business', business)
// 顾客业务
app.use('/customer', customer)
// 管理员业务
app.use('/admin', admin)

app.listen(3000, () => console.log('Example app listening on port 3000!'));