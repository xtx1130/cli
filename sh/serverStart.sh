#!/bin/zsh
src=$1;
host=$2;
hosts=${host:-8000};
sudo node $src $hosts;