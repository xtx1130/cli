'use strict';
const fs = require('fs');
const Promise = require('bluebird');
let PromRead = Promise.method(
		path => {
		let bufferData = [];
		return new Promise((resolve,reject)=>{
			if (path && fs.existsSync(path)) {
				let files = fs.createReadStream(path);
				files.on('data', data => {
					bufferData.push(data);
				})
				files.on('end', () => {
					resolve(Buffer.concat(bufferData));
				})
				files.on('error',err => {
					reject(err)
				})
			}
		})
	}
)
module.exports = PromRead;