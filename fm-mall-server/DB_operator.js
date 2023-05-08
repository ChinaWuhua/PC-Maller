const mysql = require('mysql')

const responseSuccess = {
  code: 200,
  statu: 'success'
}
const responseFail = {
  code: 1,
  statu: 'fail'
}
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //你的mysql密码
  password: '12345678',
  //你要连接的数据库
  database: 'project-mall'
})
// promise方式返回数据库查询结果
const db_async = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, val) => {
      if (err) {
        const response = Object.assign(responseFail);
        response.data = err?.sqlMessage || '查询出错';
        response.sql = sql
        reject(response)
      } else {
        const response = Object.assign(responseSuccess);
        response.data = val
        resolve(response)
      }
    })
  })
}

module.exports = {db_async, db, responseSuccess, responseFail}