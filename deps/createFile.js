/*@ description create file in folder config（Async 异步读取）
 *@author xtx
 *@param {String} filename 创建的文件名+后缀名
 *@param {String} json 写入的json串
*/
'use strict';
var stdFilein = (filename,json,callback) =>{
	fs.writeFileAsync(path.join(__dirname, '../config/'+filename), JSON.stringify(json))
	.catch((err) => {
        if (err) throw err;
    })
    .then(()=>{callback.call()});
}
module.exports = stdFilein;