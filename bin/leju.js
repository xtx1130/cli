#!/usr/bin/env node

'use strict';
const program = require('commander');
const exec = require('child_process').exec;
const Promise = require('bluebird');
let leju = require('../deps/lejuCore');
global.path = require('path');
global.fs = require('fs');
global.ifInit = require('../deps/ifInit');
Promise.promisifyAll(global.fs);
Object.defineProperty(global, 'leju', {
    enumerable: true,
    writable: false,
    value: leju
});
program
	.version('1.2.5')
	.option('-h --help','help doc');

program.command('update').action(() => {
	exec('npm update leju-cli', (err, stdout, stderr)=> {
		if (!err && stdout) {
			console.log('update ok')
		} else {
			console.log('尼玛，用的最新的升级毛线！')
		}
	})
})
// if(!process.argv.splice(2).length){
// 	var _ex = fs.existsSync(process.cwd()+'/lejuconfig.js');
// 	if(_ex){
// 		console.log(1)
// 	}else{
// 		process.stdout.write('please use leju help for more information');
// 	}
// }
function scanner() {
	var readlist = fs.readdirSync(__dirname + '/../cli'),
		_str = [];
	readlist.forEach(function(s){
		if(s.match('.js'))
			_str.push(s)
	})
	return _str;
}
var comm = scanner()
for (var i = 0; i < comm.length; i++) {
	var str = comm[i].split('.')[0];
	var tag = require(__dirname + '/../cli/' + comm[i])._export;
	var prog = program.command(str);
	if (typeof tag == 'function') {
		tag = new tag()
		if (tag.option) {
			for (var j in tag.option) {
				prog.option(j, tag.option[j])
			}
		}
		prog.action(tag.action.call(prog))
	} else {
		if (tag.option) {
			for (var j in tag.option) {
				prog.option(j, tag.option[j])
			}
		}
		prog.action(tag.action)
	}
	prog.description(tag.description);
}
program.parse(process.argv); //开始解析用户输入的命令