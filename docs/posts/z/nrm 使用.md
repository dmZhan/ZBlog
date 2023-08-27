---
title: nrm
description: nrm
date: 2023-01-01
tags:
  - node
---

## nrm 使用

nrm 是一个 npm 源管理器，允许你快速地在 npm源间切换。

npm默认情况下是使用npm官方源（使用npm config ls命令可以查看），在国内用这个源肯定是不靠谱的，一般我们都会用淘宝npm源：https://registry.npm.taobao.org/，修改源的方式也很简单，在终端输入：

```
npm set registry https://registry.npm.taobao.org/
```

使用 npm config ls 查看，已经切换成功。

那么，问题来了，如果哪天你又跑去国外了，淘宝源肯定是用不了的，又要切换回官网源，或者哪天你们公司有自己的私有npm源了，又需要切换成公司的源，这样岂不很麻烦？于是有了nrm。

## nrm安装

```
npm install -g nrm
```

## nrm使用

### **查看可选源 星号代表当前使用源**

```
nrm ls
```

```
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
```

### **查看当前源**

```
nrm current
```

### **切换源**

```
nrm use <registry>
```

其中registry为源名。比如：切换为taobao源。

```
nrm use taobao
```

```
Registry has been set to https://registry.npmmirror.com/
```

### 添加源

```
nrm add <registry> <url>
```

其中，registry为源名，url为源地址。

比如：添加一个公司私有的npm源，源地址为：http://192.168.22.11:8888/repository/npm-public/，源名为cpm（随意取）。

```
nrm add cpm http://192.168.22.11:8888/repository/npm-public/
```

### 删除源

```
nrm del <registry>
```

其中，registry为源名。

比如：删除刚才添加的cpm源。

```
nrm del cpm
```

### 测试源速度

```
nrm test npm
```



​																				Author by ZQJ
