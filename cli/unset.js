'use strict';
const fs = require('fs');
const chalk = require('../deps/chalkInfo');
class Unset {
	constructor() {
		this.option = {
		}
		this.description = "unset info.json"
	}
	action() {
		return (ac) => {
			let file = path.join(__dirname, '../config/info.json');
			fs.writeFile(file,'',{flag:'w'},function(err){//默认的是w用a做了下测试
				if(err)
					console.log(chalk.error + err)
				console.log(chalk.info + 'file has finished reset!')
			})
		}
	}
}
exports._export = Unset;