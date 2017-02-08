#!/bin/zsh
filepath=$1;
message=$2;
offline=$3;
online=$4;
info='';
readonly online;
readonly offline;
function strToArr()
{
	OLD_IFS=$IFS;
	IFS=' ';
	arr=($*);
	IFS=$OLD_IFS;
	len=${#arr[@]};
	for((i=0;i<$len;i++))
	{
		if [[ ${arr[i]} == "?" ]];
		then
			svn add ${arr[i+1]}
		fi
	}
	return $arr
}
# 文件处理
if [ $message ] && [[ $filepath =~ ".js" ]] || [[ $filepath =~ ".css" ]] || [[ $filepath =~ ".png" ]] || [[ $filepath =~ ".jpg" ]];
then
	var1=${filepath%%/*};
	echo '\033[33m['$var1'] update \033[0m';
	cd $online$var1;
	svn up;
	sudo cp $offline$filepath $online$filepath;
	echo '\033[33m['$online$filepath'] update \033[0m' ;
	cd $online$var1;
	info=`svn status`;
	strToArr $info
	#svn ci -m \'${message}\';
	svn log $online$filepath -v -l2;
	exit 0;
# 文件夹处理
elif [ $message ];
then 
	tarpath=${filepath##*/};
	folder=${filepath%/*};
	echo $online$filepath;
	cd $online$filepath;
	svn up;
	#TO DO：加上了-v结果无法把结果流输出给node
	echo `sudo tar --exclude '*.svn' -C $offline${folder} -cvf - $tarpath | ( cd $online${folder}; tar -xf -)`;
	echo '\033[33m['$online$filepath'] update \033[0m' ;
	cd $online$filepath;
	svn ci -m \'${message}\'; # > /dev/null
	svn log $online$filepath -v -l2;
	exit 0;
# 没有提示消息,其实没什么卵用，默认undefined了
else
	echo 'no submit message';
	exit 0;
fi
