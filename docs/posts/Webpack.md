---
title: webpack 使用记录
date: 2023-08-23
description: Plugin
tags:
  - webpack
---

# webpack使用记录

![cover](/Webpack/webpack.png)

> webpack 的学习和使用是一个漫长且复杂的过程

## Plugin

记录一些插件

### extract-text-webpack-plugin

webpack本来只能能打包处理.js文件，但是通过强大的loader之后，可以打包处理各种类型的文件，比如：.css文件等。

表面上webpack通过loader可以打包各种文件了，已经完美了。但是在某些场景中也存在着问题的，比如我们的css的内容都被打包到bundle.js里面了。在生产环境中我们通常会利用浏览器的缓存来提高用户体验，用上了webpack的hash（正常js文件hash类型会使用chunkhash）。

我只要修改了js部分的代码，那么我的css模块也会被重新打包，被当成css模块也有内容修改。
或者只修改了css模块，js模块是没有变化的，但是他们都是在一个bundle中，所以都会被认为都有修改。

解决方案：
思路：将css模块和js模块分开打包，换句话说把css代码从js文件中抽离出来，单独出一个模块。

extract-text-webpack-plugin插件做的就是抽离css代码为一个单独的模块。

ExtractTextPlugin基本参数说明：
filename：生成文件的文件名，可以包含 [name], [id], [contenthash]
allChunks：当为false的时候，只会提取初始化的时候引入的css,当allChunks属性为true时，会把异步引入的css也提取出来。

ExtractTextPlugin.extract基本参数说明：
use:指需要什么样的loader去编译文件
fallback: 这里表示不提取的时候，使用什么样的配置来处理css
publicfile:用来覆盖项目路径,生成该css文件的文件路径

要点：

- 在loader中，对.vue文件也做css的抽离。让.vue组件中的所有的css也能正常抽离出来。
- plugins中ExtractTextPlugin的allChunks要设置成true，然后配合上要点1，这样就可以顺利的将所有vue组件中的css都提取出来。

注意：在webpack4中，建议用mini-css-extract-plugin替代。

### mini-css-extract-plugin

待补充
