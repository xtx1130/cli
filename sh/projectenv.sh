#!/bin/zsh
hostfile="/etc/hosts";
targetfile=$1;
tem=$2;
isadd=${tem:-0};
if [ $isadd -eq 0 ];
then
	sed -i "" "/$targetfile/s/^/#/" $hostfile;
elif [ $isadd -gt 0 ];
then
	sed -i "" "/$targetfile/s/#//" $hostfile;
fi