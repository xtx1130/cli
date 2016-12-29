'use strict';
const exec = require('child_process').exec;
const shpath = require('../deps/shpath');
const chalk = require('chalk');
const addon_out = require('../addon/build/Release/systemout').systemout();
/*let [a,b]=['',''];
let c=new String('standard output:')
console.time('c++')
for(var i=0;i<1000;i++){
	a+=addon_out
}
console.timeEnd('c++')
console.time('js')
for(var i=0;i<1000;i++){
	b+=c;
}
console.timeEnd('js')*/
class Switch {
	constructor() {
		this.option = {
			'-l,--local': 'local',
			'-t,--test': 'dev',
			'-o,--online': 'online'
		}
		this.description = "hosts change"
	}
	action() {
		return (ac) => {
			var status = 0,
				ls;
			if(ac.local)
				status=1
			if(ac.test)
				status=2
			if(ac.online)
				status=3
			ls = exec('sudo sh '+ shpath+'/switch.sh '+status)
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