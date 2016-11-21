'use strict';
const spawn = require('child_process').spawn;
const shpath = require('../deps/shpath');
class Switch {
	constructor() {
		this.option = {
			
		}
		this.description = "svn update"
	}
	action() {
		return (ac) => {
			let arg = process.argv.splice(2),
				ls;
			ls = spawn('sh', [shpath+'/submit.sh',arg[1],arg[2]] )
			ls.stdout.on('data', function(data) {
				console.log('standard output:\n' + data);
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