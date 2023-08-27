---
title: VSCODE setting json
description: VSCODE setting json
date: 2023-01-01
tags:
  - node
---

```json
{
    //-----------------------------------------
    // 工作界面的设置
    // 界面主题选择
    "workbench.colorTheme": "Visual Studio Dark",
    // 工作栏左侧图标选择，需要安装vscode-icon插件
    "workbench.iconTheme": "vscode-icons",
    //  打开空工作台时，打开包含内容的新欢迎页面，none表示不打开
    "workbench.startupEditor": "none",
    //设置 setting.json分栏显示
    "workbench.settings.useSplitJSON": true,
    //------------------------------------------
    // 窗口的设置
    // 调整窗口的缩放级别。原始大小是 0，每次递增(例如 1)或递减(例如 -1)表示放大或缩小 20%。也可以输入小数以便以更精细的粒度调整缩放级别。
    "window.zoomLevel": 0,
    //-------------------------------------------
    // 界面配置路径 Text Editor
    // editor.wordWrap 配置为wordWrapColumn或者bounded时起作用
    "editor.wordWrap": "bounded",
    // 设置 超过word Wrap Column设置的字符数、达到视口最小宽度，时自动换行
    "editor.wordWrapColumn": 120,
    // 设置输入tab键时是否自动转为插入空格（默认ture，即自动转空格）,当editor.detectIndentation配置为 true 时，该配置项将被自动覆盖
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    // 执行单词相关的导航或操作时作为单词分隔符的字符。
    "editor.wordSeparators": "`~!@#$%^&*()=+[{]}\\|;:'\",.<>/?",
    //--------------------------------------------
    //界面配置路径 Text Editor -> Files
    //设置延迟一定的时间后自动保存文件
    "files.autoSave": "afterDelay",
    // 设置自动保存文件前需要延迟的时间，单位毫秒 默认1000
    "files.autoSaveDelay": 1000,
    // 设置删除文件、目录时是否允许删除到操作系统回收站，默认为true，即允许
    "files.enableTrash": true,
    // 设置读写文件时所用编码 默认UTF-8，可针对每种语言进行设置
    "files.encoding": "utf8",
    // 设置打开文件时，是否自动猜测字符编码，默认false，即不自动猜测，可针对每种语言进行设置
    "files.autoGuessEncoding": false,
    //将 .art文件自动识别为html
    "files.associations": {
        "*.art": "html",
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    //--------------------------------------------
    // 界面配置路径 Text Editor -> Formatting
    // 设置黏贴内容时是否自动格式化，true表示自动格式化，需要配置格式化器(formatter)才可使用
    "editor.formatOnPaste": true,
    // 设置保存文件时是否自动格式化，true表示自动格式化,需要配置格式化器(formatter)才可使用
    "editor.formatOnSave": true,
    // 设置保存文件时格式化整个文件还是仅被修改处。该配置项仅在 "editor.formatOnPaste" 为 true时生效
    "editor.formatOnSaveMode": "file",
    // 设置输入完成后是否自动格式化当前行
    "editor.formatOnType": true,
    //-------------------------------------------
    // 界面配置路径 Text Editor -> Minimap
    // 设置minimap的宽度以设置可渲染的最大列数，默认120
    "editor.minimap.maxColumn": 120,
    //-------------------------------------------
    // 界面配置路径 Text Editor -> Suggestions
    // 默认选项为true 设置回车时是否接受默认建议选项
    "editor.quickSuggestions": true,
    //-------------------------------------------
    // Eslint插件配置
    // 设置保存时是否自动修复代码
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    // 界面配置路径 Extensiosn -> ESlint
    // 设置状态栏是否一直显示ESlint图标项，true表示一直显示
    "eslint.alwaysShowStatus": true,
    // 设置是否把ESlint作为一个格式化器，true表示启用
    "eslint.format.enable": true,
    //--------------------------------------------
    // Prettier插件配置
    // 界面配置路径 Extensiosn -> Prettier
    //是否使用项目下的editorconfig文件作为配置文件（会导致在vscode用户区配置的规则不生效）
    "prettier.useEditorConfig": false,
    //设置去除对象最后一个属性的多余逗号
    "prettier.trailingComma": "none",
    // 设置是否开启prettier插件，默认为true，即开启
    "prettier.enable": true,
    // 设置是否在每行末尾添加分号，默认为 true
    "prettier.semi": false,
    // 设置格式化时，保持单引号，如果设置为false，则单引号会自动变成双引号
    "prettier.singleQuote": true,
    // 设置每个tab占用多少个空格
    "prettier.tabWidth": 4,
    // 设置每行可容纳字符数
    "prettier.printWidth": 120,
    // 设置是否使用tab键缩进行，默认为false，即不使用
    "prettier.useTabs": false,
    // 在对象，括号与文字之间加空格 true - Example: { foo: bar }   false - Example: {foo: bar}， 默认为true
    "prettier.bracketSpacing": true,
    // 设置在jsx中，是否把'>' 单独放一行，默认为false，即单独放一行
    "prettier.jsxBracketSameLine": true,
    // 设置各种代码的默认格式化器//以下为默认配置
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    //-----------------------------------------------
    // Vetur插件配置
    // 设置是否禁用插件格式化功能  默认为true，即开启
    "vetur.format.enable": true,
    // 设置css代码(<style>包含的代码块）默认格式化器
    "vetur.format.defaultFormatter.css": "prettier",
    "vetur.format.defaultFormatter.sass": "sass-formatter",
    "vetur.format.defaultFormatter.postcss": "prettier",
    "vetur.format.defaultFormatter.scss": "prettier",
    "vetur.format.defaultFormatter.less": "prettier",
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
    // 设置html代码(<template>包含的代码块)默认格式化器
    "vetur.format.defaultFormatter.html": "prettier",
    // 设置js代码<script>包含的代码块）默认格式化器
    "vetur.format.defaultFormatter.js": "prettier-eslint",
    // 设置vetur默认使用 prettier格式化代码
    "vetur.format.defaultFormatter.ts": "prettier",
    // 设置tab键占用的空格数，该配置将被所有格式化器继承
    "vetur.format.options.tabSize": 2,
    // 设置是否使用tab键缩进 默认false，即不使用，该配置将被所有格式化器继承
    "vetur.format.options.useTabs": false,
    // 控制是否忽略关于vscode项目配置错误的告警，默认为false，即不忽略
    "vetur.ignoreProjectWarning": true,
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false,
            "singleQuote": true
        }
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true
}
```

