'use strict';
const ug = require('uglify-js2');
const path = require('../deps/tpath');
const wrs = require('../deps/wrstream');
class Uglify{
	constructor(){
		this.option={
			'-b,--beautify':'beautiful program'
		},
		this.description="UglifyJs2"
	}
	action(){
		return (ac)=>{
			let opt = {mangle:false,beautify:false},
				file=[],
				result='',
				args = process.argv.splice(2);
			for(var i=0;i<args.length;i++){
				if(args[i].match('.js'))
					file.push(args[i])
			}
			if(ac.beautify)
				opt.beautify=true;
			result = ug.minify(file,opt).code;
			let pa = new path(file[0]);
			pa.name = pa.name.join('.') + '.min.js';
			wrs(pa.path + '/' + pa.name,result,'uglify finished')
		}
	}
}
exports._export = Uglify;