---
title: electron
description: electron
date: 2023-01-01
tags:
  - node
---

## Electron

---

## Issue

### electron 开机自启动获取不到安装路径

electron 官方文档上直接提供了对应的 API

```javascript
app.setLoginItemSettings({
  openAtLogin: true
})
```

但是开机自启动找不到资源目录，开机自启动，process.cwd() 获取到的路径并不是软件安装的目录
