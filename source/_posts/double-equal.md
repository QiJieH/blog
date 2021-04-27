---
title: 浅析 JavaScript 中的 == 和 !=
date: 2021-4-27 23:44
updated: 
toc: false
comments: true
thumbnail: ''
categories:
 - FontEnd
tags:
 - javascript
---

JavaScript 有两组相等运算符：`===` 和 `!==`，以及它们邪恶的孪生兄弟 `==` 和 `!=`。<!-- more -->`===` 和 `!==` 这一组运算符会按照你期望的方式工作。如果两个运算类型一致且拥有相同的值，那么 `===` 返回 `true` ，`!==` 返回 `false` 。而它们邪恶的孪生兄弟只有在两个运算符类型一致时才会做出正确的判断，如果两个运算数是不同类型，它们试图去强制转换值的类型。转换的规则复杂且难以记忆。这里有一些有趣的例子：

```js
'' == '0'          //false
0 == ''            //true
0 == '0'           //true

false == 'false'   //false
false == '0'       //true

false == undefined //false
false == null      //false
null == undefined  //true

'\t\r\n' == 0      //true
```

`==` 运算符对*传递性*的缺乏值得我们警惕。我的建议是永远不要使用那对邪恶的孪生兄弟。相反，请始终使用 `===` 和 `!==` 。如果以上所有的比较使用 `===` 运算符，结果都是 `false`。

> *传递性*是一种编程约定。可以这么理解：对于任意的引用值`x`, `y`和`z`，如果 `x==y`和`y==z`为`true`，那么`x==z`为`true`。而 JavaScript 中的 `==` 运算符在某些特例是违背了传递性。

> *《JavaScript 语言精粹》（修订版）Douglas Crockford著 电子工业出版社*