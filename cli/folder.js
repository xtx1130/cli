/**
 *@description 生成乐居FE开发环境相关目录结构
 *@author tianxin@leju.com
*/
const fileFolder = require('../config/config.js');
const filedeps = require('../deps/filedeps');
function folder() {
	var readline = require('readline');
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	var mkdirs = function(dirpath, mode, callback) {
		fs.exists(dirpath, function(exists) {
			if (exists) {
				callback(dirpath);
			} else {
				//尝试创建父目录，然后再创建当前目录
				mkdirs(path.dirname(dirpath), mode, function() {
					fs.mkdir(dirpath, mode, callback);
				});
			}
		});
	};
	rl.question("What is your project name? ", function(answer) {
		var folderName = answer;

		function ifExists(name) {
			if (!fs.existsSync(name)) {
				return false;
			}
			return true
		}

		function notTheSame(name) {
			if (ifExists(name)) {
				rl.question('The folder has already exists,please change another name...\n', function(answer) {
					folderName = answer;
					notTheSame(folderName)
				})
			} else {
				rl.question('Do you need README file? Y/N \n', function sb(answer) {
					var fn = sb,
						absolutePath = process.cwd(),
						files = fileFolder.foleder;
					if (answer == 'y' || answer == 'Y' || answer == 'yes') {
						filedeps(files,folderName);
						filedeps(fileFolder.files,folderName)
						rl.close();
					} else if (answer == 'n' || answer == 'N' || answer == '') {
						filedeps(files,folderName)
						rl.close();
					} else {
						rl.question('Fuck!!please use Y/N \n', fn)
					}
				})
			}
		}
		notTheSame(folderName)
	});
}
exports._export = {
	action:folder,
	option:{},
	description:''
};