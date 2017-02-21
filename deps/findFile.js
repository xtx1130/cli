'use strict';
const path = require('path');
function findFile(filename){
	let basePath = arguments[1]||process.cwd();
	let exist = fs.existsSync(basePath+'/'+filename);
	if(exist)
		return basePath+'/'+filename
	else{
		if(arguments[1]!='/')
			return findFile(filename,path.resolve(basePath,'..'))
		else
			return false
	}
}
module.exports=findFile;