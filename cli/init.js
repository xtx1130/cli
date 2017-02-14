'use strict';
const readline = require('readline');
const createfile = require('../deps/createFile');
const chalk = require('../deps/chalkInfo');
const spawn = require('child_process').spawn;
const shpath = require('../deps/shpath');
const infoRead = require('../deps/readFile');
class Init{
	constructor(){
		this.option={
			
		},
		this.description="init projects"
	}
	action(){
		return (ac)=>{
			var rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				}),
				json = {offlinePath:'',onlinePath:''};
			function offline(func,func1){
				rl.question(chalk.info+"What is your offline absolute path?\n",answer=>{
					let offlinepath = answer;
					if(!offlinepath){
						offline()
					}else{
						json.offlinePath = offlinepath
						func(func1)
					}
				})
			}
			function online(func){
				rl.question(chalk.info+"What is your online absolute path?\n",answer=>{
					let onlinepath = answer;
					if(!onlinepath){
						online()
					}else{
						json.onlinePath = onlinepath
						createfile('info.json',json,()=>{
							func()
						})
					}
				})
			}
			function bashsrc(){
				rl.question(chalk.info+"Please tell me where is your bashsrc or zshrc files...(absoulte path)\n",answer=>{
					if(!answer){
						bashsrc()
					}else{
						let ls = spawn('sh', [shpath+'/changeContent.sh',answer,'HOSTS=1'] )
						ls.on('exit', (code) => {
							process.stdout.write(chalk.info+'\n'+'HOSTS config is ok!')
						})
						rl.close()
					}
				})
			}
			let info = infoRead('info.json');
			if(info.offlinePath&&info.onlinePath){
				process.stdout.write(chalk.info+'Path has already exsits!')
				rl.close()
			}else{
				offline(online,bashsrc);
			}
		}
	}
}
exports._export = Init;