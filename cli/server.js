'use strict';
const shpath = require('../deps/shpath');
const serverPath = path.resolve(__dirname, '../deps/staticServer.js');
const spawn = require('child_process').spawn;
const chalk = require('../deps/chalkInfo');
class Server {
	constructor() {
		this.option = {
			
		}
		this.description = 'node server ,proto file cross domain added'
	}
	action() {
		return () => {
			if(!ifInit)
				return false
			let ls = spawn('sh', [shpath+'/serverStart.sh',serverPath] )
			ls.stdout.on('data', function(data) {
				console.log(chalk.info + data);
			});
			ls.on('exit', function(code) {
				
			})
			ls.on('close', function(code) {
				
			});
		}
	}
}

exports._export = Server;