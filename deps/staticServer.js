//2013年毕设唯一用到现在的东西
'use strict';
const http = require("http");
const fs = require('fs');
const server = new http.Server();
const port = process.argv.splice(2)[0];
const Mime = require('./mime');
const chalk = require('./chalkInfo');
var s=(port)=> {
	server.listen(port);
	console.log('[server listen at: '+port+' ]')
	server.on('error', function(e) {
		console.log(chalk.error+e);
		let _port = e.port+1;
		s(_port)
	})
	server.on('request', (request, response) => {
		let url = require('url').parse(request.url),
			filename = url.pathname.substring(1),
			mime = filename.substring(filename.lastIndexOf('.') + 1),
			type;
		if(Mime[mime])
			type = Mime[mime]
		else
			type = 'application/octet-stream';
		fs.readFile(process.cwd()+'/'+filename, function(err, content) {
			if (err) {
				console.log(chalk.error+err)
				response.writeHead(404, {
					"Content-Type": "text/plain;charset=UTF-8;"
				});
				response.write(err.message);
				response.end();
			} else {
				let headers = {
					"Content-Type": type,
					"X-Forwarded-For": request.headers['x-forwarded-for'],
					"X-Forwarded-Host": request.headers['x-forwarded-host']
				}
				if (request.headers['access-control-allow-origin']) {
					headers['access-control-allow-origin'] = request.headers['access-control-allow-origin']
					headers['access-control-allow-headers'] = request.headers['access-control-allow-headers']
					headers['access-control-allow-methods'] = request.headers['access-control-allow-methods']
				}
				response.writeHead(200, headers);
				response.write(content);
				response.end();
			}
		});
	});
}
s(port)