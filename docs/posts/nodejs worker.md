---
title: node worker
description: worker
date: 2023-11-14
tags:
  - node
---

## 线程和进程

::: info 单核CPU是怎么执行多任务?
操作系统轮流让各个任务交替执行，任务1执行0.01秒，切换到任务2，任务2执行0.01秒，再切换到任务3，执行0.01秒……这样反复执行下去。表面上看，每个任务都是交替执行的，但是，由于CPU的执行速度实在是太快了，我们感觉就像所有任务都在同时执行一样
:::

对于操作系统来说，一个任务就是一个进程（Process），比如打开一个浏览器就是启动一个浏览器进程，打开一个记事本就启动了一个记事本进程，打开两个记事本就启动了两个记事本进程，打开一个Word就启动了一个Word进程。

有些进程还不止同时干一件事，比如Word，它可以同时进行打字、拼写检查、打印等事情。在一个进程内部，要同时干多件事，就需要同时运行多个“子任务”，我们把进程内的这些“子任务”称为线程（Thread）。

由于每个进程至少要干一件事，所以，一个进程至少有一个线程。当然，像Word这种复杂的进程可以有多个线程，多个线程可以同时执行，多线程的执行方式和多进程是一样的，也是由操作系统在多个线程之间快速切换，让每个线程都短暂地交替运行，看起来就像同时执行一样。当然，真正地同时执行多线程需要多核CPU才可能实现。

## Worker 线程是如何工作的？

JavaScript 语言没有多线程特性。因此，Node.js 的 Worker 线程以一种异于许多其它高级语言传统多线程的方式行事。
在 Node.js 中，一个 worker 的职责就是去执行一段父 worker 提供的代码（worker 脚本）。这段 worker 脚本将会在隔绝于其它 workers 的环境中运行，并能够在其自身和父 worker 间传递消息。worker 脚本既可以是一个独立的文件，也可以是一段可被 eval 解析的文本格式的脚本。

每个 worker 通过 message channel 连接到其父 worker。子 worker 可以使用 parentPort.postMessage() 函数向消息通道中写入信息，父 worker 则通过调用 worker 实例上的 worker.postMessage() 函数向消息通道中写入信息。看一下图 1:

> 一个 Message Channel 就是一个简单的通信渠道，其两端被称作 ‘ports’。在 JavaScript/NodeJS 术语中，一个 Message Channel 的两端就被叫做 port1 和 port2

## Node.js 的 workers 是如何并行的？

JavaScript 并不直接提供并发，那么两个 Node.js workers 要如何并行呢？答案就是 V8 isolate。
一个 V8 isolate 就是 chrome V8 runtime 的一个单独实例，包含自有的 JS 堆和一个微任务队列。这允许了每个 Node.js worker 完全隔离于其它 workers 地运行其 JavaScript 代码。其缺点在于 worker 无法直接访问其它 workers 的堆数据了。
由此，每个 worker 将拥有其自己的一份独立于父 worker 和其它 workers 的 libuv 事件循环的拷贝。

## 跨越 JS/C++ 的边界

实例化一个新 worker、提供和父级/同级 JS 脚本的通信，都是由 C++ 实现版本的 worker 完成的。在成文时，该实现为worker.cc (github.com/nodejs/node…)。
Worker 的实现通过 worker_threads 模块被暴露为用户级的 JavaScript 脚本。该 JS 实现被分割为两个脚本，我将之称为：

初始化脚本 worker.js — 负责初始化 worker 实例，并建立初次父子 worker 通信，以确保从父 worker 传递 worker 元数据至子 worker。 (github.com/nodejs/node…)
执行脚本 worker_thread.js — 根据用户提供的 workerData 数据和其它父 worker 提供的元数据执行用户的 worker JS 脚本。(github.com/nodejs/node…)

基于上述，我们可以将 worker 设置过程划分为两个阶段：

- worker 初始化
- 运行 worker

## CPU密集型示例

以生成斐波那契数列为例：

创建工作线程脚本文件worker.js

```javascript
const {parentPort, workerData} = require("worker_threads");

parentPort.postMessage(getFibonacciNumber(workerData.num))

function getFibonacciNumber(num) {
    if (num === 0) {
        return 0;
    }
    else if (num === 1) {
        return 1;
    }
    else {
        return getFibonacciNumber(num - 1) + getFibonacciNumber(num - 2);
    }
}
```

创建主线程脚本文件main.js:

```javascript
const {Worker} = require("worker_threads");

let number = 30;

const worker = new Worker("./worker.js", {workerData: {num: number}});

worker.once("message", result => {
    console.log(`${number}th Fibonacci Result: ${result}`);
});

worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log(`It exited with code ${exitCode}`);
})

console.log("Execution in main thread");
```

## nodejs CPU密集型应用历史

在 worker 线程之前，Node.js 中有多种方式执行 CPU 密集型应用。其中的一些为：

- 使用 child_process 模块并在一个子进程中运行 CPU 密集型代码
- 使用 cluster 模块，在多个进程中运行多个 CPU 密集型操作
- 使用诸如 Microsoft 的 Napa.js 这样的第三方模块

但是受限于性能、额外引入的复杂性、占有率低、薄弱的文档化等，这些解决方案无一被广泛采用。

### 初始化步骤

用户级脚本通过使用 worker_threads 创建一个 worker 实例
Node 的父 worker 初始化脚本调用 C++ 并创建一个空的 worker 对象。此时，被创建的 worker 还只是个未被启动的简单的 C++ 对象
当 C++ worker 对象被创建后，其生成一个线程 ID 并赋值给自身
同时，一个空的初始化消息通道（让我们称之为 IMC）被父 worker 创建。图 2 中灰色的 “Initialisation Message Channel” 部分展示了这点
一个公开的 JS 消息通道（称其为 PMC）被 worker 初始化脚本创建。 该通道被用户级 JS 使用以在父子 worker 之间传递消息。图 1 中主要描述了这部分，也在图 2 中被标为了红色。
Node 父 worker 初始化脚本调用 C++ 并将需要被发送到 worker 执行脚本中的 初始元数据 写入 IMC。

> 什么是初始元数据？ 即执行脚本需要了解以启动 worker 的数据，包括脚本名称、worker 数据、PMC 的 port2，以及其它一些信息。按我们的例子来说，初始化元数据如：☎️ 嘿！worker 执行脚本，请你用 {num: 5} 这样的 worker 数据运行一下 worker-simple.js 好吗？也请你把 PMC 的 port2 传递给它，这样 worker 就能从 PMC 读取数据啦。
