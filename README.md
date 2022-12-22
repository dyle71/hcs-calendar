# hcs-calendar

This is a calendar implemented in TypeScript and Vue 3 using Vite 4.

## Run

You need a decent recent node version (https://nodejs.org/en/) installed. Then open
install all necessary packages

```bash
$ npm install
```

and start the app.

```bash
$ npx vite
```

## Options

Check the output of: 

```bash
$ npx vite --help
vite/4.0.3

Usage:
  $ vite [root]

Commands:
  [root]           start dev server
  build [root]     build for production
  optimize [root]  pre-bundle dependencies
  preview [root]   locally preview production build

For more info, run any command with the `--help` flag:
  $ vite --help
  $ vite build --help
  $ vite optimize --help
  $ vite preview --help

Options:
  --host [host]           [string] specify hostname 
  --port <port>           [number] specify port 
  --https                 [boolean] use TLS + HTTP/2 
  --open [path]           [boolean | string] open browser on startup 
  --cors                  [boolean] enable CORS 
  --strictPort            [boolean] exit if specified port is already in use 
  --force                 [boolean] force the optimizer to ignore the cache and re-bundle 
  -c, --config <file>     [string] use specified config file 
  --base <path>           [string] public base path (default: /) 
  -l, --logLevel <level>  [string] info | warn | error | silent 
  --clearScreen           [boolean] allow/disable clear screen when logging 
  -d, --debug [feat]      [string | boolean] show debug logs 
  -f, --filter <filter>   [string] filter debug logs 
  -m, --mode <mode>       [string] set env mode 
  -h, --help              Display this message 
  -v, --version           Display version number 
```

## Notable guidelines

* How (not) to write git commit messages: https://www.codelord.net/2015/03/16/bad-commit-messages-hall-of-shame/
* How to version your software: https://semver.org/
* How to write a clever "Changes" file: https://keepachangelog.com/en/1.0.0/
* Folder Convention: https://github.com/KriaSoft/Folder-Structure-Conventions

---

Copyright (C) 2022 headcode.space e.U.  
Oliver Maurhart <info@headcode.space>  
[https://headcode.space](https://www.headcode.space)  
