'use strict';
const babel = require('babel-core');
const path = require('../deps/tpath');
const wrs = require('../deps/wrstream');
const chalk = require('../deps/chalkInfo');
class Babels {
	constructor() {
		this.option = {
			'-m,--mini':'minified'
		}
		this.description = '6to5'
	}
	action() {
		return (ac,option) => {
			if(!ifInit)
				return false
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
				wrs(pa.path + '/' + pa.name,code,chalk.info+'babel finished')
			});
		}
	}
}

exports._export = Babels;