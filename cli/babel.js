const babel = require('babel-core');
class Babels {
	constructor() {
		this.option = {
			'-m':'minified'
		}
		this.description = ''
	}
	action() {
		return () => {
			var args = process.argv.splice(2);
			babel.transformFile(args[1],function(err, result) {
				let code = result.code;
				let pss = args[1].split('/');
				let [pa, min] = ['', ''];
				if (pss.length > 1) {
					min = pss.pop().split('.');
					pss = pss.join('/');
				} else {
					min = pss.split('.');
					pss = ''
				}
				min.pop();
				min = min.join('.') + '.es5.js';
				pa = process.cwd() + '/' + pss;
				fs.writeFile(pa + '/' + min, code, function(err) {
					if (err)
						throw err;
				})
			});
		}
	}
}

exports._export = Babels;