---
date: 2023-07-16
title: Browser Extension开发中的陷阱：构建工具与第三方库
description: Browser Extension开发中的陷阱：构建工具与第三方库
tags:
  - Browser
---

# Browser Extension开发中的陷阱：构建工具与第三方库

![Web Extension](https://s2.loli.net/2023/07/15/9bBSfmHcahWU2uX.webp)

## Introduction

Chrome Extension Doc中的浏览器拓展源码结构看起来非常简单，只需用`manifest.json`组织好代码就能让拓展正常工作，但事实上文档中描述的结构只是一个Release，绝大多数情况下是开发流程的最后一环构建的产物。

实际的浏览器开发拓展在起步阶段可谓困难重重，足以让没有经验的开发者在与应用逻辑完全无关的地方浪费数小时、数天的时间仍不能解决问题，这无疑是一种痛苦的开发体验，这篇文章正是分析我个人在开发中遇到的那些让人头疼的问题。

这篇文章大体分为两大部分，第一部分关于构建工具的选择，第二部分关于第三方库可用性，这两部分有许多交叉的内容，可能会有所重复。

我很喜欢TailWind CSS作者Adam Wathan的一句话：

  <blockquote class="twitter-tweet" data-lang="en" data-theme="dark">
    <p lang="en" dir="ltr">🚫 Plan, plan, plan, build<br />✅ Build, rebuild, rebuild</p>
    &mdash; Adam Wathan (@adamwathan)
    <a href="https://twitter.com/adamwathan/status/1679276172486533121?ref_src=twsrc%5Etfw"
      >July 12, 2023</a
    >
  </blockquote>

前期计划也许很重要，但是不开始Coding永远不知道问题在哪里以及该如何解决问题。

## Build

你可以在我的[Github Gist](https://gist.github.com/aiktb/057c3d18b0653edb4e3d710143171fb4)查看Github中按照star数量排序的前50名浏览器拓展使用的构建工具的简易数据，这有助你选择技术栈。

下面是一个统计，排除了一些奇怪的东西（Ruby、C++）：

![BrowserExtensionStats](https://s2.loli.net/2023/07/15/HXZkV3zLfcv9EU6.webp)

在编程语言的选择上，可以看出TypeScript的使用率不低，在较大型的浏览器拓展项目中的采用率较高，这可能与TypeScript的可维护性较高有关，由于TypeScript需要编译为JavaScript，所有采用TypeScript的项目都使用了构建工具或脚本构建。

在构建方法的选择上，有接近40%的项目使用Webpack，是绝对的主流构建方法。30%的项目没有使用任何构建工具，Github仓库里存放的仅仅是Release，这可能是不现实的。有一定比例的开发者选择自己编写脚本构建输出目录来符合浏览器拓展规范，虽然使用的语言不同，但是思路是一致的。剩余的项目使用的构建工具都是特定于个别项目的，没有普适性，如gulp、nx、plasmo等。

下面按照构建复杂度依次介绍这些方法。

### No Tool

在介绍常见的浏览器拓展构建工具前，首先要介绍最原始的不使用任何构建工具来开发拓展的方法，这意味着不可以使用node.js环境，因为Release里不会有`package.json`和`node_modules`，这就会涉及第三方库问题，因为没有构建工具来自动打包依赖，所以开发者必须将所需的最小化依赖`*.min.js`文件放到`vendors`文件夹才能在项目中正常引用这些文件，同时这也引入了一个新问题，开发者可能无法使用ES6 module，因为这些最小化依赖文件基本上都是没有使用模块的，这对于熟悉ES6 module的开发者来说可能会非常痛苦。

之所以浏览器拓展开发会让人如此痛苦，正是因为其过于原始，和目前普遍使用vite、webpack等构建工具的模块化开发相差甚远，如果不使用任何构建工具，浏览器依赖要自己去第三方库的官网下载，IDE的静态分析会变成残废，也无法使用测试工具，可谓全是缺点，建议千万不要考虑这种方法，只有在项目的复杂度非常低时才可以考虑。

另外Github中使用这种方法开发的拓展，多数是古老遗留项目，在浏览器兼容下能正常运行，同时因为没有模块只能使用全局变量，类型定义也没有，项目的可读性极差，连一个变量是哪来的都分不清，这样的项目不推荐看源码，心智负担极重。

### Script build

如果使用脚本构建，那么正常的node.js坏境就可以使用，该有的tsc、test支持都与一般的前端开发没有区别。如果要使用tsc，就在`tsconfig.json`中配置好以下选项建立ts文件映射关系：

::: code-group

```json [tsconfig.json]
{
    "compilerOptions": {
        "rootDir": "src",
   		"outDir": "dist/js"
    }
    "include": ["src/**/*.ts", "src/**/*.d.ts"]
}
```

```txt [map]
project    -->   dist
└─src 	         └─js
   └─*.ts          └─*.js
```

:::

然后编写脚本：运行测试、运行tsc编译TypsScript到JavaScript、复制必要的文件如`manifest.json`、在浏览器开发者模式查看产品等...

看起来很简单？大错特错，这种方式有以下问题：

1. 仍然需要`vendors`目录，找支持浏览器的库源码很麻烦；
2. 没有文件热重载，除非你想自己手写一个watch；
3. 构建耗时长，复制粘贴文件这部分逻辑考虑到构建速度可能会很麻烦；
4. bash/bat是操作系统特定的，在Linux构建不能在Windows上快速查看产物；
5. 跨操作系统的JS脚本要引入一堆从未了解过的开发时依赖库。

node.js中常用的"删除文件"是[rimraf](https://www.npmjs.com/package/rimraf)，"复制文件"我建议使用[cpy-cli](https://www.npmjs.com/package/cpy-cli)，不要使用`cpx`，该库存在多个高危漏洞且无人维护。

总结：如果你只想简单用一用TypeScript、Jest等，那么这是可行的，在项目复杂度很低的时候这比不使用任何构建工具要容易得多，最重要的是IDE的所有静态分析以及node.js环境都可以正常工作，不至于两眼一抹黑。但我仍然不推荐使用脚本构建，心智负担很重，构建脚本写起来很麻烦。

### Build tool

无论是使用webpack、vite等主流构建工具，或者nx、gulp等小众构建工具，在浏览器拓展开发上都只有一个目的：最大限度简化开发中的繁琐事务。基于这些工具已有的庞大生态，有许多工作都可以被简化，如库文件打包、文件映射、复制资产文件以及文件热重载等...上文提到的痛点大部分可以转移到构建工具的配置上。

[chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)是一个Github有2k Star的模板仓库，旨在为只想在开发中使用TypeScript的开发者提供便利，注意该模板已过时，不要使用这个模板。该库没有使用`"type": "module"`，当你想一起正常使用ES6 module和TypeScript时将给你带来无尽的痛苦。

[vite-plugin-web-extension](https://github.com/samrum/vite-plugin-web-extension)也许是个不错的选择，它在默认配置下工作良好，只是文件结构略显混乱。

上文提到的这些构建工具没有一个是为浏览器拓展开发而生的，简化浏览器拓展只是它们生态中的一个插件而已，虽然已方便许多但仍显麻烦。那么到底有没有一个最终解决方案能改变这一切？

在收集资料时我看到了[plasmo](https://www.plasmo.com/)，一个为简化浏览器拓展开发而生的开源框架，官网的介绍非常诱人，我认为这值得一试。

![plasmo](https://s2.loli.net/2023/07/16/h4gOXAxpEukIGBa.webp)

## Library availability

关于第三方库可用性只有一条准则：千万不要使用含有[node.js core modules](https://nodejs.org/api/modules.html)的第三方库。这种库只能在node环境上运行，在浏览器上是没有这些模块的，所以这些库无法运行在浏览器上。

目前的主流构建工具如webpack、vite等都不再默认包含polyfill，你可以尝试手动添加polyfill，webpack、rollup、vite生态中有许多这样的polyfill，如果只是需要polyfill一些简单的node专有全局变量，如`path`、`__dirname`等，这也许是可行的，但是他们不一定有用，这很可能只是在浪费时间。上文统计的50个拓展仓库基本没有使用任何polyfill。

CommonJS module属于上面提到的问题，现在已经2023年了，离ES6 module发布的2015年已经过了8年，还在用CJS的库毫无疑问已过时，尽可能不要用，因为有问题基本也没人帮你解决。

从这个问题上也感受到node.js看起来第三方库的数量远超其他语言，基本什么功能都能找到库，但质量较差，维护者也不太上心，加上ES6 module割裂了以往的CJS生态，用起来真不算是舒服。相比10多年保持一致体验的Java依赖管理仓库Maven，可谓天差地别。

如果有一个库你必须要用它，又是node专有，而且polyfill没用，考虑将这部分逻辑分割到服务器端，用request/reponse的形式来做，这是一个可行的解决方案。

