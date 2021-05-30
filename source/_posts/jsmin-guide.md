---
title: JSMin 初步使用
date: 2021-5-27 17:25
updated: 
toc: false
comments: true
thumbnail: 
categories:
 - FontEnd
tags:
 - javascript
 - jsmin
---

JSMin 是一个压缩工具，可以从JavaScript 文件中删除注释和不必要的空白。它通常会将文件大小减少一半，从而加快下载速度。 <!-- more -->它还鼓励更具表现力的编程风格，因为它消除了js和其文档的下载成本。

- JSMin：https://www.crockford.com/jsmin.html
- Github: https://github.com/douglascrockford/JSMin

## 如何使用

通过上面提供的链接下载可执行文件`jsmin.exe`或`jsmin.c`（要求c运行环境）,键入**命令行**指令

```cmd
jsmin <source.js> outfile.js
```
参数说明：
- **`jsmin`**: 可执行文件位置。
- **`source.js`**: 待压缩文件。
- **`outfile.js`**: 输出文件，不指定路径会输出在当前命令行路径下。

在压缩js文件之前，最好确保你的文件符合JSLint 语法要求。