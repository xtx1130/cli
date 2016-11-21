var f = function(){
	this.description='help commend'
	this.action=function(){
		return function(){
    		console.log('babel          ---------es6to5')
    		console.log('folder          ---------establish folder')
    		console.log('help     -h     ---------LJ info')
    		console.log('cinit          ---------commonjs browserify')
    		console.log('uglify          ---------compass javascript')
            console.log('ci          ---------auto online update')
            console.log('server          ---------establish localserver')
            console.log('cdn          ---------auto online update')
            console.log('     -l          local host')
            console.log('     -t          test(dev) host')
            console.log('     -o          online host')
        }
	}
}
exports._export=f
