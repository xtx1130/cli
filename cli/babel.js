'use strict';
const babel = require('babel-core');
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
				let pss = args[1].split('/');
				let [pa, min] = ['', ''];
				if (pss.length > 1) {
					min = pss.pop().split('.');
					pss = pss.join('/');
				} else {
					min = pss.split('.');
					pss = ''
				}
				min.pop();
				min = min.join('.') + ext;
				pa = process.cwd() + '/' + pss;
				var writerStream = fs.createWriteStream(pa + '/' + min);
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