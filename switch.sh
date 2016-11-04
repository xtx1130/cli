#!/bin/bash
#切换本机hosts环境
file="/etc/hosts";
type=0;
env[1]="开发" env[2]="测试"  env[3]="线上";

echo "现在是 ${env[$HOSTS]} 环境";
read -p "选择切换到：1.开发  2.测试  3.线上 : " type;

if [ $HOSTS -eq $type ];
then
        echo "环境不变"
        return
fi
case $type in
1)
        echo "正切换到开发环境。。"
                sed -i '/#dev/,/#end/s/^ / /' $file;
                sed -i '/#online/,/#dev/s/# / /' $file;
        ;;
2)
        echo "正切换到测试环境"
                sed -i '/#dev/,/#end/s/^ /# /' $file;
                sed -i '/#online/,/#dev/s/# / /' $file;
        ;;
3)
        echo "正切换到线上"
                sed -i '/#test/,/#end/s/^ /# /' $file;
                sed -i '/#online/,/#test/s/ / /' $file;
        ;;
*)
        echo "输入错误"
        return
        ;;
esac
sed -i "s/HOSTS=$HOSTS/HOSTS=$type/" ~/.bash_profile;
source ~/.bash_profile;
cat $file;
killall -HUP mDNSResponder;