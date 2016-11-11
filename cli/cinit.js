'use strict';
const br = require('browserify');
const path = require('../deps/tpath');
class Brow{
	constructor(){
		this.option={
			
		},
		this.description="browserify commonjs"
	}
	action(){
		return (ac)=>{
			let file='',
				args = process.argv.splice(2);
			for(var i=0;i<args.length;i++){
				if(args[i].match('.js'))
					file = args[i]
			}
			let result=br(file);
			result.bundle((err,buf)=>{
				if(err)
					console.log(err)
				else {
					let pa = new path(file);
					pa.name = pa.name.join('.') + '.common.js';
					var writerStream = fs.createWriteStream(pa.path + '/' + pa.name);
					writerStream.write(buf, 'UTF8');
					writerStream.end();
					writerStream.on('finish', function() {
						console.log("browserify finished");
					});
					writerStream.on('error', function(err) {
						console.log(err.stack);
					});
				}

			});
		}
	}
}
exports._export = Brow;