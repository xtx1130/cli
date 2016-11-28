'use strict';
var mkdirs = function(dirpath, mode, callback) {
	mode = mode || '0777';
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
var fileDeps = (files,folderName) => {
	var absolutePath = process.cwd();
	for (var i = 0; i < files.length; i++) {
		for (var j in files[i]) {
			mkdirs(absolutePath + '/' + folderName + '/' + j);
			files[i][j]&&files[i][j].forEach(function(k) {
				mkdirs(absolutePath + '/' + folderName + '/' + j + '/' + k);
			})
		}
	}
}
module.exports = fileDeps;