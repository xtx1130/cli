'use strict';
const uglify = require('uglify-js2');
const browser = require('browserify');
const readFile = require('../deps/promiseReadfile');
const Promise = require('bluebird');
const emit = require('events').EventEmitter;
class Base extends emit{
	constructor(){
		super()
		this.file = void 0;
		this.data = {};
		this.methodPath = [];
	}
	_emitUglify(){
		this.emit('uglifyFinish')
	}
	_emitCommon(){
		this.emit('commonFinish')
	}
	uglify(opts={}){//opts.sourceMap='path'
		let opt = {fromString:true};
		let fileName = this.file.split('/').pop().split('.')[0];
		let uglifyFunc = res => {
			this.data.code = res;
			if(opts.sourceMap)
				opt.outSourceMap = fileName +'.out.js.map';
			if(!opts.md5)
				opt.outFileName = fileName+'.out.js';
			let result = uglify.minify(this.data.code,opt);
			this.data = {
				code:result.code,
				map:result.map,
				codeFile:opt.outFileName,
				mapFile:opt.outSourceMap
			};
			this.methodPath.push('uglify');
			this._emitUglify()
			console.log(this)
		};
		if(!this.data.code){
			let genera = async ()=>{
				let da = await readFile(this.file);
				return da;
			};
			genera().then(res=>{
				uglifyFunc(res)
			}).catch(err=>{
				throw err
			});
		}else{
			uglifyFunc(this.data.code)
		}
		return this;
	}
	common(){

	}
}
module.exports = Base;