'use strict';
const fs = require('fs');
const Promise = require('bluebird');
let PromWrite = Promise.method(
		(path,buf) => {
		return new Promise((resolve,reject)=>{
			console.log(path)
			if (path) {
				try{
					let files = fs.createWriteStream(path);
					files.write(buf,'UTF-8')
					files.end(()=>{
						reslove()
					})
				}catch(e){
					reject(e)
				}
			}
		})
	}
)
module.exports = PromWrite;