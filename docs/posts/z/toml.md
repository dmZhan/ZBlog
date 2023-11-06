---
title: toml
description: toml
date: 2023-01-01
tags:
  - node
---

## 【配置文件分析】——json、yaml、toml

## [#](https://ssscode.com/pages/131a7a/#前言)前言

配置文件，不言而喻，主要是我们进行项目和工程配置的文件。

如果是站在前端角度说的话，我们最常接触的就是 `json`以及 `js`类型的文件，这种形式的配置写法对前端非常友好，因为都是我们熟悉的 JS 对象结构，如：

- `package.json`
- `webpack.config.js`
- `babel.config.js`
- `vue.config.js`

不过，随着技术的更新迭代，也涌现出一些新的配置文件格式，相比较而言，原有的文件格式好像也变得不是那么好用了。虽然在此之前，`json`+`js`用着也不错，不过，当新的工具出现后，尤其是在你深度体验与使用之后，可能会发现事情似乎有点那么不一样了，感觉新的玩意就是好啊😏，也便开始嫌弃之前的家伙了~

不过，我们要站在不同角度思考问题，从新工具诞生的角度看，其诞生必然有着一定的历史背景存在，如：

1. 旧工具在某些场景表现吃力，需要更优的替代方案
2. 旧的写法和模式在某些场景下有着明显的短板和缺陷，需要更进一步的完善方案

## [#](https://ssscode.com/pages/131a7a/#背景)背景

最近在做开源项目的时候，在开发功能时，考虑到不同场景、不同用户的不同需求，在开始设计功能时就考虑到预留一定的可定制窗口方便用户进行定制化配置。当然，在功能不断开发进行时，以及后期的迭代拓展时，都会源源不断的诞生出各种小功能和定制需求，因此，对于拥有一个足够简单、易用、拓展的配置文件是相当有必要的。

它应该具备以下基本能力：

1. **支持注释**：对于配置文件来说，注释的重要性不必多说，它需要描述每个配置字段的作用
2. **足够简单**：语法足够简单，用法足够简单，上手足够简单；至少保证新人能很快上手使用
3. **方便读写**：对于用户来说，应该是可读性非常高的，符合人类语言习惯的，概览之后可以快速上手配置

在此之前的版本，我已经针对该想法做了初步的实施落地，从个人经验来说，我之前在搞 CI/CD 自动化部署相关的东西时，写过一些 **github action**（配置文件为`yaml`格式），因此，对于`yaml`语法算是有些了解。

从使用感受上来说，它语法**更简洁**、**支持注释**，所以，我果断选择了`yaml`作为我对于项目的配置文件格式。

不过，在这段时间的使用过程中，我也发现了`yaml`存在的一些问题，因此，最近我又重新思考了一下下这个问题：

1. 是继续按照传统的`js`文件的对象写法呢？
2. 还是继续使用`yaml`作为配置文件使用呢？
3. 还是进一步研究一些其他类型的配置文件呢？
4. 这些配置文件类型又有啥本质区别呢？

抱着学习的心理，咱不能在遇到问题的时候就选择逃避呀，那么本篇文章也算是对不同类型配置文件的一种研究和学习了。

## [#](https://ssscode.com/pages/131a7a/#简单介绍)简单介绍

### [#](https://ssscode.com/pages/131a7a/#json)JSON

`JSON`的定义一般是作为数据格式，它通常用于序列化、结构化数据并通过网络进行交换，通常发生在服务器与 Web 应用之间。不过也有很多工具将其作为配置文件使用。

> JSON 其实完全可以当成是 JS 对象的形式进行理解、使用。

其实使用`JSON`作为配置文件也有其一定的优势：

1. 语法非常简单，纯粹的键值对结构
2. 很多编程语言的标准库都支持 `JSON`，比如：在JS当中你可以直接引入读取
3. 现在几乎所有的工具都提供 `JSON` 支持，包括语法突出显示、自动格式化、验证工具等。
4. 采用人类可读的轻量级文本，只需更少的编码，处理速度更快

但是，也因为其独特的定位，它天生就注定了**并不适合作为配置文件使用**，原因也很明显：

1. **不支持注释**：对于配置文件来说，注释的重要性不言而喻，但是`JSON`不支持添加注释（`JSON` 作为一种数据交换格式，也不需要注释😅）
2. **语法过于严格**：键和字符串必须使用`""`双引号（其实对于键来说，并不需要使用引号），结尾不允许有逗号（除了结尾都必须有逗号，哈哈~）
3. **多余的最外层大括号**：作为配置文件来说，最外层的大括号也显得有些多余（这也是其作为交换数据格式的特点，为了界定不同的对象）

虽然大家都很熟悉了，我们还是按流程看下基本用法，方便接下来做对比，如下：

```json
{
  "name": "cat",
  "desc": {
    "color": "orange",
    "age": 1
  }
}
```

可以看出`JSON`作为数据格式，还是比较合适且优秀的，但是作为配置文件来说，总觉得是力气使错了方向😄

### [#](https://ssscode.com/pages/131a7a/#yaml)YAML

YAML 是一种数据序列化语言，通常用于编写配置文件（它的流行和 **k8s** 脱不了关系😏~）。

语法规则：

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用Tab键，只允许使用空格。
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略。
- 文件拓展名为 `.yaml`、`.yml`

支持的数据格式：

- 对象：键值对的集合，又称为映射/ 哈希 / 字典
- 数组：一组按次序排列的值，又称为序列 / 列表
- 纯量：单个的、不可再分的值，可以理解为基本类型

> 以下数据类型都属于 JavaScript 的纯量：
>
> 字符串、布尔值、整数、浮点数、Null、时间、日期

其特点如下：

1. 有更好的可读性，对用户更友好
2. 简洁和强大，写法简洁，也有复杂的语法支持不同功能
3. **是JSON的超集**，JSON 文件在 YAML 中有效
4. 使用 Python 风格的*缩进*来表示嵌套

如果说到缺点的话，那和它的特点也是密不可分的

1. 因为不是原生支持的格式，不同平台需要专门的解析工具（如：在JS中使用需要使用[`js-yaml`](https://www.npmjs.com/package/js-yaml)解析，[在线转换](https://nodeca.github.io/js-yaml/)）
2. 简单使用，基本语法够简单；但是进阶使用，语法就比较复杂了，对于多行字符串的处理也有待优化，尤其是结合缩进语法一起
3. 缩进语法，如果搞错了缩进或者没看清，够你定位问题的了

按惯例，看下基本用法：

```yaml
# 我是注释
name: cat
desc:
  color: orange
  age: 1
  date: 2022-09-01 16:10:01
```

同时上面的内容也可以这样写：

```yaml
name: cat
desc: { color: orange, age: 1, date: 2022-09-01 16:10:01 } # JSON的超集
```

转为JS如下：

```js
{ 
  name: 'cat', 
  desc: { 
    color: 'orange', 
    age: 1,
    date: 'Fri Sep 02 2022 00:10:01 GMT+0800 (中国标准时间)' // new Date
  } 
}
```

### [#](https://ssscode.com/pages/131a7a/#toml)TOML

全称 `Tom's Obvious, Minimal Language`，意为语义**明显的**、配置**最小化的**的语言。

官方描述：

为人而生的配置文件格式（好屌的感觉😏~）。

TOML 旨在成为一个语义明显且易于阅读的最小化配置文件格式。TOML 被设计成可以无歧义地映射为哈希表。TOML 应该能很容易地被解析成各种语言中的数据结构。

1. TOML 以人为先
   - 语义明显易于阅读
   - 能无歧义地映射为哈希表
   - 易于解析成各种语言中的数据结构
2. TOML 具备实用的原生类型
   - 键/值对
   - 数组
   - 表
   - 内联表
   - 表数组
   - 整数 & 浮点数
   - 布尔值
   - 日期 & 时刻，带可选的时区偏移
3. TOML 受到广泛支持
   - TOML 已经拥有大多数当今使用的最流行的编程语言的实现：C、C#、C++、Clojure、Dart、Elixir、Erlang、Go、Haskell、Java、Javascript、Lua、Objective-C、Perl、PHP、Python、Ruby、Swift、Scala……以及更多。

语法规则：

- 大小写敏感
- 文件必须是合法的 UTF-8 编码的 Unicode 文档
- 简洁、清晰的 `=` 写法（`name = "cat"`）
- 字符串需要由引号（`"`）包裹
- 表写法，键值对的集合，由表头定义，连同方括号作为单独的行出现
- `#` 表示注释
- 文件拓展名为 `.toml`

其特点如下：

1. 写法符合直觉、简单清晰
2. 键名写法强大，键名可以是裸露的，引号引起来的，或点分隔的。
3. 对字符串支持完善，基本字符串、多行基本字符串、字面量和多行字面量
4. 表写法功能强大，键值对、数组、嵌套写法等

缺点：

1. 不是原生支持的格式，不同平台需要专门的解析工具（如：在JS中使用需要使用[`@ltd/j-toml`](https://www.npmjs.com/package/@ltd/j-toml)解析，[在线转换](http://binarymuse.github.io/toml-node/)）
2. 属于比较新型的格式，社区认知度不高
3. 新人对核心语法“表”需要适应

基本用法如下：

```toml
# 我是注释
name = "cat"

[desc]
color = "orange" 
age = 1 
date = 2022-09-01 16:10:01
```

你也可以这样写：

```toml
name = "cat"

desc.color = "orange" 
desc.age = 1 
desc.date = 2022-09-01 16:10:01
```

转为JS如下：

```js
{ 
  name: 'cat', 
  desc: { 
    color: 'orange', 
    age: 1，
    date: '2022-09-01T16:10:01'
  } 
}
```

## [#](https://ssscode.com/pages/131a7a/#用法对比)用法对比

其实站在配置文件的角度思考，我们最关心的就是**键值对**写法（一个属性控制一个功能点），谁能做到在使用时读写更方便，谁也就更具有优势。

基本上就是一个对象结构，数据类型符合字符串、对象、数组、布尔值、日期、数值也就差不多了

```js
{ 
  "key" : value // 这里的 value 应可以是以上的任何类型
}
```

### [#](https://ssscode.com/pages/131a7a/#字符串)字符串

#### [#](https://ssscode.com/pages/131a7a/#_1️⃣-简单字符串用法)1️⃣ 简单字符串用法

- json写法：

  ```json
  { 
    "name" : "cat"
  }
  ```

  最外层花括号 `{}` 不可缺少，且不主持添加注释，`key` 和 `value` 都需要使用引号 `""` 进行包裹

- yaml写法：

  ```yaml
  name: cat # 猫
  ```

  默认不需要使用引号 `""` 进行包裹（用引号包裹结果也是一样的），简单字符串使用非常简单，对于多行字符串则有所不同。

  特别注意的是：冒号 `:` 后面要有空格，这符合 yaml 后面的所有语法规范

- toml写法：

  ```toml
  name = "cat"
  ```

  有没有空格无所谓，不影响解析，value部分需要按照字符串的写法，使用引号 `""` 进行包裹

#### [#](https://ssscode.com/pages/131a7a/#_2️⃣-多行字符串)2️⃣ 多行字符串

有些场景我们可能会定义很长的一段字符串，默认展示肯定是在一行显示的，这样既不好读也不好维护，尤其针对一些 shell 命令，我们在前端工程中应该见过不少这样的。

我举个列子：

```json
"scripts": {
  "dev": "webpack-dev-server --base test/ --port 8081 --config build/webpack.dev.config.js",
  "lint:fix:utils": "eslint --fix \"./packages/utils/**\" --ext .js,.ts,.json"
}
```

- json写法：

  不支持

- yaml写法：

  ```yaml
  # 注意缩进，第二行、第三行开头有空格（必须这样写）
  dev: webpack-dev-server --content-base test/ 
    --port 8081 
    --config build/webpack.dev.config.js
  ```

  字符串可以写成多行，从第二行开始，必须有一个单空格缩进。换行符会被转为空格。

- toml写法：

  ```toml
  dev = """
  webpack-dev-server --base test/ 
  --port 8081 
  --config build/webpack.dev.config.js
  """
  ```

  多行基本字符串由三个引号包裹，允许折行。

  官方规范：紧随开头引号的那个换行会被去除，其它空白和换行会被原样保留。

  特别注意：`@ltd/j-toml`解析库目前支持自定义拼接，比如你想要以 `' '`空格进行拼接，而不使用换行`'\n'`拼接（`TOML.parse(data, { joiner: ' ' })`），以本例举例，我换行是为了易读，在解析之后的命令应该还是一行的、一个整体的，就可以使用这种方式

  你还可以用行末反斜杠自动剔除非空白字符前的任何空白字符：

  ```toml
  dev = """
  webpack-dev-server --base test/ \
        --port 8081 \
        --config build/webpack.dev.config.js \
  """
  ```

  解析结果如下：

  ```js
  {
    dev: 'webpack-dev-server --base test/ --port 8081 --config build/webpack.dev.config.js'
  }
  ```

#### [#](https://ssscode.com/pages/131a7a/#_3️⃣-字面量字符串)3️⃣ 字面量字符串

为了方便理解，你把它当成JS的模板字符串即可，没有转义行为，所见即所得。

这里以保留换行为例说明:

- json写法：

  不支持，JSON只能用引号`""`，但是如果你想保留类似换行操作符一样的东西，你可以这样做

  ```json
  { 
    "hi": "echo hello \n world \n 我是小明",
    "ha": "echo \"hello\" \"world\""
  }
  ```

  很烦，看着就难受的一批，写法也很操蛋~，我只能说“打扰了”😀

  换行需要添加 `\n`，以及你要是想在JSON中输出引号`""`，就必须进行转义

- yaml写法：

  在首行加一个 `|` 符号即可，还是蛮简单的，缩进一定要把握好~

  ```yaml
  hi: |
    echo hello
    world
    我是小明
  ```

  解析为JS如下：

  `{ hi: 'echo hello\nworld\n我是小明\n' }`

  - 如果你想保留文字块末尾的换行，可以使用 `|+`
  - 如果你想删除字符串末尾的换行，可以使用 `|-`

  ```yaml
  hi: |-
    echo hello
    world
    我是小明
  ```

  解析为JS如下：

  `{ hi: 'echo hello\nworld\n我是小明' }`

- toml写法：

  字面量字符串由单引号包裹，不能换行（不会进行任何转义）

  ```toml
  path = 'C:\Users\nodejs\templates'
  path2 = '\\User\admin$\system32'
  quoted = 'Tom "Dubs" Preston-Werner'
  regex = '<\i\c*\s*>'    
  ```

  多行字面量字符串两侧各有三个单引号来包裹，允许换行。

  ```toml
  # 三个单引号包裹
  hi = '''
  echo 
  hello 
  world 我是小明
  '''
  ```

  解析为JS如下：

  `{ hi: 'echo \nhello \nworld 我是小明\n' }`

  解析规则`TOML.parse(data, { joiner: '\n' })`

#### [#](https://ssscode.com/pages/131a7a/#字符串用法小结)字符串用法小结

总的来说，JSON对于字符串的支持还是比较弱的，对于多行字符串等写法使用比较吃力；yaml总体来说简单方便，对字符串的支持还是不错的，相关解析库也很易用，唯一需要注意的就是缩进需要把控好；如果要说对字符串的支持能力，toml是最强的毋庸置疑，也没有缩进语法的担忧，几乎支持你所能相到的任何场景，不过，目前确实存在使用量不高，第三方解析库不太稳定的问题。

npm周下载量（Weekly Downloads）大致如下：

- [js-yaml](https://www.npmjs.com/package/js-yaml)：`53,724,459`
- [@ltd/j-toml](https://www.npmjs.com/package/@ltd/j-toml)：`33,951` （1.0版本后官方指定的解析库）
- [toml](https://www.npmjs.com/package/toml)：`666,591`（0.4版本，不活跃）

千万级别和万级别的对比~

> `@ltd/j-toml`解析库对于存在多行字符串的toml文件进行解析时，必须要手动指定拼接规则（`{ joiner: '' }`），有点奇怪，不过，这样也使得我们在处理多行字符串时，可以自定义拼接规则，以此实现不同的效果（要是说对于一个文件内多个多行字符串选择不同的处理方式，有待商榷）

### [#](https://ssscode.com/pages/131a7a/#对象)对象

对象写法还是非常普遍的，对于该核心语法的掌握还是很有必要的，其实也是键值对的范畴，举例如下：

#### [#](https://ssscode.com/pages/131a7a/#_1️⃣-简单用法)1️⃣ 简单用法

- json写法：

  ```json
  {
    "desc": {
      "color": "red",
      "eaten": false,
      "age": 1
    }
  }
  ```

  对于JSON来说，还是老样子，不支持注释，**键**必须用引号包括，如果值为字符串也要使用引号进行包裹，非字符串类型可以不用引号包裹

- yaml写法：

  ```yaml
  # 描述
  desc:
    color: red # 颜色
    eaten: false
    age: 1
  ```

  解析为JS如下：

  ```js
  { 
    desc: { 
      color: 'red', 
      eaten: false, 
      age: 1 
    } 
  }
  ```

  可以发现，yaml是可以很好地识别非字符串类型的，数值类型和布尔值都正确转义

- toml写法：

  ```toml
  # 描述
  [desc]
  color: red # 颜色
  eaten: false
  age: 1
  ```

  对象在toml中称为**表**（也被称为哈希表或字典），是键值对的集合，它们由表头定义，连同方括号作为单独的行出现（`[desc]`）。

  对于toml来说，键名可以是裸露的，引号引起来的，或点分隔的（十分强大的能力）。

  解析为JS如下：

  > 解析规则：`TOML.parse(data, { bigint: Number.MAX_SAFE_INTEGER })`
  >
  > 只要在超过 `Number.MAX_SAFE_INTEGER` 这个范围后，才会启用 `BigInt`，一般整型写法用这个就行了

  ```js
  { 
    desc: { 
      color: 'red', 
      eaten: false, 
      age: 1 
    } 
  }
  ```

  可以发现，yaml是可以很好地识别非字符串类型的，数值类型和布尔值都正确转义

#### [#](https://ssscode.com/pages/131a7a/#_2️⃣-复杂一些的用法)2️⃣ 复杂一些的用法

在使用对象时也会遇到多个对象结构与嵌套的情况，如下：

- json写法：

  ```json
  {
    "desc": {
      "color": "red",
      "eaten": false,
      "age": 1
    },
    "animals": {
      "dog": {
        "color": "black"
      },
      "cat": {
        "color": "red"
      }
    }
  }
  ```

- yaml写法：

  ```yaml
  desc:
    color: red
    eaten: false
    age: 1
  animals:
    dog:
      color: black
    cat:
      color: red
  ```

  yaml写法还是满简单清晰地，控制好缩进一切OK

- toml写法：

  ```toml
  [desc]
  color = "red" # 颜色
  eaten = false
  age = 1
  
  [animals]
  dog.color = "black"
  cat.color = "red"
  ```

  官方推荐使用标准的表写法（`[desc]`作为表头），每个表可以理解为一个对象体。不过，因为 toml强大的语法系统，你甚至可以直接使用点`.`写法，不过为了规范和易读推荐使用官方写法。

  你可以这样写：

  ```toml
  desc.color = "red" # 颜色
  animals.dog.color = "black"
  ```

  你还可以这样写：

  ```toml
  desc.color = "red" # 颜色
  
  [animals.dog]
  color = "black"    
  ```

  你甚至可以这样写：

  ```toml
  # toml对于键的解析能力十分强大，其他特殊写法都会被标准化处理
  desc."color" = "red" # 颜色
  animals .    "dog" .color = "black"
  ```

  解析为JS如下：

  ```js
  {
    desc: { color: 'red' },
    animals: { 
      dog: { 
        color: 'black' 
      } 
    },
  }
  ```

#### [#](https://ssscode.com/pages/131a7a/#对象用法小结)对象用法小结

总的来说，JSON对于对象的写法支持还是蛮OK的，但是需要指出的是，JSON不支持注释，这是硬伤，而且和另外两个格式相比较而言，写法也是略显繁琐；yaml总体来说挺不错的，写法简洁、清爽，我还是蛮喜欢的，需要指出的是对于缩进的处理一定要注意，yaml语法规范严格，一个缩进不对就会解析错误；就目前而言，toml在对象语法和使用上优势明显，写法也是十分简单，而且其对键名的写法支持异常强大，极大的丰富了不同场景下的需求，不过，需要指出的是，从易读和已维护性考虑，还是推荐按照官方规范的写法使用。

### [#](https://ssscode.com/pages/131a7a/#数组与嵌套组合)数组与嵌套组合

数组以及JSON数组等常见用法的对比举例，如下：

#### [#](https://ssscode.com/pages/131a7a/#_1️⃣-数组的基本用法)1️⃣ 数组的基本用法

- json写法：

  ```json
  {
    "desc": [ "red", false, { "color": "red", "age": 1 } ] 
  }
  ```

- yaml写法：

  ```yaml
  desc:
    - red
    - false
    - color: red # 数组内的对象写法需要注意
      age: 1 # 同一对象下的项（开头没有 - ）
  ```

  数组的项通过 `-` 表示

- toml写法：

  ```toml
  desc = ["red", false, { color = "red", age = 1 }]
  ```

  ```toml
  desc = [
    "red", 
    false, 
    { 
      color = "red", 
      age = 1 
    }
  ]
  ```

  空白会被忽略，子元素由逗号分隔，合规的类型都可以作为值，可以混合不同类型的值

#### [#](https://ssscode.com/pages/131a7a/#_2️⃣-json数组多级嵌套的的基本用法)2️⃣ JSON数组多级嵌套的的基本用法

- json写法：

  ```json
  {
    "animals": [
      {
        "desc": [
          "red",
          false,
          1
        ]
      },
      {
        "dog": [
          {
            "color": "black",
            "age": 1
          },
          {
            "color": "white",
            "age": 2
          }
        ],
        "cat": [
          {
            "color": "black",
            "age": 3
          }
        ]
      }
    ]
  }
  ```

- json写法：

  ```yaml
  animals:
    - desc:
      - red
      - false
      - 1
    - dog:
      - color: black
        age: 1
      - color: white
        age: 2
      cat:
      - color: black
        age: 3
  ```

- toml写法：

  ```toml
  [[animals]]
  desc = ["red",false,1]
  
  [[animals.dog]]
  color = "black"
  age = 1
  
  [[animals.dog]]
  color = "white"
  age = 2
  
  [[animals.cat]]
  color = "black"
  age = 3
  ```

  数组在toml中称为**表数组**，它通过把表名写在双方括号里的表头来表示（`[[animals]]`）

  表头的第一例定义了这个数组及其首个表元素，而后续的每个则在该数组中创建并定义一个新的表元素。这些表按出现顺序插入该数组

  > 注意和对象的区别，表是一个括号表示 `[desc]`，表数组是双方括表示 `[[animals]]`

#### [#](https://ssscode.com/pages/131a7a/#数组与嵌套数组小结)数组与嵌套数组小结

其实作为配置文件来说，数组一般还是有不少使用场景的，对于掌握数组的基本用法还是蛮有必要的，但是，对于类JSON数组来说，使用场景比较有限（gtHub action配置文件中这种用法多一些）。

竟然觉得JOSN看着属于比较清晰、易读的；yaml写法我在配置github action的时候使用过，当时就是语法缩进和数组对象结构一起使用时犯了错，耽误了不少时间定位问题，还是那句话，yaml对于缩进的处理需要特别注意；toml我用着还是不太习惯，但是总体结构划分、读写性上绝对值得点赞，看着还是比较清晰地，就是对于表的使用需要适应，用习惯了觉得是值得推荐的。

## [#](https://ssscode.com/pages/131a7a/#总结)总结

好了，就写这么多吧。对于相关内容感兴趣的可以去官方文档进一步查看，本文也只是通用功能的概括，篇幅有限，很多高级用法这里不再赘述。

其实，这整个一轮学习、分析对比下来，就这三种配置文件格式来说，如果没有特殊使用场景，到了一定需要考虑选择配置文件的地方，我觉得吧，就JS对象用着就挺好的，毕竟人家webpack这么多配置，用着不也是完全ok；但是这样说是属于比较局限于前端角度的看法，毕竟我们对于JS语言整体是熟悉的，上手起来自然容易些。

但是，作为配置文件来说，它一定不能像开发语言一样那么的重，其实也不需要那么多功能，我们对配置文件的定位就是，它只要能覆盖我们基本的使用场景也就足够了。

## [#](https://ssscode.com/pages/131a7a/#资料)资料

- [toml](https://toml.io/cn/v1.0.0)
- [TOML 教程 - 可能是目前最好的配置文件格式](https://zhuanlan.zhihu.com/p/50412485)
- [现代配置指南——YAML 比 JSON 高级在哪？](https://segmentfault.com/a/1190000041108051)
- [什么是 YAML？](https://www.redhat.com/zh/topics/automation/what-is-yaml)
- [YAML 语言教程](https://www.ruanyifeng.com/blog/2016/07/yaml.html)
- [@ltd/j-toml](https://www.npmjs.com/package/@ltd/j-toml)