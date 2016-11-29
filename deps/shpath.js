/**
 *@description 查找shell文件夹
 *@return [string] 返回shell文件夹路径
*/
'use strict';
const path = require('path');
module.exports = path.resolve(__dirname, '../sh')