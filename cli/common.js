'use strict';
const br = require('browserify');
const path = require('../deps/tpath');
const wrs = require('../deps/wrstream');
class Brow{
	constructor(){
		this.option={
			
		},
		this.description="browserify commonjs"
	}
	action(){
		return (ac)=>{
			if(!ifInit)
				return false
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
					wrs(pa.path + '/' + pa.name,buf,'browserify finished')
				}

			});
		}
	}
}
exports._export = Brow;