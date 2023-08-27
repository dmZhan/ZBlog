---
title: pnpm
description: pnpm
date: 2023-01-01
tags:
  - node
---

## pnpm 使用

---

## 什么是 `monorepo`

`monorepo`： 将多个工程放到一个仓库中进行管理，共享同一套构建流程、代码规范，如果存在模块间的互相应用的情况，察看代码、修改Bug、调试等会更加方便。

`multirepo`： 将项目按模块分为多个代码库，通过科学的分解，实现每个repo独立开发和测试，从而提升开发效率。

`pnpm` 提出了workspace的概念，内置了对`monorepo`的支持。启动`pnpm`的workspace功能，需要在工程**根目录**下创建`pnpm-workspace.yaml`配置文件，并且在`pnpm-workspace.yaml`中指定工作空间的目录。

## 常用指令

### 配置项

#### -C \<path>, --dir \<path>

在\<path>中启动pnpm，而不是当前的工作目录。

#### -w, --workspace-root

在**工作空间**的根目录中启动 pnpm ，而不是当前的工作目录。

### scripts

\*以npm-pkg指代npm包,child-pkg指代子包

#### -w

将依赖包安装到工程的根目录下，作为所有 package 的公共依赖

```bash
  pnpm install npm-pkg -w
```

#### -F, --filter <package_name>

对特定的子包执行操作

```bash
  pnpm add npm-pkg --filter child-pkg-name
```

child-pkg-name指的是child-pkg中`package.json`的`name`字段

---
filter 后面除了可以指定具体的包名，还可以跟着匹配规则来指定对匹配上规则的包进行操作

```bash
  pnpm build --filter "./packages/**"
```

#### 模块之间的相互依赖

场景： pkg1中将pkg2作为依赖进行安装

```bash
  pnpm install child-pkg-1 -r --filter child-pkg-2
```

此时我们查看 child-pkg-2 的 package.json，可以看到 dependencies 字段中多了对 child-pkg-1 的引用，以 workspace: 开头，后面跟着具体的版本号。

```json
{
  "name": "child-pkg-2",
  "version": "1.0.0",
  "dependencies": {
    "child-pkg-1": "workspace:^1.0.0",
  }
}

```

在设置依赖版本的时候推荐用 workspace:*，这样就可以保持依赖的版本是工作空间里最新版本，不需要每次手动更新依赖版本。

当 `pnpm publish`的时候，会自动将 package.json 中的 workspace 修正为对应的版本号。

#### -r, --recursive

递归的在子包中执行的命令
