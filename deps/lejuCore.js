'use strict';
const uglify = require('../cli/uglify');
const br = require('browserify');
class Base{
	constructor(objs={uglify:{},common:{}}){
		console.log(objs)
	}
	pack(){

	}
}
module.exports = Base;