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

### 生命周期

#### 安装和卸载

|脚本名称|阶段|描述|执行时机|
|:-:|:-:|:-|:-:|
|preinstall|pre|在 npm install 执行前运行，用于执行一些安装前的准备工作，例如检查依赖项或设置环境变量。|安装前|
|install,postinstall|install|在模块安装后执行，通常用于构建项目或者为其生成某些必须的文件，例如安装完毕后自动编译 TypeScript、ES6 等。|安装后|
|preuninstall|pre|在 npm uninstall 执行前运行，用于执行一些卸载前的准备工作。|卸载前|
|uninstall，postuninstall|post|在 npm uninstall 执行后运行，用于清理卸载后的一些操作。|卸载后|

#### 发布和更新版本

|脚本名称|阶段|描述|执行时机|
|:-:|:-:|:-|:-:|
|prepublish|pre|在 publish（npm发布）执行前，运行 npm pack。|发布前|
|prepare|pre|在包被发布前或安装前执行，可以用来设置编译或验证文件的操作。|发布前、安装前|
|prepublishOnly|pre|在 npm publish 执行前运行，用于确保在 publish 命令执行时不会意外发布不必要的文件。|发布前|
|prepack|pre|在 npm pack（打包命令）执行前运行，用于执行一些打包前的准备工作。|打包前|
|postpack|post|在 npm pack 执行后运行，用于清理和重置打包相关的操作。|打包后|
|publish|post|在包被成功发布后执行。|发布后|
|postpublish|post|在包被成功发布后执行，用于执行一些发布后的操作。|发布后|
|preversion|pre|在项目版本号更新（npm version）之前执行。|更新版本号前|
|version|post|在 npm version 执行后执行，用于执行一些版本更新后的操作。|更新版本号后|
|postversion|post|在项目版本号更新（npm version）之后执行。|更新版本号后|

#### 测试和运行

|脚本名称|阶段|描述|执行时机|
|:-:|:-:|:-|:-:|
|pretest|pre|在 npm test 执行前执行，用于执行某些测试前的准备工作。|测试前|
|test|test|执行 npm run test 命令时执行。通常用于执行单元测试，并返回任何错误状态。	|默认测试阶段|
|posttest|post|在 npm test 执行后执行，用于执行某些测试后的操作。|测试后|
|prestart|pre|在 npm start 执行前运行，用于执行某些启动进程前的准备工作。|启动前|
|start|start|执行 npm start 命令时执行，通常用于启动 Web 服务器、Node 服务器、实时编译器等。|默认启动阶段|
|poststart|pos|在 npm start 执行后执行，用于执行某些启动进程后的操作。|启动后|
|prerestart|pre|在 npm restart 执行前执行，用于执行一些重新启动进程前的准备工作。|重新启动前|
|restart|stop/start|执行 npm restart 命令时执行，通常用于停止正在运行的 Node 服务器、Web 服务器等，然后以更新的源码重新启动服务。	|默认重新启动阶段，但是该命令会触发停止和启动两个标准阶段|
|postrestart|post|在**npm restart**执行后执行，用于执行一些重新启动进程后的操作。|重新启动后|

#### 其它

|脚本名称|阶段|描述|执行时机|
|:-:|:-:|:-|:-:|
|prestop|pre|在 npm stop 执行前运行，用于执行某些停止进程前的准备工作。|停止前|
|stop|stop|执行 npm stop 命令时执行，通常用于停止正在运行的 Web 服务器、Node 服务器、实时编译器等。	|默认停止阶段|
|poststop|post|在 npm stop 执行后执行，用于执行某些停止进程后的操作。|停止后|
