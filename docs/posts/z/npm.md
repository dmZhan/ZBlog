---
title: npm
description: npm
date: 2023-01-01
tags:
  - node
---

## NPM

## package.json

### 字段定义

Q: 在不同环境下`import`一个`npm`包时，加载的是`npm`包的哪个文件?

`npm`包分为: 只允许在客户端使用的，只允许在服务端使用的，浏览器/服务端都能使用。
如果我们需要开发一个`npm`包同时兼容支持**web端**和**server端**，需要在不同环境下加载`npm`包不同的入口文件，显然一个**main**字段已经不能够满足我们的需求，这就衍生出来了**module**与**browser**字段

文件优先级

我们使用的模块规范有ESM和CommonJS两种，为了能在node环境下原生执行ESM规范的脚本文件，.mjs文件就应运而生。

当存在index.mjs和index.js这种不同后缀的文件时，import './index'或者require('./index')是会优先加载index.mjs文件的。

也就是说，优先级mjs>js

- `main`: 定义了`npm`包的入口文件，browser和node环境均可使用
- `module`: 定义了`npm`包的ESM规范的入口文件，browser环境和node环境均可使用
- `browser`L 定义`npm`包在browser环境下的入口文件

假定lib包内有以下目录结构

```json
----- lib
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```

其中\*.js文件是使用CommonJS规范的语法(require('xxx')), \*.mjs是用ESM规范的语法(import 'xxx')。

其package.json文件:

```json
{
  "main": "lib/index.js",
  "module": "lib/index.mjs",
  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义成字符串
  "browser": {
    "./lib/index.js": "./lib/index.browser.js",
    "./lib/index.mjs": "./lib/index.browser.mjs"
  },
  // "browser": "./lib/index.browser.js"
}
```

根据上述配置，那么package.json指定的入口可以有

- main
- module
- browser
- browser+cjs
- browser+mjs

## npm scripts 使用指南

### 什么是npm脚本？

npm 允许在package.json文件里面，使用scripts字段定义脚本命令

scripts字段是一个对象。它的每一个属性，对应一段脚本

npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。

由于 npm 脚本的唯一要求就是可以在 Shell 执行，因此它不一定是 Node 脚本，任何可执行文件都可以写在里面。

npm 脚本的退出码，也遵守 Shell 脚本规则。如果退出码不是0，npm 就认为这个脚本执行失败。

### 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```json
  "lint": "jshint *.js"
  "lint": "jshint **/*.js"
```

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义

```json
"test": "tap test/\*.js"
```

### 传参

向 npm 脚本传入参数，要使用--标明

### 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：script-runner、npm-run-all、redrun
