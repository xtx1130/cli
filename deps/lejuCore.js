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
		if(this.file){
			let result = browser(this.file)
			result.bundle((err,buf)=>{
				if(err)
					console.log(err)
				else {
					this.data.code = buf;
					console.log(this.data.code)
				}
			});
		}else{
			throw new Error('妈蛋，browserify只能传file路径不能传file内容，怪我咯');
		}
		return this;
	}
}
module.exports = Base;