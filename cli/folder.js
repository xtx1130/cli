/**
 *@description 生成乐居FE开发环境相关目录结构
 *@author tianxin@leju.com
*/
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
				rl.question('Do you need controller folder? Y/N \n', function sb(answer) {
					var fn = sb;
					if (answer == 'y' || answer == 'Y' || answer == 'yes') {
						mkdirs(process.cwd() + '/' + folderName + '/' + 'controller')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/style')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/js')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/html')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/images')
						rl.close();
					} else if (answer == 'n' || answer == 'N' || answer == '') {
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/style')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/js')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/html')
						mkdirs(process.cwd() + '/' + folderName + '/' + 'statics/images')
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