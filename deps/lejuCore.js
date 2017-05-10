'use strict';
const uglify = require('uglify-js2');
const browser = require('browserify');
const readFile = require('../deps/promiseReadfile');
class Base{
	constructor(){
		this.file = void 0;
		this.data = void 0;
	}
	uglify(opts={}){//opts.sourceMap='path'
		let opt = {fromString:true};
		let fileName = this.file.split('/').pop().split('.')[0];
		let genera = async ()=>{
			let da = await readFile(this.file);
			return da;
		};
		genera().then(res=>{
			this.data = res;
			if(opts.sourceMap)
				opt.outSourceMap = fileName +'.out.js.map';
			if(!opts.md5)
				opt.outFileName = fileName+'.out.js';
			let result = uglify.minify(this.data,opt);
			this.data = {
				code:result.code,
				map:result.map,
				codeFile:opt.outFileName,
				mapFile:result.file
			};
			return this;
		},err=>{
			console.log(err)
		})
	}
	common(){

	}
}
module.exports = Base;