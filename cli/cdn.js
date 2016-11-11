'use strict';
const spawn = require('child_process').spawn;
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
			ls = spawn('sh', ['switch.sh',status] )
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