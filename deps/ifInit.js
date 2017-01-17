'use strict';
const path = require('path');
const chalk = require('chalk');
const projectPath =  process.cwd();
// function findInit(pa){
// 	var _tem = fs.existsSync(pa+'/')
// }
var _tem = fs.existsSync(path.resolve(__dirname,'../config/info.json'));
if(!_tem)
	process.stdout.write(chalk.gray('[console info] ')+chalk.red('please use leju init to initalize your workspace first'))
module.exports = _tem