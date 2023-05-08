const multer = require('multer')
const uuid = require('uuid');

// 图片上传
const path = require('path') //
const resolve = (dir) => {
  return path.join(__dirname, './', dir)
}
let storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function (req, file, cb) {
    // 3.1.1 允许图片上传
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, resolve('../medias/goodsPictrue'))
    } else {
      // 3.1.2 限制其他文件上传类型
      cb({ error: 'Mime type not supported' })
    }

  },
  //  3.2 存储名称
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    cb(null, `${uuid.v4()}` + "." + fileFormat[fileFormat.length - 1]);
  },
});
const multerConfig = multer({
  storage: storage,
});

module.exports = multerConfig