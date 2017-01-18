'use strict';
const ug = require('uglify-js2');
const path = require('../deps/tpath');
const wrs = require('../deps/wrstream');
const crypto = require('crypto');
const fs = require('fs');
const co = require('co');
const chalk = require('../deps/chalkInfo');
class Uglify{
	constructor(){
		this.option={
			'-b,--beautify':'beautiful program',
			'-m,--md5':'md5 file pass added'
		},
		this.description="UglifyJs2"
	}
	action(){
		return (ac,opts)=>{
			if(!ifInit)
				return false
			let opt = {mangle:false,beautify:false},
				file=[],
				result='',
				args = process.argv.splice(2);
			for(var i=0;i<args.length;i++){
				if(args[i].match('.js'))
					file.push(args[i])
			}
			if(opts.beautify)
				opt.beautify=true;
			if(opts.md5){
				var str = '';
				co(function* (){
					let _str='';
					let num1 = yield new Promise((res,rej)=>{
						let md5sum = crypto.createHash('md5'),
							stream = fs.createReadStream(file[0]);
						stream.on('data', function(chunk) {
					        md5sum.update(chunk);
					    });
					    stream.on('end', function() {
					        _str = md5sum.digest('hex').toUpperCase();
					        res();
						});
						stream.on('error', function() {//promise 防止内存泄露
					        rej();
					    });
					})
					return _str
				}).then((val)=>{
					let _tem = val.split(''),
						low = _tem.slice(-3,-1),
						high = _tem.slice(0,4),
						md5 = high.concat(low).join('');
					result = ug.minify(file,opt).code;
					let pa = new path(file[0]);
					pa.name = pa.name.join('.') + '_@' + md5 + '.min.js';
					wrs(pa.path + '/' + pa.name,result,chalk.info+'uglify finished')
				})
			}else{
				result = ug.minify(file,opt).code;
				let pa = new path(file[0]);
				pa.name = pa.name.join('.') + '.min.js';
				wrs(pa.path + '/' + pa.name,result,chalk.info+'uglify finished')
			}
			
		}
	}
}
exports._export = Uglify;