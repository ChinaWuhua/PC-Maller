import moment from 'moment'
export const jsonToExcel = (data) => {
  // 要导出的json数据
  const jsonData = data

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `OrderID,Products,Amount,CreateTime,CustomerName\n`;

  // 增加 \t 为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < jsonData.length ; i++ ){
    const timer = jsonData[i].createTime ? moment(jsonData[i].createTime).format('YYYY-MM-DD HH:mm:ss') : '----'
    const producst = jsonData[i].products.replace(/,/g, '、')
    str += `${jsonData[i].orderID + '\t'},`;
    str += `${producst + '\t'},`;
    str += `${jsonData[i].amount + '\t'},`;
    str += `${timer + '\t'},`;
    str += `${jsonData[i].customerName + '\t'}`;
    str+='\n';
  }

  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  "Order List.xls";
  link.click();
}

export const userJsonToExcel = (data) => {
  // 要导出的json数据
  const jsonData = data

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `email,userid,role,username,registDate\n`;

  // 增加 \t 为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < jsonData.length ; i++ ){
    const timer = jsonData[i].registDate ? moment(jsonData[i].registDate).format('YYYY-MM-DD HH:mm:ss') : '----'
    str += `${jsonData[i].email + '\t'},`;
    str += `${jsonData[i].id + '\t'},`;
    str += `${jsonData[i].role + '\t'},`;
    str += `${jsonData[i].username + '\t'},`;
    str += `${timer + '\t'},`;
    str+='\n';
  }

  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  "User Records.xls";
  link.click();
}

export const orderJsonToExcel = (data) => {
  // 要导出的json数据
  const jsonData = data

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `customerName,amount,products,orderID,createTime\n`;

  // 增加 \t 为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < jsonData.length ; i++ ){
    const timer = jsonData[i].createTime ? moment(jsonData[i].createTime).format('YYYY-MM-DD HH:mm:ss') : '----'
    const producst = jsonData[i].products.replace(/,/g, '、')
    str += `${jsonData[i].customerName + '\t'},`;
    str += `${jsonData[i].amount + '\t'},`;
    str += `${producst + '\t'},`;
    str += `${jsonData[i].orderID + '\t'},`;
    str += `${timer + '\t'},`;
    str+='\n';
  }

  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  "Order Records.xls";
  link.click();
}
export const soldJsonToExcel = (data) => {
  // 要导出的json数据
  const jsonData = data

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `tradeName,description,createorName,tradePrice,tradeSold\n`;
  // 增加 \t 为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < jsonData.length ; i++ ){
    const sold = (jsonData[i].tradeSold)*1
    str += `${jsonData[i].tradeName + '\t'},`;
    str += `${jsonData[i].description + '\t'},`;
    str += `${jsonData[i].createorName + '\t'},`;
    str += `${jsonData[i].tradePrice + '\t'},`;
    str += `${sold + '\t'},`;
    str+='\n';
  }

  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  "Sold Records.xls";
  link.click();
}
export const allGoodsJsonToExcel = (data) => {
  // 要导出的json数据
  const jsonData = data

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `tradeName,description,createorName,tradePrice,tradeSold,tradeStock\n`;
  // 增加 \t 为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < jsonData.length ; i++ ){
    const sold = (jsonData[i].tradeSold)*1
    str += `${jsonData[i].tradeName + '\t'},`;
    str += `${jsonData[i].description + '\t'},`;
    str += `${jsonData[i].createorName + '\t'},`;
    str += `${jsonData[i].tradePrice + '\t'},`;
    str += `${sold + '\t'},`;
    str += `${jsonData[i].tradeStock + '\t'},`;
    str+='\n';
  }

  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  "Goods.xls";
  link.click();
}