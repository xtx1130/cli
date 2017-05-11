'use strict';
const uglify = require('uglify-js2');
const browser = require('browserify');
const readFile = require('../deps/promiseReadfile');
const writeFile = require('../deps/promiseReadfile');
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
		this.methodPath.push('uglify');
		let opt = {fromString:true};
		let fileName = this.file.split('/').pop().split('.')[0];
		let uglifyFunc = res => {
			this.data.code = res;
			if(opts.sourceMap)
				opt.outSourceMap = fileName +'.out.js.map';
			if(!opts.md5)
				opt.outFileName = fileName+'.out.js';
			let result = uglify.minify(this.data.code.toString(),opt);
			this.data = {
				code:new Buffer(result.code),
				map:result.map,
				codeFile:opt.outFileName,
				mapFile:opt.outSourceMap
			};
			console.log(this.data.code)
			console.log(2)
			console.timeEnd('test')
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
		this.methodPath.push('common');
		if(this.file){
			let result = browser(this.file)
			result.bundle((err,buf)=>{
				if(err)
					console.log(err)
				else {
					this.data.code = buf;
					this._emitCommon()
				}
			});
			console.log(1)
		}else{
			throw new Error('妈蛋，browserify只能传file路径不能传file内容，怪我咯');
		}
		return this;
	}
	out(path){
		path = path||this.data.codeFile;
		console.log(this.methodPath)
		writeFile(path,this.data.code).then(()=>{
			console.log(3)
			console.log(`$path has been writed`)
		},(err)=>{
			throw err;
		})
		return this;
	}
}
module.exports = Base;