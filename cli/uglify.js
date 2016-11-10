'use strict';
let ug = require('uglify-js2');
let path =require('path');
class Uglify{
	constructor(){
		this.option={
			'-b,--beautify':'beautiful program'
		},
		this.description="UglifyJs2"
	}
	action(){
		return (ac)=>{
			let opt = {mangle:false},
				file=[],
				result='',
				args = process.argv.splice(2);
			for(var i=0;i<args.length;i++){
				if(args[i].match('.js'))
					file.push(args[i])
			}
			if(ac.beautify)
				opt.beautify=true
			result = ug.minify(file,opt)
			//to do
			console.log(result)
			
		}
	}
}
exports._export = Uglify;