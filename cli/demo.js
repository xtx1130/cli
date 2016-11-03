var f = function(){
	this.description='demo for leju-cli'
	this.action=function(){
		return function(){console.log('this is a demo');console.dir(this)}
	}
	this.option={
		'-v, --version':'0.0.0'
	}
}
exports._export=f