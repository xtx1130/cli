'use strict';
const spawn = require('child_process').spawn;
const shpath = require('../deps/shpath');
const chalk = require('chalk');
const readFile = require('../deps/readFile');
class Switch {
	constructor() {
		this.option = {
			
		}
		this.description = "svn update"
	}
	action() {
		return (ac) => {
			let arg = process.argv.splice(2),
				path = readFile('info.json'),
				ls;
			arg[2]=arg[2]?arg[2]:'update';
			ls = spawn('sh', [shpath+'/submit.sh',arg[1],arg[2],path.offlinePath,path.onlinePath] )
			ls.stdout.on('data', function(data) {
				console.log(chalk.cyan('standard output:') + data);
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