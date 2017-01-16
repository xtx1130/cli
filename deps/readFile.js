/*@description read file contents(sync 同步读取)
 *@author xtx
 *@param {String} filename 
*/
'use strict';
const fs = require('fs');
var stdFileout = (filename) => {
	var json = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/'+filename)))
	return json
}
module.exports = stdFileout