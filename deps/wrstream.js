/*
 *@description 文件流写入
 *@params path [string] 文件路径
 *@params content [buffer] 文件内容
 *@params finish [string] 完成信息
 */
'use strict';

function Wt(path, content, finish) {
	var _writerStream = fs.createWriteStream(path);
	_writerStream.write(content, 'UTF8');
	_writerStream.end();
	_writerStream.on('finish', function() {
		finish = finish || 'finished'
		console.log(finish);
	});
	_writerStream.on('error', function(err) {
		console.log(err.stack);
	});
}
module.exports = Wt