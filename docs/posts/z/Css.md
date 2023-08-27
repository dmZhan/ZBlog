---
title: 前端打包
description: 前端打包
date: 2023-01-01
tags:
  - node
---

# CSS

---

## CSS设计模式-OOCSS

--Object Oriented CSS （面向对象的 CSS）--

在Element Plus中的实践，Element Plus 的 CSS 架构使用了 BEM 设计模式，而 BEM 是 OOCSS 的一种实现模式，可以说是进阶版的 OOCSS。让我们可以使用向对象编程思想进行编写 CSS。

面向对象有三大特征：封装、继承、多态 ，在 OOCSS 中，主要应用到了面向对象的封装和继承的思想。

OOCSS 的两大原则：

- 容器（container）与内容（content）分离
- 结构（structure）与皮肤（skin）分离

OOCSS 强调重复使用类选择器，避免使用 id 选择器，最重要的是从项目的页面中分析抽象出“对象”组件，并给这些对象组件创建 CSS 规则，最后完善出一套基础组件库。这样业务组件就可以通过组合多个 CSS 组件实现综合的样式效果，这体现了 OOCSS 的显著优点：可组合性高。

### CSS架构-BEM

？为什么要使用架构

CSS代码天生混乱、难复用、难拓展、难维护。。。（页面系统极度复杂），若不引入架构，后期维护CSS代码堪称灾难。所以我们需要像其他编程语言那样通过一些架构模式进行提高 CSS 代码的健壮性和可维护性。

BEM 是由 Yandex 团队提出的一种 CSS 命名方法论，即 Block（块）、Element（元素）、和 Modifier（修改器）的简称，是 OOCSS 方法论的一种实现模式，底层仍然是面向对象的思想。

那么整一个组件模块就是一个 Block（块），classname 取名为：el-tabs。Block 代表一个逻辑或功能独立的组件，是一系列结构、表现和行为的封装。
其中每个一个切换的标签就是一个 Element（元素），classname 取名为：el-tabs__item。Element（元素）可以理解为块里的元素。
Modifier（修改器）用于描述一个 Block 或者 Element 的表现或者行为。例如我们需要对两个 Block（块） 或者两个 Element（元素）进行样式微调，那么我们就需要通过 Modifier（修改器），Modifier（修改器）只能作用于 Block（块）或者 Element（元素），Modifier（修改器）是不能单独存在的。

例如按钮组件的 classname 取名为 el-button，但它有不通过状态譬如：primary、success、info，那么就通过 Modifier（修改器）进行区分，classname 分别为： el-button--primary、el-button--success、el-button--info。从这里也可以看出 BEM 本质上就是 OOCSS，基础样式都封装为 el-button，然后通过继承 el-button 的样式，可以拓展不同的类，例如：el-button--primary、el-button--success、el-button--info。

BEM 规范下 classname 的命名格式为：

```bash
block-name__<element-name>--<modifier-name>_<modifier_value>
```

- 所有实体的命名均使用小写字母，复合词使用连字符 “-” 连接。
- Block 与 Element 之间使用双下画线 “__” 连接。
- Mofifier 与 Block/Element 使用双连接符 “--” 连接。
- modifier-name 和 modifier_value 之间使用单下画线 “_” 连接。

**当然这些规则并不一定需要严格遵守的，也可以根据你的团队风格进行修改。**

在 OOCSS 中，我们通过声明一个选择器对一个基础样式进行封装的时候，这个选择器是全局的，当项目庞大的时候，这样就容易造成影响到其他元素。通过 CSS 命名方法论 [BEM](https://getbem.com/, 'BEM 详解')，则在很大程度上解决了这个问题。因为 BEM 同时规定 CSS 需要遵循只使用一个 classname 作为选择器，选择器规则中既不能使用标签类型、通配符、ID 以及其他属性，classname 也不能嵌套，此外通过 BEM 可以更加语义化我们的选择器名称。BEM 规范非常适用于公共组件，通过 BEM 命名规范可让组件的样式定制具有很高的灵活性。

```html
<form class="el-form">
    <div class="el-form-item">
        <label class="el-form-item__label">名称：</label>
        <div class="el-form-item__content">
            <div class="el-input">
                <div class="el-input__wrapper">
                    <input class="el-input__inner" />
                </div>
            </div>
        </div>
    </div>
</form>
```

我们以 Element Plus 的 Form 表单的 HTML 结构进行分析，我们可以看到整个 classname 的命名是非常规范的，整个 HTML 的结构是非常清晰明了的。

### 通过 JS 生成 BEM 规范名称

```javascript
import { computed, unref } from 'vue'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`

  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }

  if (element) {
    cls += `__${element}`
  }

  if (modifier) {
    cls += `--${modifier}`
  }

  return cls
}

export const defaultNamespace = 'nuc'
const statePrefix = 'is-'

export const useNamespace = (block: string) => {
  const namespace = computed(() => defaultNamespace)

  const b = (blockSuffix = '') => _bem(unref(namespace), block, blockSuffix, '', '')

  const e = (element?: string) => (element ? _bem(unref(namespace), block, '', element, '') : '')

  const m = (modifier?: string) => (modifier ? _bem(unref(namespace), block, '', '', modifier) : '')

  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(unref(namespace), block, blockSuffix, element, '') : ''

  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(unref(namespace), block, '', element, modifier) : ''

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(unref(namespace), block, blockSuffix, '', modifier) : ''

  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(unref(namespace), block, blockSuffix, element, modifier)
      : ''

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  }
}
```

**Block 有可能有后缀，也就是 Block 里面还有 Block**

- 创建块 el-form、
- 创建元素 el-input__inner、
- 创建块修改器 el-form--default、
- 创建块后缀元素 el-form-item、
- 创建元素修改器 el-scrollbar__wrap--hidden-default、
- 创建动作状态 例如：is-success is-required

具体创建代码使用代码如下：

```javascript
import {
  useNamespace,
} from '@~'
// 创建 classname 命名空间实例
const ns = useNamespace('button')
```

然后就可以在 template 中进行使用了：

```javascript
<template>
  <button
    ref="_ref"
    :class="[
      ns.b()
    ]"
  >按钮</button>
<template>
```

### 通过 SCSS 生成 BEM 规范样式

Element Plus 的样式采用 SCSS 编写的，那么就可以通过 SCSS 的 @mixin 指令定义 BEM 规范样式。

```scss
$namespace: 'el' !default; // 所有的组件以el开头，如 el-input
$common-separator: '-' !default; // 公共的连接符
$element-separator: '__' !default; // 元素以__分割，如 el-input__inner
$modifier-separator: '--' !default; // 修饰符以--分割，如 el-input--mini
$state-prefix: 'is-' !default; // 状态以is-开头，如 is-disabled
```

在 SCSS 中，我们使用 $+ 变量名：变量 来定义一个变量。在变量后加入 !default 表示默认值。给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值；但是如果变量还没有被赋值，则会被赋予新的值。

mixins.scss 文件编写 SCSS 的 @mixin 指令定义的 BEM 代码规范。

定义 Block ：

```scss
@mixin b($block) {
  $B: $namespace + '-' + $block !global;

  .#{$B} {
    @content;
  }
}
```

$B 表示定义一个一个变量，$namespace 是来自 config.scss 文件中定义的变量， !global 表示其是一个全局变量，这样就可以在整个文件的任意地方使用。#{} 字符串插值，类似模板语法。通过 @content 可以将 include{} 中传递过来的内容导入到指定位置。

定义 Element：

```scss
@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: '';
  @each $unit in $element {
    $currentSelector: #{$currentSelector +
      '.' +
      $B +
      $element-separator +
      $unit +
      ','};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}
```

首先定义一个全局变量 $E，接着定义父选择器 $selector，再定义当前的选择器 $currentSelector，再通过循环得到当前的选择器。接着通过函数 hitAllSpecialNestRule（hitAllSpecialNestRule 函数在 mixins 目录的 function.scss 文件中） 判断父选择器是否含有 Modifier、表示状态的 .is- 和 伪类，如果有则表示需要嵌套。@at-root 的作用就是将处于其内部的代码提升至文档的根部，即不对其内部代码使用嵌套。

定义修改器：

```scss
@mixin m($modifier) {
  $selector: &;
  $currentSelector: '';
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector +
      $selector +
      $modifier-separator +
      $unit +
      ','};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}
```

定义了父选择器变量 $selector 和 当前选择器变量 $currentSelector，并且当前选择器变量初始值为空，再通过循环传递进来的参数 $modifier，获得当前选择器变量 $currentSelector 的值，再定义样式内容，而样式内容是通过 @content 将 include{} 中传递过来的内容。

定义动作状态：

```scss
@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}
```

选择器就是 config.scss 文件中的变量 $state-prefix 加传进来的状态变量，而样式内容是通过 @content 将 include{} 中传递过来的内容。

```scss
@use 'config';

// 该函数将选择器转化为字符串，并截取指定位置的字符
@function selectorToString($selector) {
  $selector: inspect(
    $selector
  ); // inspect(...) 表达式中的内容如果是正常会返回对应的内容，如果发生错误则会弹出一个错误提示。
  $selector: str-slice($selector, 2, -2); // str-slice 截取指定字符
  @return $selector;
}
// 判断父级选择器是否包含'--'
@function containsModifier($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, config.$modifier-separator) {
    // str-index 返回字符串的第一个索引
    @return true;
  } @else {
    @return false;
  }
}
// 判断父级选择器是否包含'.is-'
@function containWhenFlag($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, '.' + config.$state-prefix) {
    @return true;
  } @else {
    @return false;
  }
}
// 判断父级是否包含 ':' （用于判断伪类和伪元素）
@function containPseudoClass($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, ':') {
    @return true;
  } @else {
    @return false;
  }
}
// 判断父级选择器，是否包含`--` `.is-`  `：`这三种字符
@function hitAllSpecialNestRule($selector) {
  @return containsModifier($selector) or containWhenFlag($selector) or
    containPseudoClass($selector);
}
```

### 经典 CSS 架构 ITCSS

本小节我们继续通过学习经典 CSS 架构 ITCSS 来对比学习 Element Plus 的样式系统架构。我们可以向一些经典的 CSS 架构去学习取经，看看人家是怎么做架构的，从而可以在我们做自身的 CSS 架构的时候可以带来一些的启发，然后取长补短，从而可以更加优化自身的 CSS 架构。
ITCSS 基于分层的概念把项目中的样式分为七层，分别如下：

1.Settings 层： 维护一些包含字体、颜色等的变量，主要是变量层。
2.Tools 层： 工具库，例如 SCSS 中的 @mixin 、@function
3.Generic 层： 重置和/或标准化样式等，例如 normalize.css、reset.css，主要解决浏览器的样式差异
4.Elements 层： 对一些元素进行定制化的设置，如 H1 标签默认样式，A 标签默认样式等
5.Objects 层： 类名样式中，不允许出现外观属性，例如 Color，遵循OOCSS方法的页面结构类，主要用来做画面的 layout
6.Components 层： UI 组件
7.Trumps 层： 实用程序和辅助类，能够覆盖前面的任何内容，也就是设置 important! 的地方

ITCSS 不是一个框架，只是组织样式代码的一种方案，ITCSS 的分层越在上面的分层，被复用性就越广，层的权重是层层递进，作用范围却是层层递减。除了 ITCSS 之外还有其他一些 CSS 架构，比如 SMACSS 、ACSS 等，但它们的核心思想并不是放之四海而皆准的，但是它维护项目样式的思想却是值得借鉴的。我们可以不完全遵守它们的规则，可以根据我们的项目需要进行删减或者保留。
那么根据上面 ITCSS 架构思想，Element Plus 也设置了 Settings 层 ，在 theme-chalk/src/common 目录下的 var.scss 文件中就维护着各种变量。我们上文中实现的 BEM 规范的 mixins 目录下的 function.scss、mixins.scss 等则是 Tools 层。Generic 层 主要解决浏览器的样式差异，这些工作应该在具体的项目中进行处理，而 Element Plus 只是一个第三方的工具库，所以 Element Plus 在这一层不进行设置。Elements 层 主要是对一些基础元素拓展一些样式，从而让我们的网站形成一套自己的风格，例如对 H1 标签默认样式，A 标签默认样式的设置。Element Plus 则在 theme-chalk/src 目录下的 reset.scss 文件进行了设置。Objects 层 和 Components 层 其实就是 OOCSS 层，也就是我们上文所说的 BEM 样式规范，又因为组件库的样式使用一般都分为全量引入和按需引入，所以就根据组件名称分别设置各自样式文件进行维护各自的样式。Trumps 层 在 Element Plus 中也是没有的，同样是因为 Element Plus 只是一个第三方工具库，权重是比较低，所以不需要设置权重层。
