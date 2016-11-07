#!/bin/zsh
file="/etc/hosts";
source ~/.zshrc;
type=0;
env[1]="开发" env[2]="测试"  env[3]="线上";
echo "现在是${env[$HOSTS]}环境";
read -p "选择切换到：1.开发  2.测试  3.线上 : " type;
if [[ $HOSTS -eq $type ]];
then
       echo "环境不变"
       exit
fi
case $type in
1)
        echo "正切换到开发环境"
                sed -i "" '/testcdn/,/end/s/^/#/' $file;
                sed -i "" '/localcdn/,/end/s/#//g' $file;
                sudo nginx;
        ;;
2)
        echo "正切换到测试环境"
                sed -i "" '/testcdn/,/end/s/^/#/' $file;
                sed -i "" '/testcdn/,/localcdn/s/#//g' $file;
                nginx -s stop;
        ;;
3)
        echo "正切换到线上"
                sed -i "" '/testcdn/,/end/s/^/#/' $file;
        ;;
*)
        echo "输入错误"
        exit
        ;;
esac
sed -i "" "s/HOSTS=$HOSTS/HOSTS=$type/" ~/.zshrc;
cat $file;
killall -HUP mDNSResponder;