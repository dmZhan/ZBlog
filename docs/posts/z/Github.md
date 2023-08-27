---
title: Github
description: Github
date: 2023-01-01
tags:
  - node
---

## 1

---

## 2

### commit

约定式提交：对提交信息做了一些约束，方便自动化工具进行处理。

格式：

```html
<类型>[可选 范围]：<描述>

[可选 正文]

[可选 脚注]
```

约定式提交由三个部分组成，分别是类型和描述、正文和脚注，其中正文和脚注是可选的。

第一个部分是类型和描述。类型是commit的分类。常用类型有如下几种：

- fix 表示 bug 修复。

- feat 表示新增功能。

- build 表示构建相关。

- chore 表示重复性的日常任务，比如更新依赖的版本。

- ci 表示持续集成相关。

- docs 表示文档相关。

- style 表示代码格式相关。

- refactor 表示代码重构。

- perf 表示性能相关。

- test 表示测试相关。

类型之后可以添加可选的范围，放在括号里面，表示commit对应的组件。比如fix(api)表示对api组件的bug修复。

消息的第二个部分是可选的正文，可以使用空格分隔多个段落。

消息的第三个部分是可选的脚注。脚注采用 git trailer format，是一个简单的名值对的形式。

例如如下的消息示例：

```shell
feat(docs-infra): add @developerPreview tag for APIs in developer preview (#46050)
 
This commit adds a tag processor for `@developerPreview`. Adding this tag to
an exported symbol or to a decorator parameter causes an API status tag to
be shown for the API which links to the Developer Preview documentation.
 
PR Close #46050
```

约定式提交对破坏性变更有特殊的处理。如果 commit 的改动包含了破坏性的变更，有两种方式来表示：

- 第一种方式是在类型和范围之后添加感叹号，如 feat(api)!。
- 第二种方式是在脚注中添加 BREAKING CHANGE，如 BREAKING CHANGE: some changes。

下面给出了一个使用 BREAKING CHANGE 的 commit 示例。

```shell
fix(router): Remove deprecated initialNavigation option (#45729)
BREAKING CHANGE:
`initialNavigation: 'enabled'` was deprecated in v11 and is replaced by
`initialNavigation: 'enabledBlocking'`.
 
PR Close #45729
```
