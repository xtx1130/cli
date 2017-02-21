'use strict';
const path = require('path');
function findFile(filename){
	let basePath = arguments[1]||process.cwd();
	let exist = fs.existsSync(filename);
	if(exist)
		return true
	else{
		if(arguments[1]!='/')
			findFile(filename,path.resolve(basePath,'..'))
		else
			return false
	}
}
module.exports=findFile;