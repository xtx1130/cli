#!/usr/bin/env node

'use strict';
const program = require('commander');
const exec = require('child_process').exec;
const Promise = require('bluebird');
const chalk = require('../deps/chalkInfo');
const findFile = require('../deps/findFile');
let leju = require('../deps/lejuCore'),
	lejuConfig = {};
global.path = require('path');
global.fs = require('fs');
global.ifInit = require('../deps/ifInit');
Promise.promisifyAll(global.fs);
//开放出全局xtx变量接口，为接入wp之类的做准备 
Object.defineProperty(global, 'xtx', {
    enumerable: true,
    writable: false,
    value: leju
});
program
	.version('2.0.0')
	.option('-h --help','help doc');

program.command('update').action(() => {
	exec('sudo npm update leju-cli', (err, stdout, stderr)=> {
		if (!err && stdout) {
			console.log(chalk.info+'update ok')
		} else {
			console.log(chalk.warning+'尼玛，用的最新的升级毛线！')
		}
	})
})
if(!process.argv.slice(2).length){
	let _file = findFile('xtxconfig.js'),
		_fileConfig = require(_file);
	if(_file){
		console.log(_fileConfig)
	}else{
		process.stdout.write(chalk.info+'please use xtx help for more information');
	}
}
let scanner = () => {
	let readlist = fs.readdirSync(__dirname + '/../cli'),
		_str = [];
	readlist.forEach(s=>{
		if(s.match('.js'))
			_str.push(s)
	})
	return _str;
}
let comm = scanner()
for (let i = 0; i < comm.length; i++) {
	let str = comm[i].split('.')[0];
	let tag = require(__dirname + '/../cli/' + comm[i])._export;
	let prog = program.command(str);
	if (typeof tag == 'function') {
		tag = new tag()
		if (tag.option) {
			for (let j in tag.option) {
				prog.option(j, tag.option[j])
			}
		}
		prog.action(tag.action.call(prog))
	} else {
		if (tag.option) {
			for (let j in tag.option) {
				prog.option(j, tag.option[j])
			}
		}
		prog.action(tag.action)
	}
	prog.description(tag.description);
}
program.parse(process.argv); //开始解析用户输入的命令