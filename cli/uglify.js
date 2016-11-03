'use strict';
let ug = require('uglify-js');
let path =require('path');
class Uglify{
	constructor(){
		this.option={},
		this.description=""
	}
	action(){
		return function(){}
	}
}
exports._export = Uglify;