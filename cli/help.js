var f = function(){
	this.description='help commend'
	this.action=function(){
		return function(){
    		console.log('babel,folder,help')
        }
	}
	this.option={
		'-v, --version':'0.0.0'
	}
}
exports._export=f
