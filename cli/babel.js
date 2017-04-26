'use strict';
const babel = require('babel-core');
const path = require('../deps/tpath');
const wrs = require('../deps/wrstream');
const progress = require('progress');
const chalk = require('../deps/chalkInfo');
const es2015 = require('babel-preset-es2015');

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
			let opt = {minified:false,presets:[es2015]},
				ext = '.es5.js';
			if(option.mini){
				opt.minified=true
				ext = '.es5min.js'
			}
			let args = process.argv.splice(2);
			babel.transformFile(args[1],opt,(err, result) => {
				let code = result.code;
				let pa = new path(args[1]);
				pa.name = pa.name.join('.') + ext;
				wrs(pa.path + '/' + pa.name,code,chalk.info+'babel finished')
			});
		}
	}
}

exports._export = Babels;