#!/bin/zsh
src=$1;
sudo node --trace_gc src > stdout.txt < /dev/null;
exit 0;