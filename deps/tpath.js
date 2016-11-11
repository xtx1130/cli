/*
 *@description 拆分参数文件，判断文件夹（path）和文件名(name)
 *@params file [string] 文件名或者路径+文件名
*/
'use strict';
class Tpath{
	constructor(file) {
		let _pss = file.split('/');
		this.path='',
		this.name='';
		if (_pss.length > 1) {
			this.name = _pss.pop().split('.');
			_pss = _pss.join('/');
		} else {
			this.name = _pss[0].split('.');
			_pss = ''
		}
		this.name.pop();
		this.name=this.name
		this.path = process.cwd() + '/' + _pss;
	}
}
module.exports=Tpath;
