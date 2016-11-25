#!/bin/zsh
filepath=$1;
message=$2;
online='/Users/xtx/Desktop/workspace/online/203/cdn.ljimg.com/trunk/';
offline='/Users/xtx/Desktop/workspace/trunk/';
# 文件处理
if [ $message ] && [[ $filepath =~ ".js" ]] || [[ $filepath =~ ".css" ]];
then
	var1=${filepath%%/*};
	echo '['$var1'] update';
	cd $online$var1;
	svn up;
	sudo cp $offline$filepath $online$filepath;
	echo '\033[33m['$online$filepath'] update \033[0m' ;
	cd $online$var1;
	svn ci -m \'${message}\';
	svn log -v -l2;
	exit 0;
# 文件夹处理
elif [ $message ];
then 
	tarpath=${filepath##*/};
	folder=${filepath%/*};
	echo $tarpath;
	echo $folder;
	echo $online$filepath;
	cd $online$filepath;
	svn up;
	#TO DO：加上了-v结果无法把结果流输出给node
	echo `sudo tar --exclude '*.svn' -C $offline${folder} -cvf - $tarpath | ( cd $online${folder}; tar -xf -)`;
	echo '\033[33m['$online$filepath'] update \033[0m' ;
	cd $online$filepath;
	svn ci -m \'${message}\';
	svn log -v -l2;
	exit 0;
# 没有提示消息
else
	echo 'no submit message';
	exit 0;
fi
