'use strict';
const exec = require('child_process').exec;
const shpath = require('../deps/shpath');
const chalk = require('chalk');
const addon_out = require('../addon/build/Release/systemout').systemout();
class Switch {
	constructor() {
		this.option = {
			'-a,--add': 'add#',
			'-d,--del': 'delete#'
		}
		this.description = "hosts change"
	}
	action() {
		//tips:如果argv除了option后有别的参数，需要加上第二个形参来判断
		return (ac,s) => {
			if(!ifInit)
				return false
			let status = 0,
				arg = process.argv.splice(2),
				httpname = arg[1].match(/\./)?arg[1]:arg[2],
				ls;
			if(s.add)
				status=0
			if(s.del)
				status=1
			ls = exec('sudo sh '+ shpath+'/projectenv.sh '+httpname+' '+status)
			ls.stdout.on('data', function(data) {
				console.log(chalk.cyan(addon_out) + data);
			});
			ls.on('exit', function(code) {
				//console.log(code)
			})
			ls.on('close', function(code) {
				//console.log(code)
			});
		}
	}
}
exports._export = Switch;