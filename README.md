# leju-cli 

> cli for leju


## Deeply individuation env for leju developers

### What is leju?

Establish folders quickly
Use plugins quickly
submit your code quickly
change hosts quickly

### Env needed:

_node(>=5.0.0),zsh bash,nginx_

```bash
npm install -g leju-cli
```

### parameter

```bash
leju -h --help 
```

```bash
leju init(init project)
```

```bash
leju version
```

```bash
leju folder
```

```bash
leju update
```

```bash
leju babel (-m)
```

```bash
leju cdn (-l --local,-o --online,-t --test)
```

```bash
leju common (browserify)
```

```bash
leju ci (svn up and ci)
```

```bash
leju hosts domain (-a --add add \# for domain,-d --delete delete \# for domain)
```

### 1.1.0 version

+ add programmer method and you can find demo.js for your fast establish a leju command

### 1.1.3 version

+ add babels for es6 to es5

### 1.1.4 version

+ add cdn for switch host(nginx,zsh,mac osX10+ needed)

### 1.1.5 version

+ add uglify for compass javascript

### 1.1.6 version

+ add static server (you need combine nginx to use it)
+ add sh folder for shell 

### 1.1.7 version

+ add auto push online 

### 1.1.9 version

+ fix switch.sh & submit.sh bug
+ add filedeps for deps
+ update folder for using config.js to control folder style

### 1.2.0 version

+ add projectenv.sh for hosts
+ add hosts for single host addon(#)

### 1.2.3 version

+ add auto init
+ fix bugs

### TO DO

+ fix bug

##tips

+ If you wanna use it or test it,please ensure your computer is mac osX 10.11+,and you should use zsh shell,  
gcc and make file is also needed,and do not forget nginx,O(∩_∩)O~

## License

MIT
