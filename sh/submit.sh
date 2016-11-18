#!/bin/zsh
filepath=$1;
message=$2
online='/Users/xtx/Desktop/workspace/online/203/cdn.ljimg.com/trunk/';
offline='/Users/xtx/Desktop/workspace/trunk/';
var1=${filepath%%/*};
echo '['$var1'] update';
cd $online$var1;
svn up;
sudo cp $offline$filepath $online$filepath;
echo '['$online$filepath'] update';
cd $online$var1;
svn status;
svn ci -m \'${message}\'
exit 0;
