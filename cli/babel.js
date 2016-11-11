'use strict';
const babel = require('babel-core');
const path = require('../deps/tpath');
class Babels {
	constructor() {
		this.option = {
			'-m,--mini':'minified'
		}
		this.description = '6to5'
	}
	action() {
		return (ac,option) => {
			let opt = {minified:false},
				ext = '.es5.js';
			if(option.mini){
				opt.minified=true
				ext = '.es5min.js'
			}
			var args = process.argv.splice(2);
			babel.transformFile(args[1],opt,function(err, result) {
				let code = result.code;
				let pa = new path(args[1]);
				pa.name = pa.name.join('.') + ext;
				var writerStream = fs.createWriteStream(pa.path + '/' + pa.name);
				writerStream.write(code,'UTF8');
				writerStream.end();
				writerStream.on('finish', function() {
				    console.log("babel finished");
				});
				writerStream.on('error', function(err){
				   console.log(err.stack);
				});
			});
		}
	}
}

exports._export = Babels;