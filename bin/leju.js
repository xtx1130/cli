#!/usr/bin/env node

'use strict';
const program = require('commander');
const exec = require('child_process').exec;
global.path = require('path');
global.fs = require('fs');
program
	.version('1.1.3')
	.option('-h --help','help doc')
program.command('update').action(function() {
	exec('npm update leju-cli', function(err, stdout, stderr) {
		if (!err && stdout) {
			console.log('update ok')
		} else {
			console.log('尼玛，用的最新的升级毛线！')
		}
	})
})

function scanner() {
	var readlist = fs.readdirSync(__dirname + '/../cli');
	return readlist;
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